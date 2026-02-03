"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Search, Filter, Award, Upload, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface ScholarshipRecipient {
  id: string;
  full_name: string;
  school: string;
  year: string;
  grade_level: string;
  image_url: string;
}

export default function ScholarshipsPage() {
  const [recipients, setRecipients] = useState<ScholarshipRecipient[]>([]);
  const [filteredRecipients, setFilteredRecipients] = useState<ScholarshipRecipient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedSchool, setSelectedSchool] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    school: "",
    year: "",
    gradeLevel: "",
    gpa: "",
    essay: "",
    imageUrl: "",
    documentUrl: ""
  });

  // Fetch successful scholarship recipients
  useEffect(() => {
    fetchRecipients();
  }, []);

  const fetchRecipients = async () => {
    try {
      const { data, error } = await supabase
        .from("scholarship_applications")
        .select("id, full_name, school, year, grade_level, image_url")
        .eq("status", "successful")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRecipients(data || []);
      setFilteredRecipients(data || []);
    } catch (error) {
      console.error("Error fetching recipients:", error);
      toast.error("Failed to load scholarship recipients");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter recipients based on search and filters
  useEffect(() => {
    let filtered = recipients;

    // Search filter (name or school)
    if (searchTerm) {
      filtered = filtered.filter(
        (recipient) =>
          recipient.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipient.school.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Year filter
    if (selectedYear !== "all") {
      filtered = filtered.filter((recipient) => recipient.year === selectedYear);
    }

    // School filter
    if (selectedSchool !== "all") {
      filtered = filtered.filter((recipient) => recipient.school === selectedSchool);
    }

    setFilteredRecipients(filtered);
  }, [searchTerm, selectedYear, selectedSchool, recipients]);

  // Get unique years and schools for filters
  const uniqueYears = Array.from(new Set(recipients.map((r) => r.year))).sort((a, b) => b.localeCompare(a));
  const uniqueSchools = Array.from(new Set(recipients.map((r) => r.school))).sort();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("scholarship_applications")
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            school: formData.school,
            year: formData.year,
            grade_level: formData.gradeLevel,
            gpa: formData.gpa,
            essay: formData.essay,
            image_url: formData.imageUrl,
            document_url: formData.documentUrl,
            status: "processing"
          }
        ]);

      if (error) throw error;

      toast.success("Application submitted successfully!", {
        description: "We'll review your application and get back to you soon."
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        school: "",
        year: "",
        gradeLevel: "",
        gpa: "",
        essay: "",
        imageUrl: "",
        documentUrl: ""
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="h-12 w-12" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Dovvia Scholarship Program
              </h1>
            </div>
            <p className="text-xl text-blue-50 mb-8">
              Empowering the next generation of leaders through education.
              We believe every student deserves access to quality education regardless of their financial background.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Award className="h-5 w-5" />
                <span>Merit-Based</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Award className="h-5 w-5" />
                <span>Need-Based</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Award className="h-5 w-5" />
                <span>Full Tuition Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Successful Recipients Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Scholarship Recipients</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Celebrating the bright minds we've had the privilege to support.
              These exceptional students are making a difference in their communities.
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Filter className="h-5 w-5" />
                Filter Recipients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="search">Search by Name or School</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="year-filter">Filter by Year</Label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger id="year-filter">
                      <SelectValue placeholder="All Years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      {uniqueYears.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="school-filter">Filter by School</Label>
                  <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                    <SelectTrigger id="school-filter">
                      <SelectValue placeholder="All Schools" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Schools</SelectItem>
                      {uniqueSchools.map((school) => (
                        <SelectItem key={school} value={school}>
                          {school}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recipients Table */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading recipients...</p>
            </div>
          ) : filteredRecipients.length > 0 ? (
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>School</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Grade Level</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecipients.map((recipient) => (
                        <TableRow key={recipient.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                                {recipient.full_name.charAt(0).toUpperCase()}
                              </div>
                              {recipient.full_name}
                            </div>
                          </TableCell>
                          <TableCell>{recipient.school}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                              {recipient.year}
                            </Badge>
                          </TableCell>
                          <TableCell>{recipient.grade_level}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <GraduationCap className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">
                  {searchTerm || selectedYear !== "all" || selectedSchool !== "all"
                    ? "No recipients match your search criteria."
                    : "No scholarship recipients yet."}
                </p>
              </CardContent>
            </Card>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Showing {filteredRecipients.length} of {recipients.length} recipients
            </p>
          </div>
        </div>
      </section>

      {/* About the Scholarship */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">About Our Scholarship</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Award className="h-6 w-6" />
                    Eligibility Criteria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Nigerian citizen or permanent resident</li>
                    <li>• Currently enrolled or accepted to an accredited institution</li>
                    <li>• Minimum GPA of 3.0 or equivalent</li>
                    <li>• Demonstrated financial need</li>
                    <li>• Community involvement or leadership experience</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Award className="h-6 w-6" />
                    Scholarship Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Full or partial tuition coverage</li>
                    <li>• Academic year renewable funding</li>
                    <li>• Mentorship opportunities</li>
                    <li>• Internship placement assistance</li>
                    <li>• Networking with alumni and professionals</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Apply for Scholarship</h2>
              <p className="text-gray-600">
                Complete the form below to submit your scholarship application.
                All fields marked with * are required.
              </p>
            </div>

            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-700">Scholarship Application Form</CardTitle>
                <CardDescription>
                  Please provide accurate information. Applications are reviewed on a rolling basis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+234 XXX XXX XXXX"
                      />
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Academic Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="school">School/University Name *</Label>
                        <Input
                          id="school"
                          name="school"
                          value={formData.school}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., University of Abuja"
                        />
                      </div>
                      <div>
                        <Label htmlFor="year">Academic Year *</Label>
                        <Input
                          id="year"
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., 2024, 2025"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="gradeLevel">Current Grade/Level *</Label>
                        <Input
                          id="gradeLevel"
                          name="gradeLevel"
                          value={formData.gradeLevel}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Year 1, SS3, 100 Level"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gpa">GPA or Equivalent</Label>
                        <Input
                          id="gpa"
                          name="gpa"
                          value={formData.gpa}
                          onChange={handleInputChange}
                          placeholder="e.g., 3.8/4.0 or First Class"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Essay */}
                  <div>
                    <Label htmlFor="essay">Personal Statement / Essay *</Label>
                    <Textarea
                      id="essay"
                      name="essay"
                      value={formData.essay}
                      onChange={handleInputChange}
                      required
                      rows={8}
                      placeholder="Tell us about yourself, your academic goals, why you deserve this scholarship, and how you plan to contribute to your community... (Minimum 200 words)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum 200 words. Share your story, aspirations, and how this scholarship will help you achieve your goals.
                    </p>
                  </div>

                  {/* Document Uploads */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Supporting Documents
                    </h3>
                    <div>
                      <Label htmlFor="imageUrl">Photo URL</Label>
                      <Input
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        placeholder="Link to your photo (Google Drive, Dropbox, etc.)"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Share a link to a professional photo
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="documentUrl">Academic Documents URL *</Label>
                      <Input
                        id="documentUrl"
                        name="documentUrl"
                        value={formData.documentUrl}
                        onChange={handleInputChange}
                        required
                        placeholder="Link to transcripts, certificates, etc."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Share a link to your academic transcripts, certificates, or recommendation letters (Google Drive, Dropbox, etc.)
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    {isSubmitting ? (
                      "Submitting Application..."
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
