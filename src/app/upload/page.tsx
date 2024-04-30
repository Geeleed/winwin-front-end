"use client";
import React, { useState } from "react";
import useAuth from "../useAuth";
import api from "../api";

export default function Page() {
  return useAuth({ page: <Upload />, currentUrl: "/upload" });
}

function Upload() {
  const [files, setFiles] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [sending, setSending] = useState("direct");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    files &&
      Array.from(files).map((item: any) => formData.append("files", item));
    formData.append("title", title);
    formData.append("description", description);
    formData.append("weight", weight);
    formData.append("height", height);
    formData.append("width", width);
    formData.append("length", length);
    formData.append("sending", sending);
    await fetch(api.myItem, {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.token,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  return (
    <div>
      <h1>อัปโหลด item</h1>
      <form onSubmit={handleSubmit}>
        <label>เลือกรูปภาพ ไม่เกิน 3 ภาพ</label>
        <input
          type="file"
          onChange={(e) => {
            setFiles(e.target.files);
            console.log(e.target.files);
          }}
          multiple
          required
          accept="image/*"
        />
        <br />
        <label>ชื่อ item</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label>รายละเอียดของ item</label>
        <br />
        <textarea
          rows={4}
          cols={50}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <label htmlFor="weight">น้ำหนัก (kg) </label>
        <input
          type="number"
          min="0"
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <br />
        {"ขนาด item :"}
        <br />
        <label>{"ความกว้าง (cm)"} </label>
        <input
          type="number"
          min="0"
          onChange={(e) => setWidth(e.target.value)}
          required
        />
        <label>{"ความสูง (cm)"} </label>
        <input
          type="number"
          min="0"
          onChange={(e) => setHeight(e.target.value)}
          required
        />
        <label>{"ความยาว (cm)"} </label>
        <input
          type="number"
          min="0"
          onChange={(e) => setLength(e.target.value)}
          required
        />
        <br />
        <label>วิธีการจัดส่ง</label>
        <select onChange={(e) => setSending(e.target.value)} required>
          <option value="direct">ส่งให้คู่แมตช์โดยตรง</option>
          <option value="platform">ส่งผ่าน platform</option>
        </select>
        <input type="submit" value="ยืนยันอัปโหลด" />
      </form>
    </div>
  );
}
