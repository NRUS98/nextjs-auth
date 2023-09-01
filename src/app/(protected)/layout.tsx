import { PropsWithChildren } from "react";
import Navbar from "@/components/Navbar";

export default function ProtectedPagesLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar/>
      {children}
    </>
  );
}
