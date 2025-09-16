import { useState } from 'react';

export function AddComment({ onAddComment }) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment({ commentText });
    setCommentText('');
  };

  return (
    <div className="max-w-3xl mx-auto mb-6">
      <textarea
        placeholder="Enter your comment here..."
        rows={3}
        maxLength={200}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-gray-500">{200 - commentText.length} characters left</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          onClick={handleSubmit}
          disabled={!commentText.trim()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
