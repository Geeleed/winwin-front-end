import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Root() {
  return (
    <div className=" bg-black absolute h-full w-full p-14 sm:p-0 grid sm:[grid-template-areas:'._._img_img''._._img_img''head_head_img_img''des_des_img_img''btn_._img_img''._._img_img''._._img_img'] sm:grid-cols-4 ">
      <div className=" sm:[grid-area:img] flex justify-center items-center my-[5rem]">
        <Image
          src="/image/cube.png"
          height={500}
          width={500}
          alt=""
          className=" rounded-full drop-shadow-[20px_20px_100px_#a8fe3888,-20px_-20px_100px_#edff0888] w-[15rem] sm:w-1/2 aspect-square"
        />
      </div>
      <h1 className=" sm:[grid-area:head] sm:place-content-end text-center w-full bg-gradient-to-r from-[#a8fe38] to-[#edff08] inline-block text-transparent bg-clip-text font-extrabold text-[3rem] sm:text-[10rem] animate-gradient leading-none">
        WINWIN
      </h1>
      <div className=" sm:pl-40 sm:[grid-area:btn] sm:w-[30rem] sm:h-fit my-5 flex gap-5 flex-wrap w-full">
        <Link
          href="/signin"
          className=" w-full flex items-center justify-center rounded-full p-3 text-[1.2rem] hover:-translate-y-1 transition-all font-bold bg-gradient-to-r from-[#a8fe38] to-[#edff08] animate-gradient text-black"
        >
          Get start
        </Link>
      </div>
      <p className=" sm:pl-40 sm:text-[1rem] sm:place-content-end sm:[grid-area:des] opacity-50 w-full text-[0.7rem] leading-tight">
        {`แพล็ตฟอร์มแลกของมือสองออนไลน์ ของบางชิ้นที่เราไม่ใช้และกำลังมองหาอะไรบางอย่างแต่ไม่อยากเสียเงินซื้อ จากประชากรหลาย 10,000 คน อาจมีบางคนต้องการมันอยู่ก็ได้นะ ประกาศให้คนอื่นได้รู้ว่าเรามีอะไรและต้องการอะไร คู่แมตช์ของคุณอาจจะกำลังรอคุณอยู่ก็เป็นได้`}
      </p>
    </div>
  );
}
