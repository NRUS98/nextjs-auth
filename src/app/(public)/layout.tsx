"use client";

import styles from "./layout.module.scss";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import Link from "@/components/Link";

const useLink = ()=> {
  const currentRoute = usePathname();

  return {
    [ROUTES.SIGNUP]: [ROUTES.LOGIN, "Login"],
    [ROUTES.LOGIN]: [ROUTES.SIGNUP, "Create an account"]
  }[currentRoute] as [ROUTES, string];
}

function NavLink({ className }: { className: string }) {
  const [route, text] = useLink();

  return (
    <Link
      href={route}
      className={className}
      prefetch
    >
      {text}
    </Link>
  );
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.main}>
      {children}
      <NavLink className={styles.navigation}/>
    </div>
  );
}
