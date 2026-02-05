# Analytics & Monitoring Guide

This project includes a comprehensive analytics tracking system that monitors user traffic and behavior. All data is stored in Supabase and can be accessed from various tools including Vercel.

## Features

The analytics system tracks the following data for each page view:

### Page Information
- **Page Path**: The URL path visited (e.g., `/about`, `/careers`)
- **Page Title**: The title of the page
- **Referrer**: Where the visitor came from

### User Device & Browser
- **Device Type**: mobile, tablet, or desktop
- **Browser**: Chrome, Firefox, Safari, Edge, etc.
- **Operating System**: Windows, macOS, Linux, Android, iOS
- **Screen Resolution**: Width and height
- **User Agent**: Full browser user agent string

### Geographic Data (from Vercel)
- **Country**: Visitor's country
- **City**: Visitor's city
- **Region**: Visitor's state/region
- **IP Address**: Visitor's IP address
- **Latitude & Longitude**: Geographic coordinates

### Session Information
- **Session ID**: Unique identifier for each browsing session
- **Language**: Browser language setting
- **Timezone**: User's timezone
- **Timestamp**: When the page was viewed

## Database Structure

All analytics data is stored in the `page_views` table in Supabase.

### Querying Analytics Data

You can query the analytics data using SQL in Supabase:

```sql
-- Get total page views
SELECT COUNT(*) FROM page_views;

-- Get views by page
SELECT page_path, COUNT(*) as views
FROM page_views
GROUP BY page_path
ORDER BY views DESC;

-- Get views by country
SELECT country, COUNT(*) as views
FROM page_views
GROUP BY country
ORDER BY views DESC;

-- Get views by device type
SELECT device_type, COUNT(*) as views
FROM page_views
GROUP BY device_type;

-- Get views in the last 7 days
SELECT DATE(created_at) as date, COUNT(*) as views
FROM page_views
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Get unique sessions by day
SELECT DATE(created_at) as date, COUNT(DISTINCT session_id) as unique_visitors
FROM page_views
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Use the pre-built daily analytics view
SELECT * FROM daily_analytics
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY date DESC;
```

## Accessing Analytics Data

### 1. Supabase Dashboard

1. Go to your Supabase project dashboard
2. Click on "Table Editor" in the sidebar
3. Select the `page_views` table
4. You can filter, sort, and export data directly from here

### 2. Supabase SQL Editor

1. Go to "SQL Editor" in Supabase
2. Run custom queries to analyze your data
3. Save frequently used queries for quick access

### 3. Vercel Analytics Integration

Your analytics data is already being captured from Vercel's edge network. The `request.geo` object in the API route (`/app/api/analytics/route.ts`) extracts geographic data from Vercel's headers:

- `request.geo.country`
- `request.geo.city`
- `request.geo.region`
- `request.geo.latitude`
- `request.geo.longitude`

### 4. Creating Visualizations

You can connect your Supabase database to various analytics tools:

**Option A: Metabase**
1. Install Metabase (free, open-source)
2. Connect to your Supabase PostgreSQL database
3. Create dashboards with charts and graphs

**Option B: Google Data Studio**
1. Use the Supabase connector
2. Create custom reports and dashboards
3. Share with your team

**Option C: Custom Dashboard**
You can build a custom Next.js admin dashboard page:

```typescript
// Example: /app/admin/analytics/page.tsx
import { supabase } from '@/lib/supabase';

export default async function AnalyticsPage() {
  const { data } = await supabase
    .from('page_views')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      {/* Render your data */}
    </div>
  );
}
```

## Common Analytics Queries

### Most Popular Pages
```sql
SELECT
  page_path,
  COUNT(*) as total_views,
  COUNT(DISTINCT session_id) as unique_visitors
FROM page_views
GROUP BY page_path
ORDER BY total_views DESC
LIMIT 10;
```

### Traffic by Hour
```sql
SELECT
  EXTRACT(HOUR FROM created_at) as hour,
  COUNT(*) as views
FROM page_views
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY EXTRACT(HOUR FROM created_at)
ORDER BY hour;
```

### Bounce Rate (Single-page Sessions)
```sql
SELECT
  COUNT(DISTINCT CASE WHEN page_count = 1 THEN session_id END) * 100.0 /
  COUNT(DISTINCT session_id) as bounce_rate_percent
FROM (
  SELECT session_id, COUNT(*) as page_count
  FROM page_views
  GROUP BY session_id
) as session_stats;
```

### Geographic Distribution
```sql
SELECT
  country,
  city,
  COUNT(*) as views,
  COUNT(DISTINCT session_id) as unique_visitors
FROM page_views
GROUP BY country, city
ORDER BY views DESC
LIMIT 20;
```

### Device & Browser Analytics
```sql
SELECT
  device_type,
  browser,
  os,
  COUNT(*) as views
FROM page_views
GROUP BY device_type, browser, os
ORDER BY views DESC;
```

## Privacy Considerations

This analytics system collects anonymous usage data for legitimate business purposes:

- No personally identifiable information (PII) is collected
- No cookies are used for tracking
- Session IDs are randomly generated and stored only in sessionStorage
- IP addresses can be anonymized if needed for GDPR compliance

### To Anonymize IP Addresses

Update the API route to hash or truncate IPs:

```typescript
// In /app/api/analytics/route.ts
const ip = request.headers.get('x-forwarded-for')?.split('.').slice(0, 3).join('.') + '.0';
```

## Monitoring in Production

### Real-time Monitoring

You can set up real-time monitoring by querying recent data:

```sql
-- Last 100 page views
SELECT * FROM page_views
ORDER BY created_at DESC
LIMIT 100;

-- Active sessions in last 30 minutes
SELECT COUNT(DISTINCT session_id) as active_sessions
FROM page_views
WHERE created_at >= NOW() - INTERVAL '30 minutes';
```

### Alerts

Set up alerts in Supabase for:
- Unusual traffic spikes
- Error patterns
- Geographic anomalies
- Performance issues

## Exporting Data

### CSV Export
```sql
COPY (
  SELECT * FROM page_views
  WHERE created_at >= '2024-01-01'
) TO '/tmp/analytics.csv' WITH CSV HEADER;
```

Or export directly from Supabase dashboard using the "Export to CSV" button.

## Integration with Google Search Console

With the sitemap now available at `https://www.dovvia.com/sitemap.xml`, you can:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (https://www.dovvia.com)
3. Verify ownership
4. Submit your sitemap: `https://www.dovvia.com/sitemap.xml`
5. Monitor indexing status and search performance

The robots.txt file is automatically available at `https://www.dovvia.com/robots.txt` and includes the sitemap reference.

## Next Steps

1. **Set up regular data analysis**: Review analytics weekly or monthly
2. **Create custom dashboards**: Build visualizations for key metrics
3. **Set up alerts**: Get notified of important traffic changes
4. **A/B testing**: Use the data to inform design and content decisions
5. **Performance optimization**: Identify slow pages and optimize them

## Support

If you need help with analytics:
- Check Supabase documentation: https://supabase.com/docs
- Review Vercel analytics docs: https://vercel.com/docs/analytics
- Contact support for custom analytics needs
