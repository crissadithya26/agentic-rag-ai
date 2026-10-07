const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

// Gemini API key will be stored securely
// as an environment variable on the backend.
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Allow requests from your GitHub Pages website.
app.use(
cors({
origin: [
"https://crissadithya26.github.io"
]
})
);

app.use(express.json({ limit: "10mb" }));

// Health check
app.get("/", (req, res) => {
res.json({
status: "online",
service: "Agentic RAG AI Backend"
});
});

// Agentic RAG endpoint
app.post("/api/ask", async (req, res) => {

try {

```
const {
  question,
  context,
  sources
} = req.body;


// Validate request
if (!question) {
  return res.status(400).json({
    error: "Question is required."
  });
}


if (!context) {
  return res.status(400).json({
    error: "Document context is required."
  });
}


if (!GEMINI_API_KEY) {

  return res.status(500).json({
    error:
      "Gemini API key is not configured on the backend."
  });

}


/*
  Agentic RAG prompt

  Gemini is instructed to answer ONLY
  from the retrieved document context.
*/

const prompt = `
```

You are the reasoning engine of an Agentic Retrieval-Augmented Generation system.

Your task is to answer the user's question using ONLY the retrieved document context provided below.

USER QUESTION:
${question}

RETRIEVED DOCUMENT CONTEXT:
${context}

RULES:

1. Use only information supported by the retrieved document context.
2. Do not invent facts.
3. Do not use outside knowledge.
4. If the answer cannot be determined from the context, clearly say that the information was not found in the provided document.
5. Give a clear and concise answer.
6. When possible, mention the relevant page number.
7. Explain the answer naturally rather than simply copying the document.

This is a research demonstration of grounded Agentic RAG.
`;

```
/*
  Gemini API request
*/

const response = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
    GEMINI_API_KEY,
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({

      contents: [
        {
          parts: [
            {
              text: prompt
            }
```
