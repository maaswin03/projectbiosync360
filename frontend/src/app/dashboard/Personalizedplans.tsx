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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface SensorData {
  [key: string]: any;
}

interface ResponseData {
  text: string;
}

export default function Personalizedplans() {
  const [Data, setData] = React.useState<SensorData>({});
  const [cleanedData, setcleanedData] = React.useState<String>(" ");
  const [cleanedData1, setcleanedData1] = React.useState<String>(" ");
  const [cleanedData2, setcleanedData2] = React.useState<String>(" ");
  const [bloodpressueeData, setbloodpressureData] = React.useState<SensorData>(
    {}
  );
  const [temperatureData, settemperetureData] = React.useState<SensorData>({});

  const username = "maaswin";

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();

    try {
      const res = await axios.post<ResponseData>(
        "http://localhost:5100/spo2_suggestions",
        {
          username: username,
        }
      );
      const responseText = res.data.text;

      const cleanedResponse = responseText.replace(/\*/g, "");

      setcleanedData(cleanedResponse);

      console.log(cleanedResponse);
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      const res = await axios.post<ResponseData>(
        "http://localhost:5100/temperature_suggestions",
        {
          username: username,
        }
      );
      const responseText1 = res.data.text;

      const cleanedResponse1 = responseText1.replace(/\*/g, "");

      setcleanedData1(cleanedResponse1);

      console.log(cleanedResponse1);
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      const res = await axios.post<ResponseData>(
        "http://localhost:5100/pulseandheartrate_suggestions",
        {
          username: username,
        }
      );
      const responseText2 = res.data.text;

      const cleanedResponse2 = responseText2.replace(/\*/g, "");

      setcleanedData2(cleanedResponse2);

      console.log(cleanedResponse2);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5100/temperature_data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        settemperetureData(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5100/bloodpressure_data",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setbloodpressureData(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5100/heartandpulse_data",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setData(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

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
                  <BreadcrumbLink href="/Personalizedplans">
                    Services
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Personalized Plans</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-0 p-4 pt-0">
          <div className="flex flex-1 flex-col gap-0 p-4 pt-0">
            <h1 className="text-2xl font-extrabold mt-2 mb-1">
              Current Readings
            </h1>
            <p className="text-sm mt-0 mb-5">
              This displays the current readings for various parameters.
            </p>
            <div className="grid auto-rows-min gap-4 md:grid-cols-4">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>SpO2</CardTitle>
                    <CardDescription>Current Readings</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-2xl font-extrabold text-primary">
                      {bloodpressueeData.currentsp02} %
                    </p>
                  </CardContent>
                  <CardFooter>
                    <CardDescription>Updated 5 minutes ago</CardDescription>
                  </CardFooter>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Temperature</CardTitle>
                    <CardDescription>Current Readings</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-2xl font-extrabold text-primary">
                      {temperatureData.currenttemperature}°F
                    </p>
                  </CardContent>
                  <CardFooter>
                    <CardDescription>Updated 5 minutes ago</CardDescription>
                  </CardFooter>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Heart Rate</CardTitle>
                    <CardDescription>Current Readings</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-2xl font-extrabold text-primary">
                      {Data.currentheartRate} BPM
                    </p>
                  </CardContent>
                  <CardFooter>
                    <CardDescription>Updated 5 minutes ago</CardDescription>
                  </CardFooter>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Pulse Rate</CardTitle>
                    <CardDescription>Current Readings</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-2xl font-extrabold text-primary">
                      {Data.currentpulseRate} BPM
                    </p>
                  </CardContent>
                  <CardFooter>
                    <CardDescription>Updated 5 minutes ago</CardDescription>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-0 p-4 pt-0">
          <div className="flex flex-1 flex-col gap-0 p-4 pt-0">
            <h1 className="text-2xl font-extrabold mt-2 mb-1">
              Personalized plans
            </h1>
            <p className="text-sm mt-0 mb-5">
              This displays the suggestions based on the health parameters.
            </p>
            <div className="mb-5">
              <Card>
                <CardHeader>
                  <CardTitle>Suggestion based on Current Temperature</CardTitle>
                  <CardDescription>
                    Current Readings : {temperatureData.currenttemperature}°F
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-justify">
                  <p className="font-normal text-sm text-primary">
                    {cleanedData1}
                  </p>
                </CardContent>
                <CardFooter>
                  <CardDescription>
                    click get suggestion button below
                  </CardDescription>
                </CardFooter>
              </Card>
            </div>

            <div className="mb-5">
              <Card>
                <CardHeader>
                  <CardTitle>Suggestion based on Current SpO2</CardTitle>
                  <CardDescription>
                    Current Readings : {bloodpressueeData.currentsp02} %
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-justify">
                  <p className="font-normal text-sm text-primary">
                    {cleanedData2}
                  </p>
                </CardContent>
                <CardFooter>
                  <CardDescription>
                    click get suggestion button below
                  </CardDescription>
                </CardFooter>
              </Card>
            </div>

            <div className="mb-5">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Suggestion based on Current Heart Rate and Pulse Rate
                  </CardTitle>
                  <CardDescription>
                    Current Readings : {Data.currentheartRate} BPM &{" "}
                    {Data.currentpulseRate} BPM
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-justify">
                  <p className="font-normal text-sm text-primary">
                    {cleanedData2}
                  </p>
                </CardContent>
                <CardFooter>
                  <CardDescription>
                    click get suggestion button below
                  </CardDescription>
                </CardFooter>
              </Card>
            </div>
            <button onClick={handleSubmit} style={{ margin:"auto", width:"50%" , marginTop:'3%', marginBottom:"2%" ,  padding:"10px 20px 10px 20px" , backgroundColor:"#0000FF" , borderRadius:"15px"}}>get Suggestions</button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
