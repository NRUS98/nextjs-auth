"use client";

import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";
import { getFormData } from "@/utils/form";
import { ROUTES } from "@/constants/routes";
import { Button, TextField } from "@mui/material";
import AuthForm from "@/components/AuthForm";
import NProgress from "nprogress";
import { api } from "@/api";
import { TRegistrationData } from "@/definitions/auth";

export default function Signup() {
  const router = useRouter();

  const signup: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      NProgress.start();
      event.preventDefault();
      await api.signup(getFormData<TRegistrationData>(event.currentTarget))
      router.push(ROUTES.LOGIN);
    } catch (error) {
      NProgress.done();
      console.error(error);
    }
  };

  return (
    <AuthForm onSubmit={signup}>
      <TextField
        name={"name"}
        id={"name"}
        type={"name"}
        variant={"outlined"}
        required
        label={"Name"}
        size={"small"} 
      />
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
        Sign Up
      </Button>
    </AuthForm>
  );
}

