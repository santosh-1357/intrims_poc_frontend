"use client";
import React, { useEffect, useState, createContext } from "react";
import Footer from "@/components/Footer";
import Sidebar from "@/components/SidebarPanel";
import { CurrentUser } from "@/common/types";

const currentUser = {
  name: "GRASIM INDUSTRIES LTD",
};

export const UserContext = createContext<any>(currentUser);

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [contextValue, setContextValue] = useState<CurrentUser>(currentUser);

  const handleSidebar = () => setIsSidebarOpen((pre) => !pre);

  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200
        ? setIsSidebarOpen(false)
        : setIsSidebarOpen(true)
    );
  }, []);

  return (
    <UserContext.Provider
      value={{
        contextValue,
        setContextValue,
      }}
    >
      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} onClose={handleSidebar} />
        <div className="h-full w-full max-w-[1728px] mx-auto bg-lightPrimary">
          <main
            className={`mx-1 h-full duration-175 linear flex-none transition-all
           ${isSidebarOpen ? "xl:ml-[262px]" : "xl:ml-[75px]"}`}
          >
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              {children}
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </main>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default MainLayout;
