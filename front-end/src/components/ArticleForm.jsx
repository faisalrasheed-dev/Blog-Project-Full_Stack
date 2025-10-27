import { useState } from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
const ArticleForm = ({initialData={},onSubmit,userLoading}) => {
const [title, setTitle] = useState(initialData?.title ||'');
  const [content, setContent] = useState(initialData?.content || '');
  const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!title.trim() || !content.trim()) return;
    const wordCount = content.trim().split(/\s+/).length;
    if (wordCount < 50) {
      alert("Content Must contain 50 words");
      return;
    }
    setLoading(true);
    await onSubmit(title,content);
    setContent('');
    setTitle('');
    setLoading(false);
  };

  return (
    
        <form  onSubmit={handleSubmit}>
          <input type="text" placeholder='Add Your Title Here' className=' border border-gray-300 w-full text-center text-xl md:text-2xl'value={title} onChange={(e) => setTitle(e.target.value)} />
          <ReactQuill placeholder="Write Your Content Here" value={content} onChange={setContent} />
        <button  disabled={loading || userLoading} className='border p-2 mt-2 rounded-lg w-full hover:text-emerald-300'>
          {loading ? "Submitting..." : "Submit"}
        </button>
        </form>
      
  )
}

export default ArticleForm