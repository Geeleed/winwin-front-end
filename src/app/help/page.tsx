"use client";
import React from "react";
import useAuth from "../useAuth";
import Load from "../component/Load";
import Navbar from "../component/Navbar";

export default function Page() {
  return useAuth({ page: <Help />, currentUrl: "/help", loading: <Load /> });
}

function Help() {
  return (
    <div className=" bg-black">
      <Navbar />
      <div className=" flex justify-center w-full">
        <article className=" max-w-[40rem]">
          <br />
          <h1 className=" text-[1.5rem] font-bold text-[#edff08]">
            แนะนำระบบเบื้องต้น
          </h1>
          <p className=" indent-10 my-3">
            ระบบนี้เป็นแพล็ตฟอร์มสำหรับให้ผู้ใช้ได้แลกของมือสองกัน
            โดยมีแนวคิดว่าภายใต้ประชากรจำนวนมากมีความเป็นไปได้ที่ item
            ที่เรามีจะเป็นที่ต้องการของคนอื่นและ item ของคนอื่นก็เช่นเดียวกัน
            ทำให้แลกกันได้โดยไม่จำเป็นต้องซื้อ
          </p>
          <br />
          <h2 className=" text-[1.1rem] font-semibold text-[#edff08]">
            การใช้งาน
          </h2>
          <p className=" indent-10 my-3">
            ผู้ใช้ต้องอัปโหลด item ของตัวเองเข้ามาในแพล็ตฟอร์ม
            จากนั้นเลือกว่าต้องการจะโพสต์ item ของตัวเองหรือไม่ หากกด "โพสต์"
            แล้ว ข้อมูลจะอยู่ในตลาดซึ่งคนอื่นสามารถเข้ามาหาเลือก "ขอแลก" ได้
            เราเองก็ขอแลกของคนอื่นได้เช่นกัน เราสามารถกด "บันทึก"
            ไว้ก่อนได้ในกรณีที่ยังไม่ตัดสินใจ หากมีคนอื่นมาขอแลก
            เราสามารถดูได้ว่าคนนั้นมี item อะไรใน stock ให้เรากดแลกได้บ้าง
            หากมีรายการที่สนใจจะแลกก็กด "แมตช์" ได้เลย
            จากนั้นคุณและคู่แมตช์จะได้รับรายการที่อยู่สำหรับส่งพัสดุ
          </p>
        </article>
      </div>
    </div>
  );
}
