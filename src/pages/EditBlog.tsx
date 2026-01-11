import { useState, useEffect } from "react";
import { getBlogs, updateBlog } from "../services/blogService";
import utils from "../utils/validators";
import Toast from "../components/Toast";

type Props = {
  blogId: string;
  onClose: () => void;
  onSuccess: () => void;
};

const EditBlog = ({ blogId, onClose, onSuccess }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ toast, setToast ] = useState<{message: string; type?: "success" | "error"} | null >(null);

  useEffect(() => {
    const load = async () => {
      const blogs = await getBlogs();
      const blog = blogs.find((b: any) => b.id === blogId);
    

      if (!blog) {
        // alert("Blog not found");
        setToast({message: "Blog not found", type: "error"});
        return;
      }

      setTitle(blog.title);
      setContent(blog.content);
    };

    load();
  }, [blogId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (utils.isBlank(title) || utils.isBlank(content)) {
      // alert("Title and content are required.");
      setToast({message: "Title and content are required", type: "error"});
      return;
    }

    try {
      await updateBlog(blogId, title, content);
      setToast({message: "Blog successfully updated"})
      onSuccess();
      setTimeout(onClose, 1500);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 rounded-lg">
      <h1 className="text-xl font-bold mb-2">Update Your Blog</h1>
      <p className="text-sm text-gray-600 mb-4">
        Update your story and save the changes.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-md p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="border rounded-md p-3 text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-300 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
        
      </form>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
    </div>

    
  );
};

export default EditBlog;
