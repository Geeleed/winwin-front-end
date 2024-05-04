"use client";

import React, { useEffect, useState } from "react";
import useAuth from "../useAuth";
import api from "../api";
import Navbar from "../component/Navbar";
import Load from "../component/Load";
import CardMe from "../component/CardMe";

export default function Page() {
  return useAuth({ page: <Me />, currentUrl: "/me", loading: <Load /> });
}
function Me() {
  const [user, setUser] = useState<any>();
  const [myItem, setMyItem] = useState<any>([]);
  const [address, setAddress] = useState("");

  const loadUser = async () => {
    await fetch(api.profile, {
      headers: {
        authorization: "Bearer " + localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUser(res.data);
      });
  };
  const loadMyItem = async () => {
    await fetch(api.myItem + "/all", {
      headers: {
        authorization: "Bearer " + localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setMyItem(res.data);
      });
  };
  const loadAddress = async () => {
    await fetch(api.address, {
      headers: { authorization: "Bearer " + localStorage.token },
    })
      .then((res) => res.json())
      .then((res) => {
        setAddress(res.data.address);
      });
  };
  useEffect(() => {
    loadUser();
    loadMyItem();
    loadAddress();
  }, []);
  return (
    <div className=" bg-black">
      <Navbar />
      <div className=" fixed top-0 left-0 w-full h-full bg-[url('/image/cube.png')] bg-fixed bg-no-repeat bg-contain bg-center [filter:blur(20px)]"></div>
      <div className=" flex w-full justify-center h-full">
        <section className=" z-[1]">
          <h1 className=" text-[1.5rem] font-bold p-3">Item ของฉัน</h1>
          <section className=" grid grid-cols-1 sm:grid-cols-3">
            {myItem.length > 0 &&
              myItem.map((item: any) => (
                <CardMe itemData={item} key={item.id} />
              ))}
          </section>
          <br />
          <br />
          <h1 className=" text-[1.5rem] font-bold p-3">
            ที่อยู่สำหรับรับพัสดุ
          </h1>
          <section>
            <textarea
              className=" bg-[#ffffff11] border-b-2 border-white w-full outline-none focus:border-[#edff08] p-3 my-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={4}
            />
            <br />
            <button
              className=" bg-gradient-to-tr from-[#a8fe38] to-[#edff08] animate-gradient text-black font-bold rounded-full py-2 px-5"
              onClick={async () => {
                await fetch(api.address, {
                  method: "PUT",
                  headers: {
                    authorization: "Bearer " + localStorage.token,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ address }),
                })
                  .then((res) => res.json())
                  .then((res) => alert(res.message));
              }}
            >
              บันทึกที่อยู่
            </button>
          </section>
        </section>
      </div>
    </div>
  );
}
