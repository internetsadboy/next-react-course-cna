import Image from "next/image";
import Link from "next/link";

import postgres from "postgres";

import React, { Suspense } from "react";
import Quizzes from "./quizzes/page";

const sql = postgres(process.env.DATABASE_URL!);


export default function Home() {
  return (
    <section>
      <Suspense fallback={<p style={{marginTop:10, fontSize: 20, fontWeight: "bold"}}>Loading page...</p>}>
        <Quizzes />
      </Suspense>
    </section>
  );
}
