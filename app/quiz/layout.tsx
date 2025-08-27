export default function NestedLayout({
  children,
}: {
    children: React.ReactNode;
}) {
  return (
    <nav>
      <h1>new shit</h1>
      {children}
    </nav>
  );
}   