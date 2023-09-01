"use client";

import { Button, TextField } from "@mui/material";
import styles from "./page.module.scss";
import { changePassword } from "@/server-actions";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type={'submit'} disabled={pending}>
      {pending ? 'Loading...' : 'Save'}
    </Button>
  )
}

export default function ChangePassword() {
  return (
    <form action={changePassword} className={styles.main}>
      <TextField
        name="password"
        id="password"
        type="password"
        variant="outlined"
        required
        label="New password"
        size="small"
      />
      <SubmitButton />
    </form>
  );
}
