import React, { useCallback, useState, useMemo } from "react";
import { postAI } from "../services/Api";

const AIAsistant = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAskQuestion = useCallback(async () => {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const { answer } = await postAI({
        body: JSON.stringify({ question: question.trim() }),
      });

      setAnswer(answer);
    } catch (error) {
      console.error("Error in AI request:", error);
      setAnswer(
        "Sorry, there was an error processing your question. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [question]);

  const handleEnter = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleAskQuestion();
      }
    },
    [handleAskQuestion]
  );

  const handleClear = useCallback(() => {
    setAnswer("");
    setQuestion("");
  }, []);

  const clearButton = useMemo(() => {
    if (!answer.length) return null;

    return (
      <button
        onClick={handleClear}
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Clear
      </button>
    );
  }, [answer, handleClear]);

  return (
    <section className="bg-white rounded-2xl shadow p-6">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask me anything about the sales data..."
          value={question}
          onKeyDown={handleEnter}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        {clearButton}
        <button
          disabled={loading}
          onClick={handleAskQuestion}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:bg-orange-800"
        >
          {loading ? "Loading.." : "Ask"}
        </button>
      </div>
      {answer && (
        <div className="mt-4 p-4 bg-orange-50 rounded-lg">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </section>
  );
};

export default AIAsistant;
