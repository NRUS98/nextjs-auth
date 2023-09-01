"use client";

import { Link as MaterialLink } from "@mui/material";
import NextLink, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";
import NProgress from "nprogress";
import { usePathname } from "next/navigation";

type TProps = {
  className?: string;
}

export default function Link({ className, href, children, ...rest }: PropsWithChildren<TProps> & LinkProps) {
  const path = usePathname();

  return (
    <MaterialLink
      underline={"none"}
      component={NextLink}
      href={href}
      onClick={(event) => {
        if (path !== href) {
          NProgress.start();
        }
      }}
      className={className}
      {...rest}
    >
      {children}
    </MaterialLink>
  );
}
