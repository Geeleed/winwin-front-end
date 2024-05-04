"use client";

import React, { useEffect, useState } from "react";
import api from "../api";
import useAuth from "../useAuth";
import Navbar from "../component/Navbar";
import Load from "../component/Load";
import CardMarket from "../component/CardMarket";

export default function Page() {
  return useAuth({
    page: <Market />,
    currentUrl: "/market",
    loading: <Load />,
  });
}
function Market() {
  const [itemData, setItemData] = useState<any>([]);
  const loadItemData = async () =>
    await fetch(api.market, {
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
        <section className=" grid grid-cols-1 sm:grid-cols-3 w-full sm:w-fit">
          {itemData.length > 0 &&
            itemData.map((item: any) => (
              <div className=" place-self-center">
                <CardMarket key={item.id} itemData={item} />
              </div>
            ))}
        </section>
      </div>
    </div>
  );
}
