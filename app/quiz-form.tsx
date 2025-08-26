import { revalidatePath } from "next/cache";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

function Answer({ id }: { id: number }) {
    return (
        <div className="flex items-center gap-3 my-2">
            <label className="w-32">
                Answer {id}
            </label>
            <input
                type="text"
                name={`answer-${id}`}
                className="flex-1 border border-gray-300 px-3 py-2"
            />
            <div className="w-8 shrink-0 flex justify-center">
                <input 
                    type="checkbox" 
                    name={`check-${id}`} 
                    className="h-5 w-5" 
                />
            </div>
        </div>
    );
}

export default function QuizForm() {
    async function createQuiz(formData: FormData) {
        "use server";
        // auto extract form data via next
        let title = formData.get("title") as string;
        let description = formData.get("description") as string;
        let question = formData.get("question") as string;
        let answers = [1,2,3].map((id) => {
            return {
                answer: formData.get(`answer-${id}`) as string,
                isCorrect: formData.get(`check-${id}`) === "on"
            }
        });

        await sql `
            WITH new_quiz AS (
                INSERT INTO quizzes (title, description, question_text, created_at)
                VALUES (${title}, ${description}, ${question}, NOW())
                RETURNING quiz_id
            )
            INSERT INTO answers (quiz_id, answer_text, is_correct)
            VALUES
                ( (SELECT quiz_id FROM new_quiz), ${answers[0].answer}, ${answers[0].isCorrect} ),
                ( (SELECT quiz_id FROM new_quiz), ${answers[1].answer}, ${answers[1].isCorrect} ),
                ( (SELECT quiz_id FROM new_quiz), ${answers[2].answer}, ${answers[2].isCorrect} )
        `;

        revalidatePath('/');

    }
    return (
        <form action={createQuiz} className="flex flex-col gap-4 mt-10 max-w-md">
            <h2 className="text-2xl mb-4">New Quiz</h2>
            <div className="flex items-center gap-3">
                <label htmlFor="title" className="w-32">Title</label>
                <input
                    id="title"
                    name="title"
                    className="flex-1 border border-gray-300 px-3 py-2"
                />
                <div className="w-8 shrink-0" />
            </div>

            <div className="flex items-center gap-3">
                <label htmlFor="description" className="w-32">Description</label>
                <input
                    id="description"
                    name="description"
                    className="flex-1 border border-gray-300 px-3 py-2"
                />
                <div className="w-8 shrink-0" />
            </div>

            <div className="flex items-center gap-3">
                <label htmlFor="question" className="w-32">Question</label>
                <input
                    id="question"
                    name="question"
                    className="flex-1 border border-gray-300 px-3 py-2"
                />
                <div className="w-8 shrink-0" />
            </div>
            
            <div className="flex flex-col mt-4 pt-4">
                <h2 className="text-2xl mb-4">Quiz Answers</h2>
                <Answer id={1} />
                <Answer id={2} />
                <Answer id={3} />
                <button 
                    type="submit"
                    className="bg-gray-200 p-2 mt-8 rounded hover:bg-gray-300 transition-all">
                        Create Quiz
                </button>
            </div>
        </form>
    );
}