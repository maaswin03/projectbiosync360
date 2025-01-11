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
  bpm: {
    label: "Pulse (BPM)",
    color: "hsl(340, 70%, 50%)",
  },
} satisfies ChartConfig;

export function Pulse() {
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

  const pulseData = [
    {
      hour: new Date(Data.currenttime).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      bpm: Data.currentpulseRate,
    },
    {
      hour: new Date(Data.pre1time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      bpm: Data.pre1pulseRate,
    },
    {
      hour: new Date(Data.pre2time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      bpm: Data.pre2pulseRate,
    },
    {
      hour: new Date(Data.pre3time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      bpm: Data.pre3pulseRate,
    },
    {
      hour: new Date(Data.pre4time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      bpm: Data.pre4pulseRate,
    },
    {
      hour: new Date(Data.pre5time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      bpm: Data.pre5pulseRate,
    },
    {
      hour: new Date(Data.pre6time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      bpm: Data.pre6pulseRate,
    },
  ];

  const totalPulse = pulseData.reduce((sum, data) => sum + data.bpm, 0);
  const averagePulse = (totalPulse / pulseData.length).toFixed(1);

  console.log(pulseData)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pulse Rate - Last 7 Hours</CardTitle>
        <CardDescription>
          Real-time human body Pulse readings (BPM){" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={pulseData}
            margin={{
              left: 14,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{
                value: "Time",
                position: "insideBottom",
                offset: -10,
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[60, 100]}
              label={{
                value: "BPM",
                angle: -90,
                position: "insideLeft",
                offset: -10,
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="bpm"
              type="monotone"
              stroke="hsl(340, 70%, 50%)" // Pink color
              strokeWidth={3}
              dot={{ stroke: "hsl(340, 70%, 50%)", strokeWidth: 2 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              The average body temperature is {averagePulse} bpm.
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Data represents hourly pulse readings from 1 AM to 7 AM
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
