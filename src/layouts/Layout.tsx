import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Layout.css";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
