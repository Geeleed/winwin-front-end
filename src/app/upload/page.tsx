"use client";
import React, { useState } from "react";
import useAuth from "../useAuth";
import api from "../api";
import Navbar from "../component/Navbar";
import Load from "../component/Load";
import { useRouter } from "next/navigation";

export default function Page() {
  return useAuth({
    page: <Upload />,
    currentUrl: "/upload",
    loading: <Load />,
  });
}

function Upload() {
  const router = useRouter();
  const [uploading, setUploading] = useState("ยืนยันอัปโหลด");
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
      .then((res) => {
        if (res.isOk) {
          router.push("/me");
        }
      });
  };
  const inputStyle =
    " p-2 text-[1.2rem] bg-[#ffffff11] border-b-2 border-white outline-none focus:border-[#edff08] focus:text-[#edff08] mb-1 text-[0.85rem] sm:text-[1rem] w-full";

  return (
    <div className=" bg-black">
      <Navbar />
      <div className=" fixed top-0 left-0 w-full h-full bg-[url('/image/cube.png')] bg-fixed bg-no-repeat bg-contain bg-center [filter:blur(20px)]"></div>
      <div className=" flex justify-center">
        <div className=" sm:w-[40rem] px-4 bg-[#ffffff08] mt-5 p-5 rounded-[2rem] z-[1]">
          <h1 className=" text-[1.5rem] font-bold">อัปโหลด item</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div className=" flex flex-col">
              <label>{"เลือกรูปภาพ 1:1 ไม่เกิน 3 ภาพ"}</label>
              <input
                type="file"
                onChange={(e) => {
                  setFiles(e.target.files);
                }}
                multiple
                required
                accept="image/*"
              />
            </div>
            <br />
            <div className=" grid grid-cols-[1fr_2fr] place-items-center">
              <label>ชื่อ item</label>
              <input
                className={inputStyle}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <br />
            <label>รายละเอียดของ item</label>
            <br />
            <textarea
              className={inputStyle + " w-full"}
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <br />
            <div className=" grid grid-cols-[1fr_2fr] gap-3 place-items-center ">
              <label>น้ำหนัก (kg) </label>
              <input
                className={inputStyle}
                type="number"
                min="0"
                step={0.01}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
              <label>{"ความกว้าง (cm)"} </label>
              <input
                className={inputStyle}
                type="number"
                min="0"
                step={0.01}
                onChange={(e) => setWidth(e.target.value)}
                required
              />
              <label>{"ความสูง (cm)"} </label>
              <input
                className={inputStyle}
                type="number"
                min="0"
                step={0.01}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
              <label>{"ความยาว (cm)"} </label>
              <input
                className={inputStyle}
                type="number"
                min="0"
                step={0.01}
                onChange={(e) => setLength(e.target.value)}
                required
              />
            </div>

            {/* <br />
            <div className=" grid grid-cols-[1fr_2fr] gap-3 place-items-center ">
              <label>วิธีจัดส่ง</label>
              <select
                className={inputStyle}
                onChange={(e) => setSending(e.target.value)}
                required
              >
                <option className=" text-black" value="direct">
                  ส่งให้คู่แมตช์โดยตรง
                </option>
                <option className=" text-black" value="platform">
                  ส่งผ่าน platform
                </option>
              </select>
            </div> */}
            <input
              className={
                "flex items-center justify-center w-full bg-gradient-to-r from-[#a8fe38] to-[#edff08] animate-gradient text-black p-2 text-[1.2rem] font-semibold rounded-full cursor-pointer hover:-translate-y-1 my-3 col-span-2" +
                (uploading === "กำลังอัปโหลด..." && "animate-pulse")
              }
              type="submit"
              value={uploading}
              onClick={() => {
                setUploading("กำลังอัปโหลด...");
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
