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
  );
}
