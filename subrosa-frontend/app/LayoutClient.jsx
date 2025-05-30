"use client";

import { usePathname, useSearchParams } from "next/navigation";
import SubrosaLogoStatic from "../components/SubrosaLogoStatic";

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  const shouldHideLogo =
    pathname === "/contact" ||
    (pathname === "/inscription" &&
      (type === "artist" || type === "user"));

  return (
    <>
      {!shouldHideLogo && <SubrosaLogoStatic />}
      {children}
    </>
  );
}
