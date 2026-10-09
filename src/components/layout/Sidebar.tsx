"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Utensils,
  CalendarDays,
  Package,
  MessageSquare,
  Trash2,
  BarChart3,
  Heart,
  Truck,
  Bell,
  Settings,
  Leaf,
  ArrowRight
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Meal Management", href: "/meals", icon: Utensils },
  { name: "Student Bookings", href: "/bookings", icon: CalendarDays },
  { name: "Inventory & Stock", href: "/inventory", icon: Package },
  { name: "AI Assistant", href: "/ai-assistant", icon: MessageSquare },
  { name: "Waste Tracking", href: "/waste-tracking", icon: Trash2 },
  { name: "Reports & Analytics", href: "/reports", icon: BarChart3 },
  { name: "Food Donation", href: "/donations", icon: Heart },
  { name: "Suppliers", href: "/suppliers", icon: Truck },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
      <div className="p-6 flex items-center gap-2">
        <Leaf className="h-8 w-8 text-green-600" />
        <div className="overflow-hidden">
          <h1 className="font-bold text-xl leading-tight truncate">WasteWise AI</h1>
          <p className="text-[10px] text-gray-500 font-medium whitespace-nowrap truncate">Smart Food, Better Tomorrow</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-green-50 text-green-700" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-green-600" : "text-gray-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-4 relative overflow-hidden">
          <h3 className="text-green-800 font-bold text-base mb-1 leading-tight">
            Good Food<br/>Less Waste<br/>Greener Planet
          </h3>
          <div className="mt-4 bg-white rounded-full p-2 w-8 h-8 flex items-center justify-center shadow-sm text-green-600">
            <ArrowRight className="h-4 w-4" />
          </div>
          <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
             <Leaf className="w-24 h-24 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
