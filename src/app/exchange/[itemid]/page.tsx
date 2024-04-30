"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useAuth from "@/app/useAuth";
import api from "@/app/api";
import Link from "next/link";

export default function Page({ params }: { params: { itemid: string } }) {
  return useAuth({
    page: <Exchange itemid={params.itemid} />,
    currentUrl: "/exchange",
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
    <div>
      <h1>การแลกเปลี่ยน</h1>
      <section>
        <h2>ไอเท่มคนอื่นที่มาขอแลก</h2>
        <div>
          {isExchanged.length > 0 &&
            isExchanged.map((i: any) => (
              <Card key={i.id} myItemId={itemid} itemData={i} />
            ))}
        </div>
      </section>
      <Link href="/exchange">กลับ</Link>
    </div>
  );
}

const Card = ({ itemData, myItemId }: any) => {
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
          await fetch(api.match, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: "Baerer " + localStorage.token,
            },
            body: JSON.stringify({
              myItemId,
              selectItemId: idt.itemid,
            }),
          });
        }}
      >
        ยืนยันแลกเปลี่ยนไอเท่มนี้
      </button>
    </div>
  );
};
