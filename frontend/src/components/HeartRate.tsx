"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";


interface SensorData {
  [key: string]: any;
}

const chartConfig = {
  heartRate: {
    label: "Heart Rate (bpm)",
    color: "hsl(340, 70%, 50%)",
  },
  pulseRate: {
    label: "Pulse Rate (bpm)",
    color: "hsl(200, 70%, 50%)",
  },
} satisfies ChartConfig;

export function HeartRate() {
  const [Data, setData] = React.useState<SensorData>({});
  const username = "maaswin";

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
  
  const chartData = [
  { 
    hour: new Date(Data.currenttime).toLocaleString('en-US', { hour: 'numeric', hour12: true }), 
    heartRate: Data.currentheartRate, 
    pulseRate: Data.currentpulseRate 
  },
  { 
    hour: new Date(Data.pre1time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), 
    heartRate: Data.pre1heartRate, 
    pulseRate: Data.pre1pulseRate 
  },
  { 
    hour: new Date(Data.pre2time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), 
    heartRate: Data.pre2heartRate, 
    pulseRate: Data.pre2pulseRate 
  },
  { 
    hour: new Date(Data.pre3time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), 
    heartRate: Data.pre3heartRate, 
    pulseRate: Data.pre3pulseRate 
  },
  { 
    hour: new Date(Data.pre4time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), 
    heartRate: Data.pre4heartRate, 
    pulseRate: Data.pre4pulseRate 
  },
  { 
    hour: new Date(Data.pre5time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), 
    heartRate: Data.pre5heartRate, 
    pulseRate: Data.pre5pulseRate 
  },
  { 
    hour: new Date(Data.pre6time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), 
    heartRate: Data.pre6heartRate, 
    pulseRate: Data.pre6pulseRate 
  }
];

  const totalheartrate = chartData.reduce((sum, data) => sum + data.heartRate, 0)
  const averageheartrate = (totalheartrate / chartData.length).toFixed(1)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Heart Rate and Pulse Rate - Last 7 hours</CardTitle>
        <CardDescription>
          Real-time Heart Rate and Pulse Rate readings (BPM)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis domain={[60, 100]} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="heartRate"
              type="monotone"
              stroke="var(--color-heartRate)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="pulseRate"
              type="monotone"
              stroke="var(--color-pulseRate)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              The average heart rate is {averageheartrate} bpm.
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing trends for heart rate and pulse rate over the past 7 hours
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
