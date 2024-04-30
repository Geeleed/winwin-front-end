// "use client";
// import React, { useRef, useState } from "react";

// export default function Root() {
//   const imgRef = useRef<HTMLInputElement | any>(null);
//   const handleFileUpload = async () => {
//     const formData: any = new FormData();
//     console.log(imgRef.current.files);
//     [...imgRef.current.files].forEach((file: File) => {
//       formData.append("files", file);
//     });
//     formData.append("title", "teeee");
//     formData.append("userId", "999ee");
//     await fetch("http://localhost:8000/db/files", {
//       method: "POST",
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((res) => console.log(res));
//   };
//   return (
//     <div>
//       <input type="file" ref={imgRef} multiple />
//       <button onClick={handleFileUpload}>Send</button>
//     </div>
//   );
// }
import React from "react";

export default function Root() {
  return <div>Root</div>;
}
