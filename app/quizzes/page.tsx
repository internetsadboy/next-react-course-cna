import React, { Suspense } from "react";
import Link from "next/link";

import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

async function QuizzesList() {
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

export default function Quizzes() {
  return (
    <section>
      <h1 className="text-4xl font-semibold">Quizzes</h1>
      <Suspense fallback={<p style={{fontSize: 20, fontWeight: "bold"}}>Loading page...</p>}>
        <QuizzesList />
      </Suspense>
    </section>
  );
}