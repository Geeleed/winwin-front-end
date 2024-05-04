"use client";
import React, { useEffect, useState } from "react";
import useAuth from "../useAuth";
import api from "../api";
import Navbar from "../component/Navbar";
import Load from "../component/Load";
import CardWish from "../component/CardWish";

export default function Page() {
  return useAuth({ page: <Wish />, currentUrl: "/market", loading: <Load /> });
}
function Wish() {
  const [itemData, setItemData] = useState<any>([]);
  const loadItemData = async () =>
    await fetch(api.wish, {
      headers: {
        authorization: "Bearer " + localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setItemData(res.data);
      });
  useEffect(() => {
    loadItemData();
  }, []);
  return (
    <div className=" bg-black">
      <Navbar />
      <div className=" fixed top-0 left-0 w-full h-full bg-[url('/image/cube.png')] bg-fixed bg-no-repeat bg-contain bg-center [filter:blur(20px)]"></div>
      <div className=" flex w-full justify-center h-full">
        <div className=" z-[1]">
          <h1 className=" text-[1.5rem] font-bold p-3">
            รายการไอเท่มที่อยากได้
          </h1>
          <section className=" grid grid-cols-1 sm:grid-cols-3">
            {itemData.length > 0 &&
              itemData.map((item: any) => (
                <CardWish key={item.id} itemData={item} />
              ))}
          </section>
        </div>
      </div>
    </div>
  );
}
