import Link from "next/link";
import api from "../api";
import { ItemData } from "./Card";

// export interface ItemData {
//   id: String;
//   itemid: String;
//   ownerid: String;
//   title: String;
//   description: String;
//   imageurls: String;
//   weight: String;
//   height: String;
//   width: String;
//   length: String;
//   postat: String;
//   expireat: String;
//   sending: String;
//   status: String;
//   extend: String;
//   createdat: String;
// }
export const ButtonWish = ({
  itemData,
  checkedState,
  isGrad = false,
}: {
  itemData: ItemData;
  checkedState: any;
  isGrad: boolean;
}) => {
  const [checked, setChecked] = checkedState;

  const idt = itemData;
  return (
    <button
      className={
        " w-full flex items-center gap-2 px-2 hover:scale-[1.05] cursor-pointer active:scale-95 p-1 rounded-full bg-[#ffffff11]" +
        (isGrad &&
          " text-black font-bold bg-gradient-to-tr from-[#a8fe38] to-[#edff08] animate-gradient")
      }
      onClick={async () => {
        await fetch(api.wish, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Baerer " + localStorage.token,
          },
          body: JSON.stringify({
            itemId: idt.itemid,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            res.isOk && setChecked("wish");
          });
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        fill={isGrad ? "#000" : "currentColor"}
        className="bi bi-heart-fill cursor-pointer hover:scale-[1.05] active:scale-95"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
        />
      </svg>
      บันทึก
    </button>
  );
};
export const ButtonCancelWish = ({
  itemData,
  checkedState,
  isGrad = false,
}: {
  itemData: ItemData;
  checkedState: any;
  isGrad: boolean;
}) => {
  const [checked, setChecked] = checkedState;

  const idt = itemData;
  return (
    <button
      className={
        " w-full flex items-center gap-2 px-2 hover:scale-[1.05] cursor-pointer active:scale-95 p-1 rounded-full bg-[#ffffff11]" +
        (isGrad &&
          " text-black font-bold bg-gradient-to-tr from-[#a8fe38] to-[#edff08] animate-gradient")
      }
      onClick={async () => {
        await fetch(api.wish, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: "Baerer " + localStorage.token,
          },
          body: JSON.stringify({
            itemId: idt.itemid,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            res.isOk && setChecked("unwish");
          });
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        fill={isGrad ? "#000" : "currentColor"}
        className="bi bi-x-circle cursor-pointer hover:scale-[1.05] active:scale-95"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
      </svg>
      ลบ
    </button>
  );
};

export const ButtonExchange = ({
  itemData,
  checkedState,
  isGrad = false,
}: {
  itemData: ItemData;
  checkedState: any;
  isGrad: boolean;
}) => {
  const [checked, setChecked] = checkedState;
  const idt = itemData;
  return (
    <button
      className={
        " w-full flex items-center gap-2 px-2 hover:scale-[1.05] cursor-pointer active:scale-95 p-1 rounded-full bg-[#ffffff11]" +
        (isGrad &&
          " text-black font-bold bg-gradient-to-tr from-[#a8fe38] to-[#edff08] animate-gradient")
      }
      onClick={async () => {
        await fetch(api.exchange, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Baerer " + localStorage.token,
          },
          body: JSON.stringify({
            itemId: idt.itemid,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            res.isOk && setChecked("exchange");
          });
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        fill={isGrad ? "#000" : "currentColor"}
        className="bi bi-arrow-through-heart-fill"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l3.103-3.104a.5.5 0 1 1 .708.708L4.5 12.207V14a.5.5 0 0 1-.146.354zM16 3.5a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182A24 24 0 0 1 5.8 12.323L8.31 9.81a1.5 1.5 0 0 0-2.122-2.122L3.657 10.22a9 9 0 0 1-1.039-1.57c-.798-1.576-.775-2.997-.213-4.093C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5z"
        />
      </svg>
      ขอแลก
    </button>
  );
};

export const ButtonPost = ({
  itemData,
  checkedState,
  isGrad = false,
}: {
  itemData: ItemData;
  checkedState: any;
  isGrad: boolean;
}) => {
  const [checked, setChecked] = checkedState;
  const idt = itemData;
  return (
    <button
      className={
        " w-full flex items-center gap-2 px-2 hover:scale-[1.05] cursor-pointer active:scale-95 p-1 rounded-full bg-[#ffffff11]" +
        (isGrad &&
          " text-black font-bold bg-gradient-to-tr from-[#a8fe38] to-[#edff08] animate-gradient")
      }
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        fill={isGrad ? "#000" : "currentColor"}
        className="bi bi-x-circle"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
      </svg>
      เลิกโพสต์
    </button>
  );
};

export const ButtonSeeOther = ({
  itemData,
  checkedState,
  isGrad = false,
}: {
  itemData: ItemData;
  checkedState: any;
  isGrad: boolean;
}) => {
  const [checked, setChecked] = checkedState;
  const idt = itemData;
  return (
    <Link
      href={`/exchange/${idt.itemid}`}
      className={
        " w-full flex items-center gap-2 px-2 hover:scale-[1.05] cursor-pointer active:scale-95 p-1 rounded-full bg-[#ffffff11]" +
        (isGrad &&
          " text-black font-bold bg-gradient-to-tr from-[#a8fe38] to-[#edff08] animate-gradient")
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        fill={isGrad ? "#000" : "currentColor"}
        className="bi bi-box"
        viewBox="0 0 16 16"
      >
        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
      </svg>
      ดูของ
    </Link>
  );
};

export const ButtonCancelExchange = ({
  itemData,
  checkedState,
  isGrad = false,
}: {
  itemData: ItemData;
  checkedState: any;
  isGrad: boolean;
}) => {
  const [checked, setChecked] = checkedState;
  const idt = itemData;
  return (
    <button
      className={
        " w-full flex items-center gap-2 px-2 hover:scale-[1.05] cursor-pointer active:scale-95 p-1 rounded-full bg-[#ffffff11]" +
        (isGrad &&
          " text-black font-bold bg-gradient-to-tr from-[#a8fe38] to-[#edff08] animate-gradient")
      }
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
          .then((res) => {
            setChecked("cancel");
            alert(res.message);
          });
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        fill={isGrad ? "#000" : "currentColor"}
        className="bi bi-x-circle"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
      </svg>
      ลบ
    </button>
  );
};

export const ButtonMatch = ({
  myItemId,
  itemData,
  checkedState,
  isGrad = false,
}: {
  myItemId: string;
  itemData: ItemData;
  checkedState: any;
  isGrad: boolean;
}) => {
  const [checked, setChecked] = checkedState;
  const idt = itemData;
  return (
    <button
      className={
        " w-full flex items-center gap-2 px-2 hover:scale-[1.05] cursor-pointer active:scale-95 p-2 rounded-full bg-[#ffffff11]" +
        (isGrad &&
          " text-black font-bold bg-gradient-to-tr from-[#a8fe38] to-[#edff08] animate-gradient")
      }
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
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.isOk) setChecked("matched");
          });
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill={isGrad ? "#000" : "currentColor"}
        className="bi bi-arrow-down-up"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"
        />
      </svg>
      {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          fill={isGrad ? "#000" : "currentColor"}
          className="bi bi-x-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg> */}
      แมตช์
    </button>
  );
};
