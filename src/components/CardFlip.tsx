"use client";

import { useState } from "react";

export interface Card {
  id: string;
  front: string;
  back: string;
  hint?: string;
}

interface CardFlipProps {
  card: Card;
}

export function CardFlip({ card }: CardFlipProps) {
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleFlip = () => {
    setFlipped((f) => !f);
    setShowHint(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-full max-w-lg cursor-pointer"
        style={{ perspective: "1000px", height: "220px" }}
        onClick={handleFlip}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transition: "transform 0.45s ease",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className="absolute inset-0 bg-white border border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center"
          >
            <p className="text-xs text-gray-400 mb-3 tracking-widest uppercase">
              Question
            </p>
            <p className="text-xl font-medium text-gray-900 leading-relaxed">
              {card.front}
            </p>
            <p className="absolute bottom-4 text-xs text-gray-300">
              click to flip
            </p>
          </div>

          {/* Back */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className="absolute inset-0 bg-white border border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center"
          >
            <p className="text-xs text-gray-400 mb-3 tracking-widest uppercase">
              Answer
            </p>
            <p className="text-xl font-medium text-gray-900 leading-relaxed">
              {card.back}
            </p>
          </div>
        </div>
      </div>

      {/* Hint */}
      {card.hint && (
        <div className="h-8 flex items-center">
          {showHint ? (
            <p className="text-sm text-gray-500">{card.hint}</p>
          ) : (
            <button
              onClick={() => setShowHint(true)}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Show hint
            </button>
          )}
        </div>
      )}
    </div>
  );
}
