"use client";

import { TrendingUp } from "lucide-react";
import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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
  temperature: {
    label: "Temperature (°F)",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function Temperature() {
  const [Data, setData] = React.useState<SensorData>({});

  const username = "maaswin";

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5100/temperature_data",
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
    { hour: new Date(Data.currenttime).toLocaleString('en-US', { hour: 'numeric', hour12: true }), temperature: Data.currenttemperature },
    { hour: new Date(Data.pre1time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), temperature: Data.pre1temperature },
    { hour: new Date(Data.pre2time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), temperature: Data.pre2temperature },
    { hour: new Date(Data.pre3time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), temperature: Data.pre3temperature },
    { hour: new Date(Data.pre4time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), temperature: Data.pre4temperature },
    { hour: new Date(Data.pre5time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), temperature: Data.pre5temperature },
    { hour: new Date(Data.pre6time).toLocaleString('en-US', { hour: 'numeric', hour12: true }), temperature: Data.pre6temperature },
  ];
  
  
  const totalTemperature = chartData.reduce(
    (sum, data) => sum + data.temperature,
    0
  );
  const averageTemperature = (totalTemperature / chartData.length).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature - Last 7 Hours</CardTitle>
        <CardDescription>
          Real-time human body temperature readings (°F)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="hour"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis
              dataKey="temperature"
              type="number"
              domain={[90, 105]}
              tickCount={6}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="temperature"
              layout="vertical"
              fill="var(--color-temperature)"
              radius={4}
            >
              <LabelList
                dataKey="hour"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="temperature"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          The average body temperature is {averageTemperature}°F.{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing body temperature variations over the last 7 hours
        </div>
      </CardFooter>
    </Card>
  );
}
