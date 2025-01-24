import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "@/admin/components/Sidebar";
import { Toast } from "@radix-ui/react-toast";
import { Toaster } from "./ui/toaster";
import { UserProvider } from "@/context/UserContext";

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoginRoute = location.pathname === "/admin";

  if (isLoginRoute) {
    return <div className="h-screen w-full">{children}</div>;
  }

  return (
    <div className="w-full">
      {isAdminRoute ? (
        <UserProvider>
          <Sidebar />
        </UserProvider>
      ) : (
        <Navbar />
      )}
      <div className={`${isAdminRoute ? "lg:ml-64" : "w-full"}`}>
        <main>{children}</main>
      </div>
      {isAdminRoute ? "" : <Footer />}
      <Toaster />
    </div>
  );
};

export default Layout;
