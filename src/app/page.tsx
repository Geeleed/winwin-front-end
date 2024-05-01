import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Root() {
  return (
    <div className=" w-[100vw] h-[100vh] bg-black grid grid-cols-2 place-content-center place-items-center">
      <aside className=" p-20">
        <h1 className="bg-gradient-to-r from-[#a8fe38] to-[#edff08] inline-block text-transparent bg-clip-text font-extrabold text-[10rem] animate-gradient leading-none">
          WINWIN
        </h1>
        <p className=" opacity-50 mb-5">
          {`แพล็ตฟอร์มแลกของมือสองออนไลน์ ของบางชิ้นที่เราไม่ใช้และกำลังมองหาอะไรบางอย่างแต่ไม่อยากเสียเงินซื้อ จากประชากรหลาย 10,000 คน อาจมีบางคนต้องการมันอยู่ก็ได้นะ ประกาศให้คนอื่นได้รู้ว่าเรามีอะไรและต้องการอะไร คู่แมตช์ของคุณอาจจะกำลังรอคุณอยู่ก็เป็นได้`}
        </p>
        <div className=" flex gap-5">
          <Link
            href="/signin"
            className=" flex items-center justify-center rounded-full p-3 w-[13rem] text-[1.2rem] hover:-translate-y-1 transition-all font-bold bg-gradient-to-r from-[#a8fe38] to-[#edff08] animate-gradient text-black"
          >
            เข้าระบบ
          </Link>
          <Link
            href="/signup"
            className=" flex items-center justify-center border rounded-full p-3 w-[13rem] text-[1.2rem] hover:-translate-y-1 hover:border-[#edff08] transition-all font-bold"
          >
            สมัครสมาชิก
          </Link>
        </div>
      </aside>
      <aside>
        <Image src="/image/cube.png" height={600} width={600} alt="" />
      </aside>
    </div>
  );
}
