export const Content = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => <div className="content">{children}</div>;
