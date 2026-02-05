"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  MapPin,
  Clock,
  Gamepad2Icon,
  HelpingHand,
  BriefcaseMedicalIcon,
  Send,
  CheckCircle2,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import Image from "next/image";

interface JobPosting {
  id: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  extra: string;
  bonus: string;
  health?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  department: string;
}

const jobPostings: JobPosting[] = [
  {
    id: "1",
    title: "Production Staff",
    location: "Abuja, Nigeria",
    type: "Full-time (160 hours/month)",
    salary: "₦450/hour",
    department: "Production",
    extra: "14 days paid leave annually",
    bonus: "Performance-based bonuses",
    health: "Health insurance coverage",
    description:
      "Perform various tasks in the production line to ensure efficient and high-quality water bottling processes.",
    requirements: [
      "Minimum of SSCE or equivalent",
      "Experience in manufacturing/production management",
      "Strong knowledge of quality control and safety regulations",
      "Excellent interpersonal, team-play and communication skills",
      "Ability to work in a fast-paced environment",
      "Ability to lift heavy objects and stand for long periods",
      "Ability to work flexible hours, including weekends and holidays",
      "Willingness to learn and adapt to new processes",
    ],
    responsibilities: [
      "Operate production machinery and equipment",
      "Maintain cleanliness and organization of the production area",
      "Follow safety protocols and quality standards",
      "Assist in inventory management and stock control",
      "Report any issues or malfunctions to supervisors",
      "Collaborate with team members to meet production targets",
      "Any other duties as assigned by the Production Manager",
    ],
  },
  {
    id: "2",
    title: "Quality Assurance Officer",
    location: "Abuja, Nigeria",
    type: "Part-time",
    salary: "₦1,000/hour",
    department: "Production",
    extra: "14 days paid leave annually",
    bonus: "Performance-based bonuses",
    health: "Health insurance coverage",
    description:
      "Ensure our water meets, and possibly exceeds all quality standards through rigorous and consistent testing, following quality control, and safety procedures.",
    requirements: [
      "Bachelor's degree in Chemistry, Food Science, or related field",
      "2+ years of experience in quality assurance",
      "Knowledge of water quality standards and regulations",
      "Attention to detail and analytical skills",
      "Strong communication and documentation skills",
      "Ability to work independently and in a team",
      "Proficiency in using laboratory equipment and software",
      "Willingness to stay updated with industry trends and regulations",
      "Ability to work flexible hours if needed",
    ],
    responsibilities: [
      "Conduct regular water quality testing",
      "Maintain quality control documentation",
      "Identify and address quality issues",
      "Train staff on quality standards and procedures",
      "Collaborate with production team to ensure quality",
      "Ensure HACCP and food safety compliance",
      "Ensure compliance with regulatory standards",
      "Implement quality improvement initiatives",
    ],
  },
  {
    id: "3",
    title: "Customer/Sales Executive",
    location: "Abuja, Nigeria",
    type: "Full-time (online and field)",
    salary: "% commission or #80,000/month",
    department: "Sales",
    extra: "7 days paid leave annually",
    bonus: "₦40,000",
    health: "Health insurance coverage",
    description:
      "Drive, stabilize and grow sales by managing customers (distributors, retailers, and corporate clients) at your designated area.",
    requirements: [
      "Bachelor's degree in any field",
      "2+ years of sales experience, preferably in FMCG",
      "Excellent communication and negotiation skills",
      "Valid driver's license is a plus",
      "Strong organizational and time management skills",
      "Ability to work independently and as part of a team",
      "Proficiency in MS Office and CRM software",
      "Willingness to travel within assigned area",
    ],
    responsibilities: [
      "Identify and pursue new business opportunities",
      "Work with delivery team to ensure timely order fulfillment",
      "Build and maintain client relationships",
      "Assist customers orders, inquiries, and issues",
      "Achieve daily, weekly and monthly schedules and targets",
      "Provide market intelligence and feedback",
      "Prepare sales reports and forecasts",
      "Use CRM to manage customer interactions",
      "Coordinate with marketing for promotional activities",
      "Use AI tools to enhance sales strategies",
    ],
  },
  {
    id: "4",
    title: "Delivery Officer",
    location: "Abuja, Nigeria",
    type: "Full-time/Part-time",
    salary: "% commission on successful deliveries",
    department: "Sales",
    extra: "7 days bonus paid annual leave",
    bonus: "₦20,000",
    health: "Health insurance coverage",
    description:
      "Execute distribution operations to ensure timely delivery of products to customers across our service areas.",
    requirements: [
      "valid driver's license and clean driving record",
      "2+ years of logistics/distribution experience",
      "Strong organizational and problem-solving skills",
      "Familiarity with Abuja road networks",
      "Excellent communication and interpersonal skills",
      "Ability to work under pressure and meet deadlines",
    ],
    responsibilities: [
      "deliver products to customers on time",
      "work together with sales executives, other drivers and warehouse staff",
      "maintain delivery vehicle in good condition",
      "ensure accurate delivery documentation",
      "adhere to safety and traffic regulations",
      "report any delivery issues or delays to management",
      "optimize delivery routes for efficiency",
      "assist with loading and unloading of goods",
      "provide excellent customer service during deliveries",
    ],
  },
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    religion: "",
    position: "",
    resume: "",
    coverLetter: "",
    linkedIn: "",
    experience: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleJobClick = (job: JobPosting) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
    setFormData({ ...formData, position: job.title });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL;

    if (!WEBHOOK_URL) {
      toast.error(
        "Application submission failed: Webhook URL is not configured.",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare data for Zoho Recruit integration
      const applicationData = {
        ...formData,
        jobId: selectedJob?.id,
        jobTitle: selectedJob?.title,
        department: selectedJob?.department,
        appliedDate: new Date().toISOString(),
        source: "Company Website",
      };

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      toast.success("Application submitted successfully!", {
        description: "We'll review your application and get back to you soon.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        age: "",
        religion: "",
        position: "",
        resume: "",
        coverLetter: "",
        linkedIn: "",
        experience: "",
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
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white">
      <Toaster />
      {/* Hero Section */}
      <div className="absolute z-10 inset-0 bg-[url('/dovvia_staff.png')] bg-cover opacity-10"></div>
      <section className="relative w-full pt-20 bg-gradient-to-r from-emerald-900 to-emerald-400 text-white">
        <div className="container w-full mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-emerald-50 mb-8">
              We are an excellent, simple and loving people.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle2 className="h-4 w-4" />
                <span>Proper Pay</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle2 className="h-4 w-4" />
                <span>Health Insurance</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle2 className="h-4 w-4" />
                <span>Career Growth</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle2 className="h-4 w-4" />
                <span>Paid leave</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Work With Dovvia?
          </h2>
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
                  Make a real difference by providing clean water to communities
                  and contributing to sustainable development goals.
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
                  Advance your career with training opportunities, mentorship
                  programs, and clear paths for professional development.
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
                  Join a diverse team that values innovation, collaboration, and
                  excellence in everything we do.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Open Positions
          </h2>
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
                    <CardTitle className="text-xl text-emerald-700">
                      {job.title}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-dovvia-700"
                    >
                      {job.department}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    {job.description}
                  </CardDescription>
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
                      <span className="h-4 w-4 text-center  text-emerald-600">
                        ₦
                      </span>
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <HelpingHand className="h-4 w-4 text-emerald-600" />
                      {job.bonus}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Gamepad2Icon className="h-4 w-4 text-emerald-600" />
                      {job.extra}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BriefcaseMedicalIcon className="h-4 w-4 text-emerald-600" />
                      {job.health}
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-dovvia-800 hover:bg-emerald-700">
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
                  <h3 className="text-2xl font-bold text-emerald-700">
                    Apply for {selectedJob.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {selectedJob.location} • {selectedJob.type}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowApplicationForm(false);
                    setSelectedJob(null);
                  }}
                  className="text-red-700 border-red-700 text-xl hover:bg-red-200"
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

                <h4 className="font-semibold text-lg mb-3">
                  Key Responsibilities
                </h4>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  {selectedJob.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-gray-600">
                      {resp}
                    </li>
                  ))}
                </ul>

                <h4 className="font-semibold text-lg mb-3">Requirements</h4>
                <ul className="list-disc list-inside space-y-2">
                  {selectedJob.requirements.map((req, idx) => (
                    <li key={idx} className="text-gray-600">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application Form */}
              <div className="border-t pt-6">
                <h4 className="font-semibold text-lg mb-4">
                  Submit Your Application
                </h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        placeholder="Bola"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        placeholder="Ahmed"
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
                        placeholder="tinubu@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        placeholder="18"
                      />
                    </div>
                    <div>
                      <Label htmlFor="religion">Religion *</Label>
                      <Input
                        id="religion"
                        name="religion"
                        type="text"
                        value={formData.religion}
                        onChange={handleInputChange}
                        required
                        placeholder="Muslim, Christian, Traditionalist etc."
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
                    <Label htmlFor="linkedIn">
                      LinkedIn Profile (Optional)
                    </Label>
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
                      Please share a link to your resume (Google Drive, Dropbox,
                      OneDrive, etc.)
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
                      rows={8}
                      placeholder="Tell us why you're the best for this role..."
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="destructive"
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
