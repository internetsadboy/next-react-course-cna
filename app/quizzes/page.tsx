import React, { Suspense } from "react";
import Link from "next/link";

import styles from "./Quizzes.module.css";

import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

async function QuizzesList() {
  // table inside "neondb" database
  const quizzes = await sql `SELECT * FROM quizzes`;

  return (
    <ul className="mt-4" style={{paddingLeft: 15}}>
      {quizzes.map(quiz => (
        <li 
          key={quiz.quiz_id}
          style={{listStyle: "inside"}}
          className="mb-2 text-md"
          >
           <Link className={styles.quizItem} href={`/quiz/${quiz.quiz_id}`}>{quiz.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default function Quizzes() {
  return (
    <section>
      <h1 className="text-2xl">Quizzes</h1>
      <Suspense fallback={<p style={{fontSize: 20, fontWeight: "bold", marginTop: 10}}>Loading page...</p>}>
        <QuizzesList />
      </Suspense>
    </section>
  );
}