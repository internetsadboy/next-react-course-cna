import Image from "next/image";
import Link from "next/link";
import postgres from "postgres";
import QuizForm from "./quiz-form";
import React, { Suspense } from "react";

const sql = postgres(process.env.DATABASE_URL!);

async function Quizzes() {

  // table inside "neondb" database
  const quizzes = await sql `SELECT * FROM quizzes`;

  return (
    <ul>
      {quizzes.map(quiz => (
        <li  key={quiz.quiz_id}>
          <h2>{quiz.title}</h2>
          <Link className="underline" href={`/quiz/${quiz.quiz_id}`}>Take Quiz</Link>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <section>
      <h1 className="text-4xl font-semibold">All Quizzes</h1>
      <Suspense fallback={<p style={{fontSize: 50, fontWeight: "bold"}}>Loading page...</p>}>
        <Quizzes />
      </Suspense>
    </section>
  );
}
