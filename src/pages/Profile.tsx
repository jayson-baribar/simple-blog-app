import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { getBlogs, deleteBlog } from "../services/blogService";
import Page from "../components/layout/Page";
import CreateBlog from "./CreateBlog";
import EditBlog from "./EditBlog";

const Profile = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) return;

    setEmail(user.email || "");

    const allBlogs = await getBlogs();
    const myBlogs = allBlogs.filter(
      (b: any) => b.author === user.email
    );

    setBlogs(myBlogs);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Page>
      <h1>{email}'s Dashboard</h1>

      <button onClick={() => setShowCreate(true)}>
        + Create Story
      </button>

      {blogs.map((blog) => (
        <article
          key={blog.id}
          style={{ borderBottom: "1px solid #ccc", padding: "1rem 0" }}
        >
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>

          <button onClick={() => setEditingId(blog.id)}>Edit</button>
          <button
            style={{ marginLeft: "0.5rem" }}
            onClick={() => handleDelete(blog.id)}
          >
            Delete
          </button>
        </article>
      ))}

      {showCreate && (
        <div className="modal">
          <CreateBlog
            onClose={() => setShowCreate(false)}
            onSuccess={load}
          />
        </div>
      )}

      {editingId && (
        <div className="modal">
          <EditBlog
            blogId={editingId}
            onClose={() => setEditingId(null)}
            onSuccess={load}
          />
        </div>
      )}
    </Page>
  );
};

export default Profile;
