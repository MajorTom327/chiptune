import React from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col h-full min-h-screen">
        <Navbar />
        <div
          className="flex flex-col justify-between h-full"
          style={{ minHeight: "calc(100vh - 4.5rem)" }}
        >
          <div className="flex-1">
            <div className="flex gap-2">
              <Sidebar />
              <div className="w-full mx-4 py-2">{children}</div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

Layout.defaultProps = {};

export default Layout;
