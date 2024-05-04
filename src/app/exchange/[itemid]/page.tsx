"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useAuth from "@/app/useAuth";
import api from "@/app/api";
import Load from "@/app/component/Load";
import CardExItemId from "@/app/component/CardExItemId";
import Navbar from "@/app/component/Navbar";

export default function Page({ params }: { params: { itemid: string } }) {
  return useAuth({
    page: <Exchange itemid={params.itemid} />,
    currentUrl: "/exchange",
    loading: <Load />,
  });
}

function Exchange({ itemid }: any) {
  const [isExchanged, setIsExchanged] = useState<any>([]);
  const loadItemExchanged = async () => {
    await fetch(api.waitMatch + "/" + itemid, {
      headers: { authorization: "Bearer " + localStorage.token },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsExchanged(res.data);
        console.log(res, itemid);
      });
  };
  useEffect(() => {
    loadItemExchanged();
  }, []);
  return (
    <div className=" bg-black">
      <Navbar />
      <div className=" fixed top-0 left-0 w-full h-full bg-[url('/image/cube.png')] bg-fixed bg-no-repeat bg-contain bg-center [filter:blur(20px)]"></div>
      <div className=" flex w-full justify-center h-full">
        <section className=" z-[1]">
          <h1 className=" text-[1.5rem] font-bold p-3">การแลกเปลี่ยน</h1>
          <section className=" grid grid-cols-1 sm:grid-cols-3">
            <h2 className=" sm:col-span-3 text-[1.2rem] px-5 py-2">
              ไอเท่มคนอื่นที่มาขอแลก
            </h2>
            {isExchanged.length > 0 &&
              isExchanged.map((i: any) => (
                <CardExItemId key={i.id} myItemId={itemid} itemData={i} />
              ))}
          </section>
        </section>
      </div>
    </div>
  );
}
