import { AppSidebar } from "@/components/app-sidebar";
import {
  Activity,
  Brain,
  Stethoscope,
  LineChart,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <section id="home" className="pt-0 pb-10 sm:pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-6 xl:col-span-7">
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                    <span className="block">Your Health , </span>
                    <span className="block text-blue-600">Powered by AI</span>
                  </h1>
                  <p className="mt-6 text-base text-wite max-w-3xl">
                    AI-powered real-time health monitoring and personalized
                    doctor consultations
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                    <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm">
                      Book AI Consultation
                    </button>
                  </div>
                </div>
                <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6 xl:col-span-5">
                  <div className="bg-white/60 backdrop-blur-sm shadow-xl rounded-2xl p-8">
                    <img
                      src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80"
                      alt="Health Technology"
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-white mb-12">
                Revolutionizing Healthcare with AI
              </h2>
              <div className="grid md:grid-cols-3 gap-8">

                <Card>
                  <CardHeader>
                    <CardTitle className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                      <Brain className="h-6 w-6 text-blue-600" />
                    </CardTitle>
                    <CardTitle> Real-time Monitoring</CardTitle>
                    <CardDescription>Current Readings</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center text-left">
                    24/7 health tracking with AI-powered insights and early
                    warning systems for preventive care.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                      <Stethoscope className="h-6 w-6 text-blue-600" />
                    </CardTitle>
                    <CardTitle>AI Consultations</CardTitle>
                    <CardDescription>Current Readings</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center text-left">
                    Connect with AI-powered medical professionals for instant
                    consultations and expert advice.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                      <LineChart className="h-6 w-6 text-blue-600" />
                    </CardTitle>
                    <CardTitle>Personalized Plans</CardTitle>
                    <CardDescription>Current Readings</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center text-left">
                    Get customized wellness programs and treatment plans based
                    on your unique health profile.
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section id="faq" className="py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-white mb-12">
                Frequently Asked Questions
              </h2>
              <div className="space-y-2">
                <Card className="max-w-3xl mx-auto px-10 sm:px-60 lg:px-1">
                  <CardHeader>
                    <CardTitle>
                      How accurate is the AI health monitoring?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-left">
                    Our AI system maintains a 99.9% accuracy rate, validated by
                    leading medical institutions and continuous learning from
                    vast health datasets.
                  </CardContent>
                </Card>
                                <Card className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-1">
                  <CardHeader>
                    <CardTitle>
                    Is my health data secure?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-left">
                  Yes, we use enterprise-grade encryption and comply with
                    HIPAA regulations to ensure your health data remains private
                    and secure.
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <footer className="border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <Activity className="h-8 w-8 text-blue-600" />
                    <span className="text-xl font-bold text-white">
                      BioSync360
                    </span>
                  </div>
                  <p className="text-white max-w-md">
                    Revolutionizing healthcare through AI-powered monitoring and
                    personalized consultations.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                    Legal
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="#privacy"
                      className="block text-white hover:text-blue-600 transition"
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="#terms"
                      className="block text-white hover:text-blue-600 transition"
                    >
                      Terms of Service
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                    Connect
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="#twitter"
                      className="text-white hover:text-blue-600 transition"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href="#linkedin"
                      className="text-white hover:text-blue-600 transition"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="#github"
                      className="text-white hover:text-blue-600 transition"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href="mailto:contact@biosync360.com"
                      className="text-white hover:text-blue-600 transition"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-center text-white pb-0 mb-0">
                  © {new Date().getFullYear()} BioSync360 . All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
