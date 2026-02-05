import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const geo = (request as any).geo;
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    const userAgent = request.headers.get('user-agent') || '';

    const deviceType = getDeviceType(userAgent);
    const browser = getBrowser(userAgent);
    const os = getOS(userAgent);

    const analyticsData = {
      page_path: data.pagePath,
      page_title: data.pageTitle,
      referrer: data.referrer,
      user_agent: userAgent,
      device_type: deviceType,
      browser: browser,
      os: os,
      country: geo?.country || data.country || '',
      city: geo?.city || data.city || '',
      region: geo?.region || data.region || '',
      ip_address: ip,
      latitude: geo?.latitude || data.latitude || '',
      longitude: geo?.longitude || data.longitude || '',
      session_id: data.sessionId,
      screen_width: data.screenWidth,
      screen_height: data.screenHeight,
      language: data.language,
      timezone: data.timezone,
    };

    const { error } = await supabase
      .from('page_views')
      .insert([analyticsData]);

    if (error) {
      console.error('Error inserting analytics:', error);
      return NextResponse.json(
        { error: 'Failed to save analytics' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function getDeviceType(userAgent: string): string {
  if (/mobile/i.test(userAgent)) return 'mobile';
  if (/tablet|ipad/i.test(userAgent)) return 'tablet';
  return 'desktop';
}

function getBrowser(userAgent: string): string {
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Edg')) return 'Edge';
  if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
  return 'Unknown';
}

function getOS(userAgent: string): string {
  if (userAgent.includes('Windows NT')) return 'Windows';
  if (userAgent.includes('Mac OS X')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
  return 'Unknown';
}
