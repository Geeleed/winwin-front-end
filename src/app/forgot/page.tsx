"use client";
import React, { EventHandler, useState } from "react";
import api from "../api";
import useAuth from "../useAuth";

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
  return (
    <div>
      <h1>เปลี่ยนรหัส</h1>
      <form onSubmit={handleSubmit1} method="post">
        <label>อีเมล์</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input type="submit" value="ขอคำถาม" />
      </form>
      {question && (
        <form onSubmit={handleSubmit2} method="post">
          <label>{question}</label>
          <input
            type="text"
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
          <br />
          <label>รหัสใหม่</label>
          <input
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          <br />
          <input type="submit" value="ยืนยันเปลี่ยนรหัส" />
        </form>
      )}
    </div>
  );
}
