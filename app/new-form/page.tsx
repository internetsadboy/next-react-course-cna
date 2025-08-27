import React, {Suspense} from "react";
import QuizForm from "../quiz-form";
import Link from "next/dist/client/link";

export default function NestedLayout({
  children,
}: {
    children: React.ReactNode;
}) {
  return (
    <div>
      <Link href="/">Home</Link>
      <Suspense fallback={<p style={{fontSize: 50, fontWeight: "bold"}}>Loading page...</p>}>
        <QuizForm />
      </Suspense>
      {children}
    </div>
  );
}   