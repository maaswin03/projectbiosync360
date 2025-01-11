"use client";

import { TrendingUp } from "lucide-react";
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
  systolic: {
    label: "Systolic (mmHg)",
    color: "hsl(340, 70%, 50%)",
  },
  diastolic: {
    label: "Diastolic (mmHg)",
    color: "hsl(200, 70%, 50%)",
  },
} satisfies ChartConfig;

export function BloodPressure() {
  const [Data, setData] = React.useState<SensorData>({});

  const username = "maaswin";

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5100/bloodpressure_data", {
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

        setData(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  const chartData = [
    {
      hour: new Date(Data.currenttime).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      SpO2: Data.currentsp02,
    },
    {
      hour: new Date(Data.pre1time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      SpO2: Data.pre1sp02
    },
    {
      hour: new Date(Data.pre2time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      SpO2: Data.pre2sp02
    },
    {
      hour: new Date(Data.pre3time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      SpO2: Data.pre3sp02
    },
    {
      hour: new Date(Data.pre4time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      SpO2: Data.pre4sp02
    },
    {
      hour: new Date(Data.pre5time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      SpO2: Data.pre5sp02
    },
    {
      hour: new Date(Data.pre6time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      SpO2: Data.pre6sp02
    },
  ];

  console.log(chartData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>SpO2 - Last 7 hours</CardTitle>
        <CardDescription>
          Real-time human body oxygen saturation readings (%)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              left: -30,
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
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="SpO2"
              type="monotone"
              stroke="var(--color-systolic)"
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
              Trending up in oxygen saturation readings{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing the trend for oxygen saturation over the past 7 hours
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
