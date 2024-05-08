"use client";
import React, { useEffect } from "react";

export default function Dev() {
  useEffect(() => {
    console.log(
      process.env.NODE_ENV,
      process.env.NEXT_PUBLIC_backend_server_ip
    );
  }, []);
  return <div>Dev</div>;
}
