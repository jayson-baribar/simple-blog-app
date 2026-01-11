import { useState, useEffect } from "react";
import Page from "../components/layout/Page";
import { getBlogsPaginated } from "../services/blogService";

const PAGE_SIZE = 5;

const Blogs = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const loadBlogs = async () => {
    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE - 1;

    try {
      const data = await getBlogsPaginated(start, end);
      setBlogs(data);

      // If less than PAGE_SIZE, no more pages
      setHasNext(data.length === PAGE_SIZE);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, [page]);

  return (
    <Page>
      <div className="min-h-screen bg-gray-100 px-4 py-6">
        {/* Intro Section */}
        <section className="mb-2">
          <h1 className="text-6xl font-bold">Share your story!</h1>
          <p className="text-gray-600 mt-2">
            A simple space to read and write short blog posts from random people.
          </p>
          <p className="text-gray-600 font-bold pt-5">
            Register and start writing.
          </p>
        </section>

        {/* Blog List */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Latest Stories</h2>

          <div className="flex flex-col gap-4">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white p-4 rounded-lg shadow"
              >
                <h3 className="text-lg font-semibold">
                  {blog.title}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    – {blog.author}
                  </span>
                </h3>

                <p className="text-gray-700 mt-2">
                  {blog.content}
                </p>
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
        </section>
      </div>
    </Page>
  );
};

export default Blogs;
