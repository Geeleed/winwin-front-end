"use client";

import { useRouter } from "next/navigation";
import React, { EventHandler, useState } from "react";
import api from "../api";
import useAuth from "../useAuth";

export default function Page() {
  return useAuth({ page: <Signup />, currentUrl: "/signup" });
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
    // const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(`Submitted with ${firstname} and ${lastname}`);
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
        console.log(res);
        localStorage.setItem("token", res.token);
      })
      .then((res) => {
        router.push("/market");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <h1>สมัครสมาชิก</h1>
      <form method="post" onSubmit={handleSubmit}>
        <label>ชื่อ</label>
        <input
          type="text"
          name="firstname"
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <br />
        <label>นามสกุล</label>
        <input
          type="text"
          name="lastname"
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <br />
        <label>อีเมล</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>รหัสผ่าน</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <label>ยืนยันรหัสผ่าน</label>
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <br />
        <label>คำถามเมื่อต้องเปลี่ยนหรือลืมรหัสผ่าน</label>
        <input
          type="text"
          name="question"
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <br />
        <label>คำตอบ</label>
        <input
          type="text"
          name="answer"
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <br />
        <label>เบอร์ติดต่อ</label>
        <input
          type="tel"
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <br />
        <input type="submit" value="ยืนยันการสมัคร" />
      </form>
    </div>
  );
}
