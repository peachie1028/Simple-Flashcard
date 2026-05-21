"use client";

import { useState } from "react";
import { Card } from "./CardFlip";

interface CardEditorProps {
  cards: Card[];
  onChange: (cards: Card[]) => void;
}

const emptyCard = (): Card => ({
  id: crypto.randomUUID(),
  front: "",
  back: "",
  hint: "",
});

export function CardEditor({ cards, onChange }: CardEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Card>(emptyCard());
  const [isAdding, setIsAdding] = useState(false);

  const startAdd = () => {
    setDraft(emptyCard());
    setIsAdding(true);
    setEditingId(null);
  };
  const startEdit = (card: Card) => {
    setDraft({ ...card });
    setEditingId(card.id);
    setIsAdding(false);
  };
  const cancelForm = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  const saveCard = () => {
    if (!draft.front.trim() || !draft.back.trim()) return;
    if (isAdding) {
      onChange([...cards, { ...draft, hint: draft.hint?.trim() || undefined }]);
    } else {
      onChange(
        cards.map((c) =>
          c.id === editingId
            ? { ...draft, hint: draft.hint?.trim() || undefined }
            : c,
        ),
      );
    }
    setIsAdding(false);
    setEditingId(null);
  };

  const deleteCard = (id: string) => {
    onChange(cards.filter((c) => c.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const showForm = isAdding || editingId !== null;

  return (
    <div className="space-y-2">
      {cards.length === 0 && !showForm && (
        <p className="text-sm text-gray-300 py-4 text-center">No cards yet.</p>
      )}

      {cards.map((card, i) => (
        <div
          key={card.id}
          className="flex items-start gap-3 px-3 py-2.5 border border-gray-100 rounded-lg group hover:border-gray-200 transition-colors"
        >
          <span className="text-xs text-gray-300 mt-0.5 w-4 shrink-0">
            {i + 1}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700 truncate">{card.front}</p>
            <p className="text-xs text-gray-400 truncate mt-0.5">{card.back}</p>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button
              onClick={() => startEdit(card)}
              className="text-xs text-gray-400 hover:text-gray-700 px-2 py-1"
            >
              Edit
            </button>
            <button
              onClick={() => deleteCard(card.id)}
              className="text-xs text-red-300 hover:text-red-500 px-2 py-1"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {showForm && (
        <div className="border border-gray-200 rounded-xl p-4 space-y-3">
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            {isAdding ? "New card" : "Edit card"}
          </p>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Front</label>
            <textarea
              autoFocus
              rows={2}
              value={draft.front}
              onChange={(e) =>
                setDraft((d) => ({ ...d, front: e.target.value }))
              }
              placeholder="Question"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Back</label>
            <textarea
              rows={2}
              value={draft.back}
              onChange={(e) =>
                setDraft((d) => ({ ...d, back: e.target.value }))
              }
              placeholder="Answer"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Hint (optional)
            </label>
            <input
              type="text"
              value={draft.hint ?? ""}
              onChange={(e) =>
                setDraft((d) => ({ ...d, hint: e.target.value }))
              }
              placeholder="A small nudge"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={saveCard}
              disabled={!draft.front.trim() || !draft.back.trim()}
              className="px-4 py-1.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isAdding ? "Add" : "Save"}
            </button>
            <button
              onClick={cancelForm}
              className="px-4 py-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!showForm && (
        <button
          onClick={startAdd}
          className="w-full py-2 border border-dashed border-gray-200 text-sm text-gray-400 hover:text-gray-600 hover:border-gray-300 rounded-xl transition-colors"
        >
          + Add card
        </button>
      )}
    </div>
  );
}
