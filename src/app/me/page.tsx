"use client";

import React, { useEffect, useState } from "react";
import useAuth from "../useAuth";
import api from "../api";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return useAuth({ page: <Me />, currentUrl: "/me" });
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
    <div>
      <h1>{user && `${user.firstname} ${user.lastname} ${user.email}`}</h1>
      <h2>Item ของฉัน</h2>
      <section>
        {myItem.length > 0 &&
          myItem.map((item: any) => <CardMe props={item} key={item.id} />)}
      </section>
      <br />
      <h2>ที่อยู่สำหรับรับพัสดุ</h2>
      <section>
        {/* <p>{address && address}</p> */}
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={4}
        />
        <br />
        <button
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
const CardMe = ({ props }: { props: ItemData }) => {
  const [address, setAddress] = useState("");
  const idt = props;
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
      <p>
        {idt.status === "posting" && "กำลังโพสต์"}
        {idt.status === "hidden" && "ซ่อนจากระบบ"}
        {idt.status === "matched" && "แมตช์แล้ว กรุณานำส่งพัสดุของท่าน"}
        {idt.status === "instock" && "อยู่ในสต็อก"}
      </p>
      <div>
        {src.map((i: string) => (
          <Image
            src={i}
            width={250}
            height={250}
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
          <Link href={`/me/${idt.itemid}`}>ดูข้อมูลไอเท่มคู่แมตช์</Link>
        </div>
      )}
      <br />
      {(idt.status === "instock" || idt.status === "hidden") && (
        <button
          onClick={async () => {
            await fetch(api.posting, {
              method: "PUT",
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
          โพสต์
        </button>
      )}
      {idt.status === "posting" && (
        <button
          onClick={async () => {
            await fetch(api.instock, {
              method: "PUT",
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
          ยกเลิกการโพสต์
        </button>
      )}
      {idt.status === "matched" && (
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
      )}
      <button
        onClick={async () => {
          await fetch(api.myItem, {
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
        ลบไอเท่ม
      </button>
      {idt.status !== "matched" && (
        <Link href={`/me/editItemData/${idt.itemid}`}>แก้ไข</Link>
      )}
    </div>
  );
};
