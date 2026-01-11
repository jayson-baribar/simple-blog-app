import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { getBlogs, deleteBlog } from "../services/blogService";
import Page from "../components/layout/Page";
import CreateBlog from "./CreateBlog";
import EditBlog from "./EditBlog";
import Toast from "../components/Toast";

const PAGE_SIZE = 5;

const Profile = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const load = async () => {
    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) return;

    setEmail(user.email || "");

    const allBlogs = await getBlogs();
    const myBlogs = allBlogs.filter(
      (b: any) => b.author === user.email
    );

    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    setBlogs(myBlogs.slice(start, end));
    setHasNext(end < myBlogs.length);
  };

  useEffect(() => {
    load();
  }, [page]);

  const handleDelete = async () => {
    if (!deleteId) return;

    await deleteBlog(deleteId);
    setToast({ message: "Blog deleted", type: "success" });

    setDeleteId(null);
    load();
  };

  return (
    <Page>
      <div className="min-h-screen bg-gray-100 px-4 py-6 overflow-x-hidden">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold break-words">
            {email}'s Dashboard
          </h1>
        </div>

        {/* Create Button */}
        <button
          onClick={() => setShowCreate(true)}
          className="w-full bg-blue-600 text-white py-2 rounded-md mb-6"
        >
          + Create Story
        </button>

        {/* Blog List */}
        <div className="flex flex-col gap-4">
          {blogs.map((blog) => (
            <article key={blog.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold break-words">
                {blog.title}
              </h3>

              <p className="text-gray-700 mt-2 break-words">
                {blog.content}
              </p>

              <div className="flex gap-2 mt-4 lg:justify-start">
                <button
                  onClick={() => setEditingId(blog.id)}
                  className="flex-1 lg:flex-none lg:w-24 bg-yellow-500 text-white py-1.5 rounded-md"
                >
                  Edit
                </button>

                <button
                  onClick={() => setDeleteId(blog.id)}
                  className="flex-1 lg:flex-none lg:w-24 bg-red-600 text-white py-1.5 rounded-md"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Create Modal */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white w-full max-w-md p-4 rounded-lg">
              <CreateBlog
                onClose={() => setShowCreate(false)}
                onSuccess={load}
              />
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white w-full max-w-md p-4 rounded-lg">
              <EditBlog
                blogId={editingId}
                onClose={() => setEditingId(null)}
                onSuccess={load}
              />
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white w-full max-w-sm p-4 rounded-lg text-center">
              <h2 className="text-lg font-bold mb-2">Delete Blog?</h2>
              <p className="text-sm text-gray-600 mb-4">
                This action cannot be undone.
              </p>

              <div className="flex gap-2">
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 text-white py-2 rounded-md"
                >
                  Delete
                </button>

                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 bg-gray-300 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

    </Page>
  );
};

export default Profile;
