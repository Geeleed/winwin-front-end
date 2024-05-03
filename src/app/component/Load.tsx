import React from "react";

export default function Load() {
  return (
    <div className=" bg-black text-white flex justify-center items-center absolute w-full h-full">
      <div className=" animate-pulse">{"กำลังโหลดข้อมูล..."}</div>
    </div>
  );
}
