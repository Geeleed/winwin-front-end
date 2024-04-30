"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useAuth from "@/app/useAuth";
import api from "@/app/api";
import Link from "next/link";

export default function Page({ params }: { params: { myItemId: string } }) {
  return useAuth({
    page: <MyItemId myItemId={params.myItemId} />,
    currentUrl: `/me/${params.myItemId}`,
  });
}

function MyItemId({ myItemId }: { myItemId: string }) {
  const [myItem, setMyItem] = useState<any>();
  const [matchItem, setMatchItem] = useState<any>();
  const loadMatchItem = async () => {
    await fetch(api.match + "/" + myItemId, {
      headers: { authorization: "Bearer " + localStorage.token },
    })
      .then((res) => res.json())
      .then((res) => {
        setMyItem(res.myItem);
        setMatchItem(res.matchItem);
      });
  };
  useEffect(() => {
    loadMatchItem();
  }, []);

  return (
    <div>
      <h1>แมตช์แล้ว</h1>
      <div>
        <h2>ไอเท่มของเรา</h2>
        {myItem && <CardMyItem itemData={myItem} />}
      </div>
      <div>
        <h2>ไอเท่มของคู่แมตช์</h2>
        {matchItem && <CardMatchItem itemData={matchItem} />}
      </div>
    </div>
  );
}

const CardMyItem = ({ itemData }: any) => {
  const [address, setAddress] = useState("");

  const idt = itemData;
  const src = idt.imageurls
    .slice(1, -1)
    .split(",")
    .map((i: string) => i.slice(1, -1));
  const loadAddress = async () => {
    await fetch(api.matchedAddress + "/" + idt.itemid, {
      headers: { authorization: "Bearer " + localStorage.token },
    })
      .then((res) => res.json())
      .then((res) => setAddress(res.data.address));
  };
  useEffect(() => {
    idt.status === "matched" && loadAddress();
  }, []);
  return (
    <div>
      <h1>{idt.title}</h1>
      <p>{idt.itemid}</p>
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
      {idt.status === "matched" && (
        <div>
          <p>ที่อยู่สำหรับส่งพัสดุ</p>
          <address>{address}</address>
          {/* <label>เลขพัสดุ</label>
          <input type="text" />
          <button>ส่งเลขพัสดุให้คู่แมตช์รู้</button> */}
          <Link href="/me">กลับ</Link>
        </div>
      )}
      <button
        onClick={async () => {
          await fetch(api.match + "/" + idt.itemid, {
            method: "DELETE",
            headers: {
              authorization: "Bearer " + localStorage.token,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((res) => alert(res.message));
        }}
      >
        ยกเลิกการแมตช์
      </button>
    </div>
  );
};
const CardMatchItem = ({ itemData }: any) => {
  const idt = itemData;
  const src = idt.imageurls
    .slice(1, -1)
    .split(",")
    .map((i: string) => i.slice(1, -1));

  return (
    <div>
      <h1>{idt.title}</h1>
      <p>{idt.itemid}</p>
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
    </div>
  );
};
