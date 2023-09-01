import styles from "./styles.module.scss";
import React, { FormEventHandler, PropsWithChildren } from "react";

type TAuthFormProps = {
  onSubmit: FormEventHandler
}

export default function AuthForm({ onSubmit, children }: PropsWithChildren<TAuthFormProps>) {
  return (
    <form onSubmit={onSubmit} className={styles.main}>
      {children}
    </form>
  );
}
