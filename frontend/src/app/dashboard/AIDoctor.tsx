import { AppSidebar } from "@/components/app-sidebar";
import axios from "axios";
import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

interface ResponseData {
  text: string;
}

export default function DiseasePrediction() {
  const [cleanedData, setCleanedData] = React.useState<string>("");
  const [symptoms, setSymptoms] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSymptomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSymptoms(e.target.value);
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (!symptoms) {
      alert("Please enter symptoms.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post<ResponseData>("http://localhost:5100/predict", {
        symptoms: symptoms, 
      });

      const responseText = res.data.text;
      const cleanedResponse = responseText.replace(/\*/g, "");

      setCleanedData(cleanedResponse);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
                  <BreadcrumbLink href="/Personalizedplans">Services</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Wellness Insights</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-0 p-4 pt-0">
          <div className="flex flex-1 flex-col gap-0 p-4 pt-0">
            <h1 className="text-2xl font-extrabold mt-2 mb-1">Our AI Prediction</h1>
            <p className="text-sm mt-0 mb-5">
              This predicts the disease based on your input.
            </p>
            <p className="font-normal text-sm text-primary">
              Enter your symptoms below (add commas between symptoms)
            </p>
            <Input
              className="mb-5 mt-3"
              value={symptoms}
              onChange={handleSymptomsChange}
              placeholder="Enter symptoms here"
            />
            <Card>
              <CardHeader>
                <CardTitle>Our Prediction</CardTitle>
                <CardDescription>Your output will be shown here</CardDescription>
              </CardHeader>
              <CardContent className="text-left">
                <p className="font-normal text-sm text-primary">{cleanedData}</p>
              </CardContent>
            </Card>
            <button
              onClick={handleSubmit}
              style={{
                margin: "auto",
                width: "50%",
                marginTop: "3%",
                marginBottom: "2%",
                padding: "10px 20px 10px 20px",
                backgroundColor: "#0000FF",
                borderRadius: "15px",
              }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Get Prediction"}
            </button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
