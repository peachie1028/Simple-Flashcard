"use client";

import { useState, useRef } from "react";
import { CardFlip, Card } from "@/components/CardFlip";
import { CardEditor } from "@/components/CardEditor";

type Tab = "edit" | "study";

function parseCardsFromText(text: string): Card[] {
  const cards: Card[] = [];
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^Q:/i.test(line)) {
      const front = line.replace(/^Q:\s*/i, "").trim();
      const nextLine = lines[i + 1] ?? "";
      if (/^A:/i.test(nextLine)) {
        const back = nextLine.replace(/^A:\s*/i, "").trim();
        if (front && back) cards.push({ id: crypto.randomUUID(), front, back });
        i += 2;
        continue;
      }
    }
    i++;
  }

  return cards;
}

export default function Home() {
  const [tab, setTab] = useState<Tab>("edit");
  const [cards, setCards] = useState<Card[]>([]);
  const [studyIndex, setStudyIndex] = useState(0);
  const [fileError, setFileError] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setFileError("");
    setFileName(file.name);

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["txt", "md", "mdx"].includes(ext ?? "")) {
      setFileError("Only .txt, .md, and .mdx files are supported.");
      return;
    }

    const text = await file.text();
    const parsed = parseCardsFromText(text);
    if (parsed.length > 0) {
      setCards(parsed);
      return;
    }

    const chunks = text
      .split(/\n\s*\n/)
      .map((c) => c.trim())
      .filter(Boolean);
    if (chunks.length >= 2) {
      const paired: Card[] = [];
      for (let i = 0; i + 1 < chunks.length; i += 2) {
        paired.push({
          id: crypto.randomUUID(),
          front: chunks[i],
          back: chunks[i + 1],
        });
      }
      if (paired.length > 0) {
        setCards(paired);
        return;
      }
    }

    setFileError(
      "Could not detect cards. Try Q: / A: format, or add cards manually.",
    );
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const currentCard = cards[studyIndex];

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-xl mx-auto px-4 py-10 space-y-8">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-100">
          {(["edit", "study"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm capitalize transition-colors border-b-2 -mb-px ${
                tab === t
                  ? "border-gray-900 text-gray-900 font-medium"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {t === "edit" ? "Edit" : "Study"}
            </button>
          ))}
        </div>

        {/* Edit tab */}
        {tab === "edit" && (
          <div className="space-y-6">
            {/* File upload */}
            <div>
              <p className="text-sm text-gray-500 mb-2">Upload a file</p>
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {fileName ? (
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {fileName}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFileName("");
                      }}
                      className="text-xs text-gray-400 hover:text-gray-600 mt-1"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-400">
                      Drop a <span className="text-gray-600">.txt</span> or{" "}
                      <span className="text-gray-600">.md</span> file, or click
                      to browse
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                      Format: Q: question / A: answer
                    </p>
                  </div>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept=".txt,.md,.mdx"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                />
              </div>
              {fileError && (
                <p className="text-xs text-red-400 mt-2">{fileError}</p>
              )}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-300">or add manually</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Card editor */}
            <CardEditor cards={cards} onChange={setCards} />

            {/* Study button */}
            {cards.length > 0 && (
              <button
                onClick={() => {
                  setStudyIndex(0);
                  setTab("study");
                }}
                className="w-full py-2.5 bg-gray-900 text-white text-sm rounded-xl hover:bg-gray-700 transition-colors"
              >
                Study {cards.length} card{cards.length !== 1 ? "s" : ""}
              </button>
            )}
          </div>
        )}

        {/* Study tab */}
        {tab === "study" && (
          <div className="space-y-6">
            {cards.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-sm text-gray-400">No cards yet.</p>
                <button
                  onClick={() => setTab("edit")}
                  className="mt-2 text-sm text-gray-600 hover:underline"
                >
                  Go add some
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>
                    {studyIndex + 1} / {cards.length}
                  </span>
                  <button
                    onClick={() => setStudyIndex(0)}
                    className="hover:text-gray-600 transition-colors text-xs"
                  >
                    Restart
                  </button>
                </div>

                <div className="h-px bg-gray-100 overflow-hidden rounded-full">
                  <div
                    className="h-full bg-gray-300 transition-all duration-500"
                    style={{ width: `${(studyIndex / cards.length) * 100}%` }}
                  />
                </div>

                <CardFlip key={currentCard.id} card={currentCard} />

                <div className="flex gap-3 justify-center pt-2">
                  <button
                    onClick={() => setStudyIndex((i) => Math.max(0, i - 1))}
                    disabled={studyIndex === 0}
                    className="px-5 py-2 border border-gray-200 text-gray-600 text-sm rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() =>
                      setStudyIndex((i) => Math.min(cards.length - 1, i + 1))
                    }
                    disabled={studyIndex === cards.length - 1}
                    className="px-5 py-2 bg-gray-900 text-white text-sm rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>

                {studyIndex === cards.length - 1 && (
                  <p className="text-center text-sm text-gray-400">
                    End of deck.{" "}
                    <button
                      onClick={() => setStudyIndex(0)}
                      className="underline hover:text-gray-600"
                    >
                      Start over
                    </button>
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
