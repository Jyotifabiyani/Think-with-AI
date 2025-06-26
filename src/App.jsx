import React, { useState } from "react";
import "./index.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Load API Key securely via Vite
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const genContent = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = await response.text();
      setOutput(text);
    } catch (err) {
      console.error("Gemini API Error:", err);
      setOutput("❌ Failed to generate content.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 bg-black text-white p-4">
      <h1 className="text-4xl font-bold">
        Think with <span className="text-teal-400">AI</span>
      </h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-[80vw] max-w-2xl h-40 p-4 rounded border bg-black border-gray-600 focus:ring-2 focus:ring-teal-400"
        placeholder="Start thinking with AI..."
      />
      <button
        onClick={genContent}
        disabled={!input || loading}
        className="bg-teal-400 text-black px-6 py-2 rounded hover:bg-teal-500 transition"
      >
        {loading ? "Thinking..." : "Send"}
      </button>
      {output && (
        <div className="mt-6 text-left max-w-2xl whitespace-pre-wrap">{output}</div>
      )}
    </div>
  );
}

export default App;
