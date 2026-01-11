import { useState } from "react";
import { createBlog } from "../services/blogService";
import utils from "../utils/validators";
import { supabase } from "../lib/supabase";
import Toast from "../components/Toast";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

const CreateBlog = ({ onClose, onSuccess }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type?: "success" | "error";
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (utils.isBlank(title) || utils.isBlank(content)) {
      setToast({ message: "Title and content are required.", type: "error" });
      return;
    }

    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
      setToast({ message: "You must be logged in.", type: "error" });
      return;
    }

    try {
      await createBlog(title, content, user.email || "Unknown");
      setToast({ message: "Blog created successfully!", type: "success" });

      onSuccess();

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setToast({ message: err.message, type: "error" });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 rounded-lg">
      <h1 className="text-xl font-bold mb-2">Create a new story</h1>
      <p className="text-sm text-gray-600 mb-4">
        Write something you want to share with others.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your story title"
            className="border rounded-md p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Content</label>
          <textarea
            value={content}
            placeholder="Write your story here"
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
            Publish
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

export default CreateBlog;
