import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "./api";

export default function useAuth({
  page,
  currentUrl,
}: {
  page: React.JSX.Element;
  currentUrl: string;
}): React.JSX.Element | null {
  const [Page, setPage] = useState<null | React.JSX.Element>(null);
  const router = useRouter();
  // กำหนด path ที่ยังไม่ signin
  const out = ["/", "/signin", "/signup", "/forgot"];
  const checkAuth = async () => {
    await fetch(api.auth, {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.isOk === false && out.includes(currentUrl)) {
          setPage(page);
        } else if (res.isOk === true && out.includes(currentUrl)) {
          localStorage.setItem("token", res.token);
          router.push("/market");
        } else if (res.status) {
          localStorage.setItem("token", res.token);
          setPage(page);
        } else {
          router.push("/");
        }
      })
      .catch(() => {
        if (out.includes(currentUrl)) {
          setPage(page);
        } else {
          router.push("/");
        }
      });
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return Page;
}
