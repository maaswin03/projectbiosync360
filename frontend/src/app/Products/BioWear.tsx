import { AppSidebar } from "@/components/app-sidebar";
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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@clerk/clerk-react";

interface RazorpayOptions {
  key: string;
  key_secret: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
}

export default function Biowear() {
  const { user } = useUser();
  const handleSubmit = (amount: number) => {
    if (amount === 0) {
      alert("Please enter an amount");
    } else {
      const options: RazorpayOptions = {
        key: "rzp_test_sz6vXhYYcZATwz",
        key_secret: "Z4OjloVh5GUOpbya26cCKMt7",
        amount: amount * 100,
        currency: "INR",
        name: "BioSync360",
        description: "for testing purpose",
        prefill: {
          name: user?.fullName || "Unknown",
          email: user?.primaryEmailAddressId || "Unknown",
          contact: user?.primaryPhoneNumberId || "Unknown",
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const pay = new (window as any).Razorpay(options);
      pay.open();
    }
  };

  const handleAmount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(1599);
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
                  <BreadcrumbLink href="/FAQs">Products</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Biowear</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-2 p-4 pt-0">
          <h1 className="text-lg font-bold mt-2 mb-0">
            Meet bioWear: The Smart Hand Glove for Comprehensive Health
            Monitoring
          </h1>
          <p className="text-base font-thin mt-0 mb-0">
            Track your heart health, temperature, and more with cutting-edge
            sensor technology—designed for comfort and precision.
          </p>

          <div className="grid gap-1 md:grid-cols-2 mt-5">
            <Card>
              <CardHeader>
                <CardTitle>BioWear</CardTitle>
                <CardDescription>Current Readings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="">
                  <img
                    src="https://m.media-amazon.com/images/I/51Huf4Z7W0L._AC_UF894,1000_QL80_.jpg"
                    alt="bio wear"
                    style={{ width: "70%", height: "50%" }}
                  />
                </div>
                <div className="mt-10">
                  <h1 className="text-base font-bold mt-2 mb-0">
                    1. MAX30100 - Pulse and Heart Rate Sensor
                  </h1>
                  <div className="ml-4">
                    <li>Monitors your pulse and heart rate in real time.</li>
                    <li>
                      Ensures accurate results for everyday health tracking.
                    </li>
                  </div>
                </div>

                <div>
                  <h1 className="text-base font-bold mt-2 mb-0">
                    2. DS18B20 - Temperature Sensor
                  </h1>
                  <div className="ml-4">
                    <li>Provides precise body temperature readings.</li>
                    <li>
                      Essential for detecting early signs of fever or illness.
                    </li>
                  </div>
                </div>

                <div>
                  <h1 className="text-base font-bold mt-2 mb-0">
                    3. AD8232 - ECG Sensor
                  </h1>
                  <div className="ml-4">
                    <li>Captures detailed electrocardiogram (ECG) signals.</li>
                    <li>
                      Helps monitor heart rhythm and detect potential
                      irregularities.
                    </li>
                  </div>
                </div>

                <div>
                  <h1 className="text-base font-bold mt-2 mb-0">
                    4. SEN-11574 - Blood Pressure and Heart Rate Sensor
                  </h1>
                  <div className="ml-4">
                    <li>
                      Combines heart rate and blood pressure monitoring in one
                      device.
                    </li>
                    <li>A key component for tracking cardiovascular health.</li>
                  </div>
                </div>

                <div>
                  <h1 className="text-2xl font-bold mt-5 mb-0">
                    Price - ₹ 1,599 /-
                  </h1>
                  <div className="ml-4"></div>
                </div>
              </CardContent>
              <CardFooter>
                <CardDescription>
                  <button onClick={handleAmount}
                    style={{
                      padding: "7px 20px 7px 20px",
                      backgroundColor: "blue",
                      color: "white",
                      borderRadius: "10px",
                    }}
                  >
                    Buy Now
                  </button>
                </CardDescription>
              </CardFooter>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
