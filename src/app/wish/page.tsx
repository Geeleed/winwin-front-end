"use client";

import Image from "next/image";
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

// const CardWish = ({ itemData }: any) => {
//   const idt = itemData;
//   const src = idt.imageurls
//     .slice(1, -1)
//     .split(",")
//     .map((i: string) => i.slice(1, -1));
//   return (
//     <div>
//       <h1>{idt.title}</h1>
//       <div>
//         {src.map((i: string) => (
//           <Image
//             src={i}
//             width={300}
//             height={300}
//             alt={i}
//             key={i}
//             quality={50}
//           />
//         ))}
//       </div>
//       <p>รายละเอียด {idt.description}</p>
//       <p>
//         น้ำหนัก {idt.weight}
//         ความสูง {idt.height}
//         ความกว้าง {idt.width}
//         ความยาว {idt.length}
//       </p>
//       <button
//         onClick={async () => {
//           await fetch(api.wish, {
//             method: "DELETE",
//             headers: {
//               "Content-Type": "application/json",
//               authorization: "Baerer " + localStorage.token,
//             },
//             body: JSON.stringify({
//               itemId: idt.itemid,
//             }),
//           });
//         }}
//       >
//         ลบออกจากรายการที่อยากได้
//       </button>
//       <button
//         onClick={async () => {
//           await fetch(api.exchange, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               authorization: "Baerer " + localStorage.token,
//             },
//             body: JSON.stringify({
//               itemId: idt.itemid,
//             }),
//           });
//         }}
//       >
//         ขอแลก
//       </button>
//     </div>
//   );
// };
