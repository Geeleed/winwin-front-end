"use client";
import React, { useEffect, useState } from "react";
import useAuth from "../useAuth";
import api from "../api";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../component/Navbar";
import Load from "../component/Load";
import CardExToMe from "../component/CardExToMe";
import CardMeEx from "../component/CardMeEx";

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
      <div className=" fixed top-0 left-0 w-full h-full bg-[url('/image/cube.png')] bg-fixed bg-no-repeat bg-contain bg-center [filter:blur(20px)]"></div>
      <div className=" flex w-full justify-center h-full">
        <section className=" z-[1]">
          <h1 className=" text-[1.5rem] font-bold p-3">การแลกเปลี่ยน</h1>
          <section className=" grid grid-cols-1 sm:grid-cols-3">
            <h2 className=" sm:col-span-3 text-[1.2rem] px-5 py-2">
              คนอื่นมาขอแลก
            </h2>
            {isExchanged.length > 0 &&
              isExchanged.map((i: any) => (
                <CardExToMe key={i.id} itemData={i} />
              ))}
          </section>
          <br />
          <br />
          <section className=" grid grid-cols-1 sm:grid-cols-3">
            <h2 className=" sm:col-span-3 text-[1.2rem] px-5 py-2">
              เราไปขอแลก
            </h2>
            {wishExchange.length > 0 &&
              wishExchange.map((i: any) => (
                <CardMeEx key={i.id} itemData={i} />
              ))}
          </section>
        </section>
      </div>
    </div>
  );
}

// const CardEx = ({ itemData }: any) => {
//   const idt = itemData;
//   const src = idt.imageurls
//     .slice(1, -1)
//     .split(",")
//     .map((i: string) => i.slice(1, -1));
//   return (
//     <div>
//       <h1>{idt.title}</h1>
//       <p>{idt.itemid}</p>
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
//       <Link href={`/exchange/${idt.itemid}`}>ดูไอเท่มที่มาขอแลก</Link>
//     </div>
//   );
// };

// const CardWishEx = ({ itemData }: any) => {
//   const idt = itemData;
//   const src = idt.imageurls
//     .slice(1, -1)
//     .split(",")
//     .map((i: string) => i.slice(1, -1));
//   return (
//     <div>
//       <h1>{idt.title}</h1>
//       <p>{idt.itemid}</p>
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
//           await fetch(api.exchange, {
//             method: "DELETE",
//             headers: {
//               authorization: "Bearer " + localStorage.token,
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ itemId: idt.itemid }),
//           })
//             .then((res) => res.json())
//             .then((res) => alert(res.message));
//         }}
//       >
//         ยกเลิกการขอแลกเปลี่ยน
//       </button>
//     </div>
//   );
// };
