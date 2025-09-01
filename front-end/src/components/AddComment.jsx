import { useState } from 'react';

export function AddComment({ onAddComment }) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    onAddComment({commentText });
    setCommentText('');
  };

  return (
    <div>
      <label htmlFor="">Comment:</label>
      <input type="text" value={commentText} onChange={e => setCommentText(e.target.value)} />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}