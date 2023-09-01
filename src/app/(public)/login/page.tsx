"use client";

import { FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import { getFormData } from "@/utils/form";
import { ROUTES } from "@/constants/routes";
import { Button, TextField } from "@mui/material";
import AuthForm from "@/components/AuthForm";
import NProgress from "nprogress";
import { api } from "@/api";
import { TLoginData } from "@/definitions/auth";

export default function LoginPage() {
  const router = useRouter();

  const login: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault();
      NProgress.start()
      await api.login(getFormData<TLoginData>(event.currentTarget))
      router.push(ROUTES.HOME);
    } catch (error) {
      console.error(error);
      NProgress.done()
    }
  };

  return (
    <AuthForm onSubmit={login}>
      <TextField
        name={"email"}
        id={"email"}
        type={"email"}
        variant={"outlined"}
        required
        label={"Email"}
        size={"small"} 
      />
      <TextField
        name={"password"}
        id={"password"}
        type={"password"}
        variant={"outlined"}
        required
        label={"Password"}
        size={"small"} 
      />
      <Button type={"submit"} variant="contained">
        Login
      </Button>
    </AuthForm>
  );
}
