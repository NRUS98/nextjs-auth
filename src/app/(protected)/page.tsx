"use client";

import styles from "./page.module.scss";
import { getAccessTokenPayload, getUserName } from "@/server-actions";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@mui/material";
import Link from "@/components/Link";
import { ROUTES } from "@/constants/routes";

const useGetUserName = (): string => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    getUserName().then((name) => setUserName(name));
  }, []);

  return userName;
};

export default function Home() {
  const userName = useGetUserName();

  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");

  const showEmail = () => startTransition(() => {
    getAccessTokenPayload().then(({ email }) => {
      setEmail(email);
    });
  });

  return (
    <main className={styles.main}>
      <h1>Home page</h1>
      <span>{`Hello, ${userName}!`}</span>
      {
        !email
          ? <Button onClick={showEmail}>{isPending ? "Loading..." : "Show email"}</Button>
          : <span>{email}</span>
      }
      <Link href={ROUTES.CHANGE_PASSWORD}>Change password</Link>
    </main>
  );
}
