const { GoogleGenAI, Type } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "A score between 0 and 100 indicating how well the candidate matches the job description.",
    ),

  technicalQuestions: z
    .array(
      z.object({
        question: z.string().describe("A technical interview question."),
        intention: z
          .string()
          .describe("Why the interviewer asks this question."),
        answer: z
          .string()
          .describe("A complete interview answer with key points."),
      }),
    )
    .min(10)
    .describe("At least 10 technical interview questions."),

  behavioralQuestions: z
    .array(
      z.object({
        question: z.string().describe("A behavioral interview question."),
        intention: z
          .string()
          .describe("Why the interviewer asks this question."),
        answer: z.string().describe("A complete behavioral interview answer."),
      }),
    )
    .min(5)
    .describe("At least 5 behavioral interview questions."),

  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("Missing or weak skill."),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("Importance of this skill gap."),
      }),
    )
    .min(5)
    .describe("At least 5 skill gaps."),

  preparationPlan: z
    .array(
      z.object({
        day: z.number().describe("Day number."),
        focus: z.string().describe("Main topic to study."),
        tasks: z.array(z.string()).min(2).describe("Study tasks for the day."),
      }),
    )
    .length(7)
    .describe("A 7-day interview preparation plan."),

  title: z.string().describe("Job title."),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}              
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: interviewReportSchema.toJSONSchema(),
    },
  });

  return JSON.parse(response.text);
}

module.exports = generateInterviewReport;
