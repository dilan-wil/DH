"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "./context/auth-context";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  X,
  ChevronDown,
  LogOut,
  PanelsTopLeft,
  Folder,
  UsersRound,
  MessageSquareMore,
  User,
  Search,
  Briefcase,
  Mail,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const pathname = usePathname();
  const { userInfo } = useAuth();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", Icon: PanelsTopLeft },
    { href: "/dashboard/cases", label: "Cases", Icon: Folder },
    { href: "/dashboard/clients", label: "Clients", Icon: UsersRound },
    { href: "/dashboard/chats", label: "Chats", Icon: MessageSquareMore },
    { href: "/dashboard/departments", label: "Departments", Icon: Briefcase },
    { href: "/dashboard/staff", label: "Staff", Icon: User },
    { href: "/dashboard/search", label: "Search", Icon: Search },
  ];

  const renderNavItem = ({
    href,
    label,
    Icon,
  }: {
    href: string;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
  }) => (
    <li key={href}>
      <Link
        href={href}
        onClick={() => setIsOpen(false)}
        className={cn(
          "flex items-center p-3 text-sm rounded-lg transition-all duration-300 group min-h-[48px]",
          pathname === href ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
        )}
      >
        <Icon className="mr-3 h-5 w-5 shrink-0" />
        <span className="font-medium group-hover:translate-x-1 transition-transform">
          {label}
        </span>
      </Link>
    </li>
  );

  const renderDropdown = (
    title: string,
    Icon: React.ComponentType<{ className?: string }>,
    items: { href: string; label: string }[]
  ) => (
    <li key={title}>
      <details className="group">
        <summary className="flex items-center p-4 rounded-lg hover:bg-gray-50 cursor-pointer list-none">
          <Icon className="mr-3 h-5 w-5 text-blue-600" />
          <span className="font-semibold flex-1">{title}</span>
          <ChevronDown className="h-4 w-4 ml-auto transition-transform group-open:rotate-180" />
        </summary>
        <ul className="pl-12 mt-2 space-y-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 hover:translate-x-1 transition-transform hover:text-blue-600"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </li>
  );

  return (
    <>
      {/* ✅ Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-screen bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-lg relative w-64">
        <div className="flex items-center justify-between p-4 bg-white">
          <Image src="/DHLogo.avif" alt="Logo" width={150} height={100} />
        </div>
        <div className="flex-1 overflow-y-auto px-4 mt-6">
          <nav>
            <ul className="space-y-2">
              {navLinks.map(renderNavItem)}
              {renderDropdown("Communication", Mail, [
                { href: "/dashboard/emails", label: "Email" },
                { href: "/dashboard/invoices", label: "Invoice" },
              ])}
              {renderDropdown("Settings", Settings, [
                { href: "/dashboard/profile", label: "Profile" },
                { href: "/dashboard/security", label: "Security" },
                { href: "/dashboard/preferences", label: "Preferences" },
              ])}
            </ul>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200">
          <div className="flex items-center gap-3 group cursor-pointer">
            <Avatar>
              <AvatarImage src={userInfo?.photoURL || undefined} />
              <AvatarFallback className="bg-stone-400">
                {userInfo?.name
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{userInfo?.name || "User"}</p>
              <p className="text-sm text-gray-500">
                {userInfo?.role || "Role"}
              </p>
            </div>
            <LogOut className="ml-auto h-4 w-4 text-gray-400 group-hover:text-blue-600" />
          </div>
        </div>
      </div>

      {/* ✅ Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="h-full bg-gradient-to-b from-white to-gray-50">
            <div className="flex items-center justify-between p-4 bg-white">
              <Image src="/DHLogo.avif" alt="Logo" width={150} height={100} />
            </div>
            <nav className="mt-6 px-4">
              <ul className="space-y-2">
                {navLinks.map(renderNavItem)}
                {renderDropdown("Communication", Mail, [
                  { href: "/dashboard/emails", label: "Email" },
                  { href: "/dashboard/invoices", label: "Invoice" },
                ])}
                {renderDropdown("Settings", Settings, [
                  { href: "/profile", label: "Profile" },
                  { href: "/security", label: "Security" },
                  { href: "/preferences", label: "Preferences" },
                ])}
              </ul>
            </nav>

            <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={userInfo?.photoURL || undefined} />
                  <AvatarFallback className="bg-stone-400">
                    {userInfo?.name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{userInfo?.name || "User"}</p>
                  <p className="text-sm text-gray-500">
                    {userInfo?.role || "Role"}
                  </p>
                </div>
                <LogOut className="ml-auto h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
