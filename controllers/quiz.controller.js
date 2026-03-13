export const generateQuiz = async (req, res) => {
  try {
    let { transcript, questionCount = 10, difficulty = "medium" } = req.body;

    if (!transcript) {
      return res.status(400).json({ message: "Transcript required" });
    }

    // 1. Clean Difficulty
    const allowedDifficulties = ["easy", "medium", "hard"];
    const selectedDifficulty = difficulty.toLowerCase().trim();
    difficulty = allowedDifficulties.includes(selectedDifficulty) ? selectedDifficulty : "medium";

    // 2. Transcript Handling
    if (Array.isArray(transcript)) transcript = transcript.join(" ");
    if (typeof transcript === "object") transcript = JSON.stringify(transcript);
    transcript = transcript.slice(0, 12000);

    // 3. Count Handling
    const rawCount = Number(req.body.questionCount);
    questionCount = (!Number.isInteger(rawCount) || rawCount < 1) ? 10 : rawCount;

    // 4. Batch Logic
   const BATCH_SIZE = 10;
let allQuestions = [];

while (allQuestions.length < questionCount) {

  const remaining = questionCount - allQuestions.length;
  const currentBatchSize = Math.min(BATCH_SIZE, remaining);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `Generate ${currentBatchSize} ${difficulty} MCQ questions.
Return ONLY JSON.

Format:
{
 "questions":[
  {
   "question":"",
   "options":["","","",""],
   "correctAnswer":"",
   "level":"${difficulty}"
  }
 ]
}`
        },
        { role: "user", content: transcript },
      ],
    }),
  });

  const data = await response.json();
  let content = data.choices[0].message.content;

  content = content.replace(/```json/g, "").replace(/```/g, "").trim();

  const parsed = JSON.parse(content);

  if (parsed?.questions?.length) {
    const fixed = parsed.questions.map(q => ({
      ...q,
      level: difficulty
    }));

    allQuestions.push(...fixed);
  }

}

    // 5. Final Safety Cleanup
    allQuestions = allQuestions.map((q) => {
      if (!q.options.includes(q.correctAnswer)) {
        q.correctAnswer = q.options[0];
      }
      return q;
    });
    // 6. Return the data WITH the difficulty field
    return res.json({
      title: "Generated Quiz",
      totalQuestions: allQuestions.length,
      questions: allQuestions,
      difficulty: difficulty // 🔥 This tells the frontend which tab to open
    });

  } catch (error) {
    console.log("AI ERROR:", error);
    return res.status(500).json({ message: "Quiz generation failed", error: error.message });
  }
};