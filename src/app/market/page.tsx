"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import api from "../api";
import useAuth from "../useAuth";
import Image from "next/image";

export default function Page() {
  return useAuth({ page: <Market />, currentUrl: "/market" });
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
    <div>
      <h1>Market</h1>
      <section>
        {itemData.length > 0 &&
          itemData.map((item: any) => (
            <CardMarket key={item.id} itemData={item} />
          ))}
      </section>
    </div>
  );
}

interface ItemData {
  id: String;
  itemid: String;
  ownerid: String;
  title: String;
  description: String;
  imageurls: String;
  weight: String;
  height: String;
  width: String;
  length: String;
  postat: String;
  expireat: String;
  sending: String;
  status: String;
  extend: String;
  createdat: String;
}
const CardMarket = ({ itemData }: { itemData: ItemData }) => {
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
        บันทึก
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
