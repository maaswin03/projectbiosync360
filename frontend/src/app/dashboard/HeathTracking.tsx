import { AppSidebar } from "@/components/app-sidebar";
import { BloodPressure } from "@/components/BloodPressure";
import { Ecgmonitoring } from "@/components/Ecgmonitoring";
import * as React from "react";
import { HeartRate } from "@/components/HeartRate";
import { Pulse } from "@/components/Pulse";
import { Temperature } from "@/components/Temperature";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

interface SensorData {
  [key: string]: any;
}

const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function HealthTracking() {
  // const position: [number, number] = [11.0131, 77.1146];
  const [Data, setData] = React.useState<SensorData>({});
  const [user, setuserData] = React.useState<SensorData>({});
  const [bloodpressueeData, setbloodpressureData] = React.useState<SensorData>(
    {}
  );
  const [temperatureData, settemperetureData] = React.useState<SensorData>({});

  const username = "maaswin";

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
        const response = await fetch("http://localhost:5100/userinfo", {
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

        setuserData(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  console.log(user.longitude);

  const latitude = user.latitude ?? 0;

  const longitude = user.longitude ?? 0;

  const position: [number, number] = [latitude, longitude];

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
                  <BreadcrumbLink href="/HealthTracking">
                    Services
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Health Tracking</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Ecgmonitoring />
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <Temperature />
            <HeartRate />
            <BloodPressure />
            <Pulse />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <h1 className="text-2xl font-extrabold mt-2 mb-0">
            Current Readings
          </h1>
          <p className="text-sm mt-0 mb-3">
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
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mb-3">
          <div className="grid auto-rows-min gap-4">
            {latitude && longitude ? (
              <MapContainer
                center={position}
                zoom={10}
                style={{ height: "500px", width: "100%", borderRadius: "10px" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={markerIcon}>
                  <Popup>
                    <strong style={{ fontWeight: "700" }}>
                      {Data.username}
                    </strong>
                    <br />
                    Temperature: {temperatureData.currenttemperature}°F
                    <br />
                    Pulse Rate: {Data.currentpulseRate} BPM
                    <br />
                    Heart Rate: {Data.currentheartRate} BPM
                    <br />
                    SpO2: {bloodpressueeData.currentsp02} %
                    <br />
                    time:{" "}
                    {new Date(Data.pre1time).toLocaleString("en-US", {
                      hour: "numeric",
                      hour12: true,
                    })}
                    <br />
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div>Loading map...</div>
            )}
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
