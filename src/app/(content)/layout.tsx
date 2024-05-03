"use client";
import Navbar from "../component/Navbar";

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* <Navbar /> */}
      {children}
    </div>
  );
}
