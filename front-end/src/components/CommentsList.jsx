
export function CommentsList({ comments }) {
  if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <>
      {comments.map((comment, index) => {
        return (
          <div key={index}>
            <h5>Posted By: {comment.postedBy}</h5>
            <h5>Comment: {comment.text}</h5>
          </div>
        );
      })}
    </>
  );
}