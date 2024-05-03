"use client";
import React, { useEffect, useState } from "react";
import useAuth from "../useAuth";
import api from "../api";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../component/Navbar";
import Load from "../component/Load";

export default function Page() {
  return useAuth({
    page: <Exchange />,
    currentUrl: "/exchange",
    loading: <Load />,
  });
}

function Exchange() {
  const [isExchanged, setIsExchanged] = useState<any>([]);
  const [wishExchange, setWishExchange] = useState<any>([]);
  const loadMyItemIsExchanged = async () => {
    await fetch(api.exchange, {
      headers: { authorization: "Bearer " + localStorage.token },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsExchanged(res.data);
      });
  };
  const loadWishItemExchange = async () => {
    await fetch(api.wishExchange, {
      headers: { authorization: "Bearer " + localStorage.token },
    })
      .then((res) => res.json())
      .then((res) => {
        setWishExchange(res.data);
      });
  };
  useEffect(() => {
    loadMyItemIsExchanged();
    loadWishItemExchange();
  }, []);
  return (
    <div className=" bg-black">
      <Navbar />
      <h1>การแลกเปลี่ยน</h1>
      <section>
        <h2>คนอื่นมาขอแลก</h2>
        <div>
          {isExchanged.length > 0 &&
            isExchanged.map((i: any) => <CardEx key={i.id} itemData={i} />)}
        </div>
      </section>
      <section>
        <h2>เราไปขอแลก</h2>
        <div>
          {wishExchange.length > 0 &&
            wishExchange.map((i: any) => (
              <CardWishEx key={i.id} itemData={i} />
            ))}
        </div>
      </section>
    </div>
  );
}

const CardEx = ({ itemData }: any) => {
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
      <Link href={`/exchange/${idt.itemid}`}>ดูไอเท่มที่มาขอแลก</Link>
    </div>
  );
};

const CardWishEx = ({ itemData }: any) => {
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
      <button
        onClick={async () => {
          await fetch(api.exchange, {
            method: "DELETE",
            headers: {
              authorization: "Bearer " + localStorage.token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ itemId: idt.itemid }),
          })
            .then((res) => res.json())
            .then((res) => alert(res.message));
        }}
      >
        ยกเลิกการขอแลกเปลี่ยน
      </button>
    </div>
  );
};
