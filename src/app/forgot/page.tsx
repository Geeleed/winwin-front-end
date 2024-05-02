"use client";
import React, { EventHandler, useState } from "react";
import api from "../api";
import useAuth from "../useAuth";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return useAuth({ page: <Forgot />, currentUrl: "/forgot" });
}

function Forgot() {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [question, setQuestion] = useState("");
  const handleSubmit1: EventHandler<React.FormEvent> = async (e) => {
    e.preventDefault();
    await fetch(api.forgot + "/" + email)
      .then((res) => res.json())
      .then((res) => {
        setQuestion(res.data.question);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit2: EventHandler<React.FormEvent> = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("answer", answer);
    formData.append("newPassword", newPassword);
    if (newPassword !== confirmNewPassword) {
      alert("การยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }
    await fetch(api.forgot, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => alert(res.message))
      .catch((err) => console.error(err));
  };
  const inputStyle =
    " p-2 text-[1.2rem] bg-[#ffffff11] border-b-2 border-white outline-none focus:border-[#edff08] focus:text-[#edff08] mb-1";
  const h1Style = " col-span-2 text-[1.3rem] font-semibold mt-8 mb-1";
  return (
    <div className=" absolute w-full h-full bg-black grid grid-cols-1 sm:grid-cols-2 place-content-start sm:place-content-center place-items-center">
      <aside className=" p-5">
        <section className=" grid grid-cols-2">
          <form
            onSubmit={handleSubmit1}
            className="col-span-2 flex flex-col min-w-[20rem]"
          >
            <label>อีเมล์</label>
            <input
              className={inputStyle}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@mail.com"
            />
            <input
              type="submit"
              value="ขอคำถามสำหรับเปลี่ยนรหัสผ่าน"
              className=" text-[1.1rem] hover:underline underline-offset-4 cursor-pointer my-3 text-[#edff08]"
            />
          </form>
        </section>
        <section>
          {question && (
            <form
              onSubmit={handleSubmit2}
              className=" grid grid-cols-2 gap-x-1"
            >
              <h1 className={h1Style}>ตอบคำถามเพื่อเปลี่ยนรหัส</h1>
              <div className=" flex flex-col col-span-2 ">
                <label className=" text-[1.4rem] text-center p-5">
                  {question}
                </label>
                <input
                  className={inputStyle}
                  type="text"
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                  placeholder="กรอกคำตอบของคุณ"
                />
              </div>
              <div className=" flex flex-col">
                <label>รหัสผ่านใหม่</label>
                <input
                  className={inputStyle}
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="********"
                />
              </div>
              <div className=" flex flex-col">
                <label>ยืนยันรหัส</label>
                <input
                  className={inputStyle}
                  type="password"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  placeholder="********"
                />
              </div>
              <input
                type="submit"
                value="ยืนยันเปลี่ยนรหัส"
                className="flex items-center justify-center w-full bg-gradient-to-r from-[#a8fe38] to-[#edff08] animate-gradient text-black p-2 text-[1.2rem] font-semibold rounded-full cursor-pointer hover:-translate-y-1 my-3 col-span-2"
              />
            </form>
          )}
          <div className=" w-full flex flex-col items-center justify-center">
            <Link
              href="/signin"
              className=" hover:underline underline-offset-4"
            >
              เข้าระบบ
            </Link>
            <Link
              href="/signup"
              className=" hover:underline underline-offset-4"
            >
              สมัครสมาชิก
            </Link>
          </div>
        </section>
      </aside>
      <aside className=" hidden sm:flex size-[35rem]">
        <Image src="/image/cube.png" height={600} width={600} alt="" />
      </aside>
    </div>
  );
}
