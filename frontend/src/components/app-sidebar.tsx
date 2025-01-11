import * as React from "react";
import {
  Globe,
  Home,
  HeartPulse,
  Command,
  LifeBuoy,
  Send,
  PackageSearch,
} from "lucide-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { UserButton, useUser } from "@clerk/clerk-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Services",
      url: "#",
      icon: HeartPulse,
      items: [
        {
          title: "Health Tracking",
          url: "/HealthTracking",
        },
        {
          title: "Personalized Plans",
          url: "/Personalizedplans",
        },
        {
          title: "Wellness Insights",
          url: "/DiseasePrediction",
        },
        {
          title: "DoctorConnect",
          url: "#",
        },
      ],
    },
    {
      title: "Products",
      url: "/biowear",
      icon: PackageSearch,
      items: [
        {
          title: "BioWear (Wearables)",
          url: "/biowear",
        },
        {
          title: "SyncApp (Apps)",
          url: "/SyncApp",
        },
      ],
    },
    {
      title: "Resources",
      url: "/FAQs",
      icon: Globe,
      isActive: true,
      items: [
        {
          title: "FAQs",
          url: "/FAQs",
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isSignedIn , user } = useUser();
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                {" "}
                {/* Use Link from react-router-dom for navigation */}
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">BioSync360</span>
                  <span className="truncate text-xs">Syncing Health</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {isSignedIn ? (
          <div style={{ marginLeft: "2%" , display:'flex' , gap:"5%"}}>
            <UserButton afterSignOutUrl="#" />
            <div>
              <p>{user.fullName}</p>
            </div>

          </div>
        ) : (
          <Link to="/login"><button style={{marginLeft:"2%" , padding:"5px 50px 5px 50px" , backgroundColor:"blue" , borderRadius:'10px', fontSize:"15px" , marginBottom:"5%"}}>Signin</button></Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
