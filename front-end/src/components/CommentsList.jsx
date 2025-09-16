export function CommentsList({ comments }) {
  if (!comments || comments.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">No comments yet. Be the first to comment!</p>
    );
  }

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {comments.map((comment, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <h5 className="text-sm md:text-base font-semibold text-gray-800 mb-1">
            Posted By: <span className="font-normal">{comment.postedBy}</span>
          </h5>
          <p className="text-sm md:text-base text-gray-700">{comment.text}</p>
        </div>
      ))}
    </div>
  );
}
