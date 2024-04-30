"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useAuth from "@/app/useAuth";
import api from "@/app/api";
import Link from "next/link";

export default function Page({ params }: { params: { myItemId: string } }) {
  return useAuth({
    page: <EditItemData myItemId={params.myItemId} />,
    currentUrl: `/me/editItemData/${params.myItemId}`,
  });
}

function EditItemData({ myItemId }: { myItemId: string }) {
  // const [files, setFiles] = useState<any>(null);
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
    // files &&
    //   Array.from(files).map((item: any) => formData.append("files", item));
    formData.append("title", title);
    formData.append("description", description);
    formData.append("weight", weight);
    formData.append("height", height);
    formData.append("width", width);
    formData.append("length", length);
    formData.append("sending", sending);
    formData.append("itemId", myItemId);
    await fetch(api.myItem, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + localStorage.token,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
      });
  };
  const loadItem = async () => {
    await fetch(api.myItem + "/" + myItemId, {
      headers: {
        authorization: "Bearer " + localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((res) => res.data[0])
      .then((res) => {
        setTitle(res.title);
        setDescription(res.description);
        setWeight(res.weight);
        setHeight(res.height);
        setWidth(res.width);
        setLength(res.length);
        setSending(res.sending);
      });
  };
  useEffect(() => {
    loadItem();
  }, []);
  return (
    <div>
      <h1>แก้ไขข้อมูล item</h1>
      <form onSubmit={handleSubmit}>
        {/* <label>เลือกรูปภาพ ไม่เกิน 3 ภาพ</label>
        <input
          value={files}
          type="file"
          onChange={(e) => {
            setFiles(e.target.files);
            console.log(e.target.files);
          }}
          multiple
          required
          accept="image/*"
        />
        <br /> */}
        <label>ชื่อ item</label>
        <input
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label>รายละเอียดของ item</label>
        <br />
        <textarea
          value={description}
          rows={4}
          cols={50}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <label htmlFor="weight">น้ำหนัก (kg) </label>
        <input
          value={weight}
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
          value={width}
          type="number"
          min="0"
          onChange={(e) => setWidth(e.target.value)}
          required
        />
        <label>{"ความสูง (cm)"} </label>
        <input
          value={height}
          type="number"
          min="0"
          onChange={(e) => setHeight(e.target.value)}
          required
        />
        <label>{"ความยาว (cm)"} </label>
        <input
          value={length}
          type="number"
          min="0"
          onChange={(e) => setLength(e.target.value)}
          required
        />
        <br />
        <label>วิธีการจัดส่ง</label>
        <select
          value={sending}
          onChange={(e) => setSending(e.target.value)}
          required
        >
          <option value="direct">ส่งให้คู่แมตช์โดยตรง</option>
          <option value="platform">ส่งผ่าน platform</option>
        </select>
        <input type="submit" value="ยืนยันแก้ไข" />
      </form>
      <Link href="/me">กลับ</Link>
    </div>
  );
}
