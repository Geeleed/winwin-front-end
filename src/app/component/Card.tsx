import Image from "next/image";

export interface ItemData {
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
export default function Card({
  itemData,
  button,
  checkedState,
}: {
  itemData: ItemData;
  button: JSX.Element[];
  checkedState: any;
}) {
  const [checked, setChecked] = checkedState;
  const idt = itemData;
  const duration = 1440 * 60 * 1000; //ms
  const exp = new Date(Number(idt.postat) + duration).toLocaleString();
  const src = idt.imageurls
    .slice(1, -1)
    .split(",")
    .map((i: string) => i.slice(1, -1));
  return (
    <div
      className={
        " relative w-[24rem] aspect-[3/4] bg-[#ffffff11] rounded-[1rem] m-1 overflow-hidden shadow-[0px_0px_1px_0px_#ffffff]" +
        (checked && " hidden")
      }
    >
      <div className="flex h-3/4 aspect-square overflow-x-auto">
        {src.map((i: string) => (
          <Image
            src={i}
            width={300}
            height={300}
            alt={i}
            key={i}
            quality={50}
            className=" flex-none w-full"
            loading="lazy"
          />
        ))}
      </div>
      <div className=" h-1/4 grid grid-cols-4 grid-rows-5 gap-1 p-2 pt-0">
        <div className=" col-span-4 text-[1.3rem] w-full flex justify-between items-center bg-[#ffffff08]">
          <p className=" text-[0.7rem] text-[#ffffffaa]">{"หมดอายุ: " + exp}</p>
          {idt.sending === "safePosting" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#a8fe38"
              className="bi bi-shield-fill-check"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-shield"
              viewBox="0 0 16 16"
            >
              <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
            </svg>
          )}
        </div>
        <div className=" col-span-3 row-span-4 flex flex-col justify-between">
          <div>
            <h1 className=" text-[1.2rem] font-semibold">{idt.title}</h1>
            <p className=" text-[0.8rem] h-[3rem] overflow-y-auto leading-snug">
              {idt.description}
            </p>
          </div>
          <p className=" text-[0.6rem] flex gap-2">
            <p className=" leading-none text-[#ffffffaa]">
              หนัก {idt.weight} kg
            </p>
            <p className=" leading-none text-[#ffffffaa]">
              กว้าง {idt.width} cm
            </p>
            <p className=" leading-none text-[#ffffffaa]">
              ยาว {idt.length} cm
            </p>
            <p className=" leading-none text-[#ffffffaa]">
              สูง {idt.height} cm
            </p>
          </p>
        </div>
        <div className=" col-span-1 row-span-4 flex flex-col gap-1 text-[0.8rem] justify-end items-center">
          {button.map((btn: JSX.Element) => btn)}
        </div>
      </div>
    </div>
  );
}
