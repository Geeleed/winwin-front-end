"use client";

import { useRouter } from "next/navigation";
import React, { EventHandler, useState } from "react";
import api from "../api";
import useAuth from "../useAuth";
import Image from "next/image";
import Link from "next/link";
import Load from "../component/Load";

export default function Page() {
  return useAuth({
    page: <Signin />,
    currentUrl: "/signin",
    loading: <Load />,
  });
}

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit: EventHandler<React.FormEvent> = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    await fetch(api.signin, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.isOk) {
          localStorage.setItem("token", res.token);
          router.push("/market");
        } else {
          alert(res.message);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className=" absolute w-full h-full bg-black grid grid-cols-1 sm:grid-cols-2 place-content-center place-items-center">
      <Link
        href="/"
        className=" absolute top-0 left-0 hidden sm:inline-block sm:p-5 bg-gradient-to-r from-[#a8fe38] to-[#edff08] text-transparent bg-clip-text font-extrabold text-[2rem] animate-gradient leading-none"
      >
        WINWIN
      </Link>
      <aside className=" size-[17rem] sm:size-[35rem]">
        <Image
          src="/image/cube.png"
          height={600}
          width={600}
          alt=""
          loading="lazy"
        />
      </aside>
      <aside>
        <form onSubmit={handleSubmit} className=" min-w-[24rem] p-8 sm:p-0">
          <div className=" flex flex-col">
            <label className=" text-[1rem] sm:text-[1.2rem]">อีเมล์</label>
            <input
              className=" p-2 text-[1.2rem] bg-[#ffffff11] border-b-2 border-white outline-none focus:border-[#edff08] focus:text-[#edff08]"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@mail.com"
            />
          </div>
          <br />
          <div className=" flex flex-col">
            <label className=" text-[1rem] sm:text-[1.2rem]">รหัสผ่าน</label>
            <input
              className=" p-2 text-[1.2rem] bg-[#ffffff11] border-b-2 border-white outline-none focus:border-[#edff08] focus:text-[#edff08]"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="**********"
            />
          </div>
          <br />
          <input
            type="submit"
            value="เข้าระบบ"
            className="flex items-center justify-center w-full bg-gradient-to-r from-[#a8fe38] to-[#edff08] animate-gradient text-black p-2 text-[1.2rem] font-semibold rounded-full cursor-pointer hover:-translate-y-1"
          />
        </form>
        <div className=" flex flex-col justify-center items-center sm:mt-5 ">
          <Link href="/forgot" className=" hover:underline underline-offset-4">
            ลืมรหัสผ่าน
          </Link>
          <Link href="/signup" className=" hover:underline underline-offset-4">
            สมัครสมาชิก
          </Link>
        </div>
      </aside>
    </div>
  );
}
