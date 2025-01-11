"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SensorData {
  [key: string]: any;
}

const chartConfig = {
  ecg: {
    label: "ECG",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Ecgmonitoring() {
  const [timeRange, setTimeRange] = React.useState("24");
  const [Data, setData] = React.useState<SensorData>({});
  const username = "maaswin";

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5100/ecg_monitoring_data",
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
    { time: Data.pre23time || "No data", ecg: Data.pre23ecg || 0 },
    { time: Data.pre22time || "No data", ecg: Data.pre22ecg || 0 },
    { time: Data.pre21time || "No data", ecg: Data.pre21ecg || 0 },
    { time: Data.pre20time || "No data", ecg: Data.pre20ecg || 0 },
    { time: Data.pre19time || "No data", ecg: Data.pre19ecg || 0 },
    { time: Data.pre18time || "No data", ecg: Data.pre18ecg || 0 },
    { time: Data.pre17time || "No data", ecg: Data.pre17ecg || 0 },
    { time: Data.pre16time || "No data", ecg: Data.pre16ecg || 0 },
    { time: Data.pre15time || "No data", ecg: Data.pre15ecg || 0 },
    { time: Data.pre14time || "No data", ecg: Data.pre14ecg || 0 },
    { time: Data.pre13time || "No data", ecg: Data.pre13ecg || 0 },
    { time: Data.pre12time || "No data", ecg: Data.pre12ecg || 0 },
    { time: Data.pre11time || "No data", ecg: Data.pre11ecg || 0 },
    { time: Data.pre10time || "No data", ecg: Data.pre10ecg || 0 },
    { time: Data.pre9time || "No data", ecg: Data.pre9ecg || 0 },
    { time: Data.pre8time || "No data", ecg: Data.pre8ecg || 0 },
    { time: Data.pre7time || "No data", ecg: Data.pre7ecg || 0 },
    { time: Data.pre6time || "No data", ecg: Data.pre6ecg || 0 },
    { time: Data.pre5time || "No data", ecg: Data.pre5ecg || 0 },
    { time: Data.pre4time || "No data", ecg: Data.pre4ecg || 0 },
    { time: Data.pre3time || "No data", ecg: Data.pre3ecg || 0 },
    { time: Data.pre2time || "No data", ecg: Data.pre2ecg || 0 },
    { time: Data.pre1time || "No data", ecg: Data.pre1ecg || 0 },
    { time: Data.currenttime || "No data", ecg: Data.currentecg || 0 },
  ];

  const filteredData = chartData.filter((item) => {
    const time = new Date(item.time);
    const referenceTime = new Date("2024-01-06T23:00:00");
    let hoursToSubtract = 24;
    if (timeRange === "1") {
      hoursToSubtract = 1;
    } else if (timeRange === "7") {
      hoursToSubtract = 7;
    }
    const startTime = new Date(referenceTime);
    startTime.setHours(startTime.getHours() - hoursToSubtract);
    return time >= startTime;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>
            ECG Monitor - <span>Last {timeRange} hours</span>
          </CardTitle>
          <CardDescription>
            Showing ECG data for the selected time range
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 24 hours" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="24" className="rounded-lg">
              Last 24 hours
            </SelectItem>
            <SelectItem value="7" className="rounded-lg">
              Last 7 hours
            </SelectItem>
            <SelectItem value="1" className="rounded-lg">
              Last 1 hour
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillECG" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-ecg)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-ecg)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="ecg"
              type="natural"
              fill="url(#fillECG)"
              stroke="var(--color-ecg)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
