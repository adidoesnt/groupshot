"use client";

import { useState } from "react";
import { CloseIcon, HamburgerIcon } from "../icons";
import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";

type SidebarButtonProps = {
  toggleSidebar: () => void;
};

const CloseButton = ({ toggleSidebar }: SidebarButtonProps) => {
  return (
    <Button
      icon={<CloseIcon className="w-4 h-4" />}
      onClick={toggleSidebar}
      className="hover:bg-gray-200 rounded-sm transition-all duration-300 p-2 md:opacity-30 hover:opacity-100"
    />
  );
};

export const OpenButton = ({ toggleSidebar }: SidebarButtonProps) => {
  return (
    <Button
      icon={<HamburgerIcon className="w-4 h-4" />}
      onClick={toggleSidebar}
      className="hover:bg-gray-200 rounded-sm transition-all duration-300 p-2 fixed top-4 left-4 md:opacity-30 hover:opacity-100"
    />
  );
};

type SidebarProps = {
  title: string;
  children: React.ReactNode;
};

export default function Sidebar({ children, title }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <OpenButton toggleSidebar={toggleSidebar} />
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              id="sidebar-overlay"
              className="fixed inset-0 bg-black/50 z-40"
              onClick={toggleSidebar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, exit: { duration: 0.2 } }}
            />
            <motion.div
              id="sidebar-container"
              className="flex justify-start fixed top-0 left-0 w-[100dvw] h-[100dvh] z-50"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                exit: { duration: 0.2 },
              }}
            >
              <div
                id="sidebar"
                className="flex flex-col justify-start items-center gap-4 md:min-w-1/4 w-full md:w-fit h-full bg-background text-foreground"
              >
                <div className="flex w-full justify-between items-center p-4 border-b-2">
                  <h1 className="text-2xl font-bold font-mono">{title}</h1>
                  <CloseButton toggleSidebar={toggleSidebar} />
                </div>
                <div className="flex-1 w-full p-4 overflow-y-auto">
                  {children}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
