"use client";

import { AppBar, Toolbar } from "@mui/material";
import LogoutButton from "@/components/LogoutButton";
import styles from "./styles.module.scss";
import { ROUTES } from "@/constants/routes";
import Link from "@/components/Link";
import { usePathname } from "next/navigation";

const ROUTES_MAP: Partial<Record<ROUTES, string>> = {
  [ROUTES.HOME]: "Home",
  [ROUTES.PHOTOS]: "Photos",
  [ROUTES.POSTS]: "Posts"
};

export default function Navbar() {
  const pathname = usePathname();

  return (
    <AppBar position={"sticky"} className={styles.main}>
      <Toolbar variant={"dense"} className={styles.toolbar}>
        <div className={styles.links}>
          {Object.entries(ROUTES_MAP).map(([route, label]) => (
            <Link
              className={pathname === route ? styles.link_active : ""}
              key={route}
              href={route as ROUTES}
            >
              {label}
            </Link>
          ))}
        </div>
        <LogoutButton className={styles["logout-button"]}/>
      </Toolbar>
    </AppBar>
  );
}
