"use client";

import { Button } from "@mui/material";
import axios from "axios";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();

  const logout = async () => {
    try {
      NProgress.start();
      await axios.post("/api/logout");
      router.push(ROUTES.LOGIN);
    } catch (error) {
      console.error(error);
      NProgress.done();
    }
  };

  return <Button className={className} onClick={logout}>Logout</Button>;
}
