"use client";
import React, { useEffect, useState } from "react";
import useAuth from "@/app/useAuth";
import api from "@/app/api";
import Load from "@/app/component/Load";
import CardOtherIsMatched from "@/app/component/CardOtherIsMatched";
import Navbar from "@/app/component/Navbar";

export default function Page({ params }: { params: { myItemId: string } }) {
  return useAuth({
    page: <MyItemId myItemId={params.myItemId} />,
    currentUrl: `/me/${params.myItemId}`,
    loading: <Load />,
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
    <div className=" bg-black">
      <Navbar />
      <div className=" fixed top-0 left-0 w-full h-full bg-[url('/image/cube.png')] bg-fixed bg-no-repeat bg-contain bg-center [filter:blur(20px)]"></div>
      <div className=" flex w-full justify-center h-full">
        <section className=" z-[1]">
          <h1 className=" text-[1.5rem] font-bold p-3">แมตช์แล้ว</h1>
          <div className=" sm:flex">
            <div>
              <h2 className=" px-5 py-3 text-[1.1rem]">ไอเท่มของคู่แมตช์</h2>
              {matchItem && <CardOtherIsMatched itemData={matchItem} />}
            </div>
            <div>
              <h2 className=" px-5 py-3 text-[1.1rem]">ไอเท่มของเรา</h2>
              {/* {myItem && <CardMyItem itemData={myItem} />} */}
              {myItem && <CardOtherIsMatched itemData={myItem} />}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
