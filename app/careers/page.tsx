"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Clock, DollarSign, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface JobPosting {
  id: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  department: string;
}

const jobPostings: JobPosting[] = [
  {
    id: "1",
    title: "Production Manager",
    location: "Abuja, Nigeria",
    type: "Full-time",
    salary: "Competitive",
    department: "Operations",
    description: "Lead our production team to ensure efficient manufacturing of premium bottled water while maintaining the highest quality standards.",
    requirements: [
      "Bachelor's degree in Industrial Engineering, Operations Management, or related field",
      "5+ years of experience in manufacturing/production management",
      "Strong knowledge of quality control and safety regulations",
      "Excellent leadership and team management skills"
    ],
    responsibilities: [
      "Oversee daily production operations",
      "Ensure compliance with quality and safety standards",
      "Manage production team and optimize workflows",
      "Monitor production metrics and implement improvements"
    ]
  },
  {
    id: "2",
    title: "Quality Assurance Specialist",
    location: "Abuja, Nigeria",
    type: "Full-time",
    salary: "Competitive",
    department: "Quality Control",
    description: "Ensure our water meets and exceeds all quality standards through rigorous testing and quality control procedures.",
    requirements: [
      "Bachelor's degree in Chemistry, Food Science, or related field",
      "3+ years of experience in quality assurance",
      "Knowledge of water quality standards and regulations",
      "Attention to detail and analytical skills"
    ],
    responsibilities: [
      "Conduct regular water quality testing",
      "Maintain quality control documentation",
      "Ensure compliance with regulatory standards",
      "Implement quality improvement initiatives"
    ]
  },
  {
    id: "3",
    title: "Sales Executive",
    location: "Abuja, Nigeria",
    type: "Full-time",
    salary: "Base + Commission",
    department: "Sales",
    description: "Drive sales growth by building relationships with distributors, retailers, and corporate clients across Nigeria.",
    requirements: [
      "Bachelor's degree in Business, Marketing, or related field",
      "2+ years of sales experience, preferably in FMCG",
      "Excellent communication and negotiation skills",
      "Valid driver's license"
    ],
    responsibilities: [
      "Identify and pursue new business opportunities",
      "Build and maintain client relationships",
      "Achieve monthly and quarterly sales targets",
      "Provide market intelligence and feedback"
    ]
  },
  {
    id: "4",
    title: "Logistics Coordinator",
    location: "Abuja, Nigeria",
    type: "Full-time",
    salary: "Competitive",
    department: "Logistics",
    description: "Coordinate distribution operations to ensure timely delivery of products to customers across our service areas.",
    requirements: [
      "Bachelor's degree in Logistics, Supply Chain, or related field",
      "3+ years of logistics/distribution experience",
      "Strong organizational and problem-solving skills",
      "Familiarity with logistics software"
    ],
    responsibilities: [
      "Manage distribution schedules and routes",
      "Coordinate with drivers and warehouse staff",
      "Track shipments and resolve delivery issues",
      "Optimize logistics operations for efficiency"
    ]
  }
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    resume: "",
    coverLetter: "",
    linkedIn: "",
    experience: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleJobClick = (job: JobPosting) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
    setFormData({ ...formData, position: job.title });
  };

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
      // Prepare data for Zoho Recruit integration
      const applicationData = {
        ...formData,
        jobId: selectedJob?.id,
        department: selectedJob?.department,
        appliedDate: new Date().toISOString(),
        source: "Company Website"
      };

      // TODO: Send to Zoho Recruit API
      // This is the integration point for Zoho Recruit
      // You'll need to add your Zoho Recruit API credentials and endpoint
      // Example endpoint: https://recruit.zoho.com/recruit/v2/Candidates

      console.log("Application data for Zoho Recruit:", applicationData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success("Application submitted successfully!", {
        description: "We'll review your application and get back to you soon."
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        resume: "",
        coverLetter: "",
        linkedIn: "",
        experience: ""
      });
      setShowApplicationForm(false);
      setSelectedJob(null);
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-emerald-50 mb-8">
              Be part of a mission to provide clean, safe, and sustainable water to communities across Nigeria.
              We're looking for passionate individuals who want to make a difference.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle2 className="h-5 w-5" />
                <span>Competitive Salary</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle2 className="h-5 w-5" />
                <span>Health Benefits</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle2 className="h-5 w-5" />
                <span>Career Growth</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Work With Dovvia?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="h-6 w-6" />
                  Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Make a real difference by providing clean water to communities and contributing to sustainable development goals.
                </p>
              </CardContent>
            </Card>
            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="h-6 w-6" />
                  Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Advance your career with training opportunities, mentorship programs, and clear paths for professional development.
                </p>
              </CardContent>
            </Card>
            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="h-6 w-6" />
                  Culture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Join a diverse team that values innovation, collaboration, and excellence in everything we do.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Open Positions</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore our current job openings and find the perfect role for you.
            Click on any position to learn more and apply.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {jobPostings.map((job) => (
              <Card
                key={job.id}
                className="hover:shadow-lg transition-shadow cursor-pointer border-emerald-100"
                onClick={() => handleJobClick(job)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl text-emerald-700">{job.title}</CardTitle>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                      {job.department}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">{job.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-emerald-600" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 text-emerald-600" />
                      {job.salary}
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
                    <Briefcase className="h-4 w-4 mr-2" />
                    View Details & Apply
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full my-8">
            <div className="p-6 border-b">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-emerald-700">Apply for {selectedJob.title}</h3>
                  <p className="text-gray-600 mt-1">{selectedJob.location} • {selectedJob.type}</p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowApplicationForm(false);
                    setSelectedJob(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {/* Job Details */}
              <div className="mb-8">
                <h4 className="font-semibold text-lg mb-3">About the Role</h4>
                <p className="text-gray-600 mb-4">{selectedJob.description}</p>

                <h4 className="font-semibold text-lg mb-3">Key Responsibilities</h4>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  {selectedJob.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-gray-600">{resp}</li>
                  ))}
                </ul>

                <h4 className="font-semibold text-lg mb-3">Requirements</h4>
                <ul className="list-disc list-inside space-y-2">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx} className="text-gray-600">{req}</li>
                  ))}
                </ul>
              </div>

              {/* Application Form */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-lg mb-4">Submit Your Application</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
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

                  <div className="grid md:grid-cols-2 gap-4">
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
                    <div>
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <Input
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 5 years"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="linkedIn">LinkedIn Profile (Optional)</Label>
                    <Input
                      id="linkedIn"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>

                  <div>
                    <Label htmlFor="resume">Resume/CV Link *</Label>
                    <Input
                      id="resume"
                      name="resume"
                      value={formData.resume}
                      onChange={handleInputChange}
                      required
                      placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Please share a link to your resume (Google Drive, Dropbox, OneDrive, etc.)
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="coverLetter">Cover Letter *</Label>
                    <Textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Tell us why you're a great fit for this role..."
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowApplicationForm(false);
                        setSelectedJob(null);
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
