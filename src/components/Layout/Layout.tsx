import React from "react";

export const Layout = ({
  children,
}: {
  children: JSX.Element[];
}): JSX.Element => <div className="layout">{children}</div>;
