"use client";

import { useRouter } from "next/navigation";
import React, { EventHandler, useState } from "react";
import api from "../api";
import useAuth from "../useAuth";

export default function Page() {
  return useAuth({ page: <Signin />, currentUrl: "/signin" });
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
        console.log(res);
        localStorage.setItem("token", res.token);
      })
      .then((res) => {
        router.push("/market");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>เข้าระบบ</h1>
      <form onSubmit={handleSubmit} method="post">
        <label>อีเมล์</label>
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
        <input type="submit" value="เข้าระบบ" />
      </form>
    </div>
  );
}
