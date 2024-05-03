import { useRouter } from "next/navigation";
import React from "react";

export default function Signout() {
  const router = useRouter();
  return (
    <svg
      onClick={() => {
        localStorage.removeItem("token");
        router.push("/");
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      className="bi bi-power cursor-pointer hover:fill-[#edff08]"
      viewBox="0 0 16 16"
    >
      <path d="M7.5 1v7h1V1z" />
      <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
    </svg>
    // <svg
    //   onClick={() => {
    //     localStorage.removeItem("token");
    //     router.push("/");
    //   }}
    //   xmlns="http://www.w3.org/2000/svg"
    //   width="32"
    //   height="32"
    //   fill="currentColor"
    //   className="bi bi-box-arrow-right cursor-pointer hover:fill-[#edff08]"
    //   viewBox="0 0 16 16"
    // >
    //   <path
    //     fill-rule="evenodd"
    //     d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
    //   />
    //   <path
    //     fill-rule="evenodd"
    //     d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
    //   />
    // </svg>
  );
}
