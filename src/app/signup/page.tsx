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
    page: <Signup />,
    currentUrl: "/signup",
    loading: <Load />,
  });
}

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const handleSubmit: EventHandler<React.FormEvent> = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("question", question);
    formData.append("answer", answer);
    formData.append("phone", phone);
    if (password != confirmPassword) {
      alert("รหัสผ่านไม่ตรงกัน กรุณาลองใหม่");
      return;
    }
    await fetch(api.signup, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res.token);
      })
      .then((res) => {
        router.push("/market");
      })
      .catch((err) => console.error(err));
  };
  const inputStyle =
    " p-2 text-[1.2rem] bg-[#ffffff11] border-b-2 border-white outline-none focus:border-[#edff08] focus:text-[#edff08] mb-1 text-[0.85rem] sm:text-[1rem]";
  const h1Style =
    " col-span-2 font-semibold mt-3 sm:mt-8 mb-1 text-[1rem] sm:text-[1.3rem]";
  return (
    <div className=" absolute w-full h-full bg-black grid grid-cols-1 sm:grid-cols-2 place-content-start sm:place-content-center place-items-center p-4 text-[0.8rem] sm:text-[1rem]">
      <Link
        href="/"
        className=" absolute top-0 left-0 hidden sm:inline-block sm:p-5 bg-gradient-to-r from-[#a8fe38] to-[#edff08] text-transparent bg-clip-text font-extrabold text-[2rem] animate-gradient leading-none"
      >
        WINWIN
      </Link>
      <aside className=" hidden sm:flex size-[35rem]">
        <Image
          src="/image/cube.png"
          height={600}
          width={600}
          alt=""
          loading="lazy"
        />
      </aside>
      <aside>
        <form onSubmit={handleSubmit} className=" grid grid-cols-2 gap-x-3">
          <h1 className={h1Style}>ข้อมูลผู้ใช้</h1>
          <div className=" flex flex-col">
            <label>ชื่อ</label>
            <input
              className={inputStyle}
              type="text"
              name="firstname"
              onChange={(e) => setFirstname(e.target.value)}
              required
              placeholder="สุรศักดิ์"
            />
          </div>
          <div className=" flex flex-col">
            <label>นามสกุล</label>
            <input
              className={inputStyle}
              type="text"
              name="lastname"
              onChange={(e) => setLastname(e.target.value)}
              required
              placeholder="แก้วโพธิ์"
            />
          </div>
          <h1 className={h1Style}>อีเมล์สำหรับเข้าระบบ</h1>
          <div className=" flex flex-col">
            <label>อีเมล</label>
            <input
              className={inputStyle}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@mail.com"
            />
          </div>
          <div></div>
          <div className=" flex flex-col">
            <label>รหัสผ่าน</label>
            <input
              className={inputStyle}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="**********"
            />
          </div>
          <div className=" flex flex-col">
            <label>ยืนยันรหัสผ่าน</label>
            <input
              className={inputStyle}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="**********"
            />
          </div>
          <h1 className={h1Style}>ข้อมูลติดต่อผู้ใช้</h1>
          <div className=" flex flex-col">
            <label>เบอร์ติดต่อ</label>
            <input
              className={inputStyle}
              type="tel"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="0921234567"
            />
          </div>
          <div></div>
          <h1 className={h1Style}>การกู้รหัสผ่าน</h1>
          <div className=" flex flex-col col-span-2">
            <label>คำถามเมื่อต้องเปลี่ยนหรือลืมรหัสผ่าน</label>
            <input
              className={inputStyle}
              type="text"
              name="question"
              onChange={(e) => setQuestion(e.target.value)}
              required
              placeholder="สีที่ชอบอันดับ 2 คือสีอะไร?"
            />
          </div>
          <div className=" flex flex-col col-span-2">
            <label>คำตอบ</label>
            <input
              className={inputStyle}
              type="text"
              name="answer"
              onChange={(e) => setAnswer(e.target.value)}
              required
              placeholder="สีน้ำเงิน"
            />
          </div>
          <input
            type="submit"
            value="ยืนยันการสมัคร"
            className="flex items-center justify-center w-full bg-gradient-to-r from-[#a8fe38] to-[#edff08] animate-gradient text-black p-2 text-[1.2rem] font-semibold rounded-full cursor-pointer hover:-translate-y-1 my-3 col-span-2"
          />
        </form>
        <div className=" w-full flex items-center justify-center text-[1rem]">
          <Link href="/signin" className=" hover:underline underline-offset-4">
            เข้าระบบ
          </Link>
        </div>
      </aside>
    </div>
  );
}
