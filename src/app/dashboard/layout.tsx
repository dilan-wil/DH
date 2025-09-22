"use client";
import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import * as React from "react";
import ProtectedRoute from "@/components/context/protected-route";
import { getACollection } from "@/functions/get-a-collection";
import { useAuth } from "@/components/context/auth-context";
import { getADocument } from "@/functions/get-a-document";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    user,
    userInfo,
    setLawyers,
    setClients,
    setUserInfo,
    setCases,
    setEmails,
    setInvoices,
  } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    if (!user) {
      // console.error("User is not authenticated");
      return;
    }

    const unsubscribe = getACollection("clients", setClients);

    // Cleanup listener on component unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user, setClients]);

  React.useEffect(() => {
    if (!user) {
      // console.error("User is not authenticated");
      return;
    }

    const unsubscribe = getADocument(user.uid, "users", setUserInfo);

    // Cleanup listener on component unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user, setUserInfo]);

  React.useEffect(() => {
    if (!user) {
      // console.error("User is not authenticated");
      return;
    }

    const unsubscribe = getACollection("lawyers", setLawyers);

    // Cleanup listener on component unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user, setLawyers]);

  React.useEffect(() => {
    if (!user || !userInfo) {
      // console.error("User is not authenticated");
      return;
    }

    if (userInfo.role === "admin") {
      const unsubscribe = getACollection("cases", setCases);

      // Cleanup listener on component unmount
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [user, userInfo, setCases]);

  React.useEffect(() => {
    if (!user || !userInfo) {
      // console.error("User is not authenticated");
      return;
    }

    if (userInfo.role === "admin") {
      const unsubscribe = getACollection("emails", setEmails);

      // Cleanup listener on component unmount
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [user, userInfo, setCases]);

  React.useEffect(() => {
    if (!user || !userInfo) {
      // console.error("User is not authenticated");
      return;
    }

    if (userInfo.role === "admin") {
      const unsubscribe = getACollection("invoices", setInvoices);

      // Cleanup listener on component unmount
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [user, userInfo, setInvoices]);

  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar setIsSidebarOpen={setIsSidebarOpen} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
