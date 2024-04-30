"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import useAuth from "../useAuth";
import api from "../api";

export default function Page() {
  return useAuth({ page: <Wish />, currentUrl: "/market" });
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
    <div>
      <h1>รายการไอเท่มที่อยากได้</h1>
      <section>
        {itemData.length > 0 &&
          itemData.map((item: any) => (
            <CardWish key={item.id} itemData={item} />
          ))}
      </section>
    </div>
  );
}

const CardWish = ({ itemData }: any) => {
  const idt = itemData;
  const src = idt.imageurls
    .slice(1, -1)
    .split(",")
    .map((i: string) => i.slice(1, -1));
  return (
    <div>
      <h1>{idt.title}</h1>
      <div>
        {src.map((i: string) => (
          <Image
            src={i}
            width={300}
            height={300}
            alt={i}
            key={i}
            quality={50}
          />
        ))}
      </div>
      <p>รายละเอียด {idt.description}</p>
      <p>
        น้ำหนัก {idt.weight}
        ความสูง {idt.height}
        ความกว้าง {idt.width}
        ความยาว {idt.length}
      </p>
      <button
        onClick={async () => {
          await fetch(api.wish, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: "Baerer " + localStorage.token,
            },
            body: JSON.stringify({
              itemId: idt.itemid,
            }),
          });
        }}
      >
        ลบออกจากรายการที่อยากได้
      </button>
      <button
        onClick={async () => {
          await fetch(api.exchange, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: "Baerer " + localStorage.token,
            },
            body: JSON.stringify({
              itemId: idt.itemid,
            }),
          });
        }}
      >
        ขอแลก
      </button>
    </div>
  );
};
