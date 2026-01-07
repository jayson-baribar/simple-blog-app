import Page from "../components/layout/Page";
import { mockBlogs } from "../data/mockBlogs";

const Blogs = () => {

    return (

        <Page>

            <section style ={{ marginBottom: "2rem" }}> 
            <h1> Share your story! </h1>

            <p>
                A simple space to read and write short blog posts from random people.
            </p>

            <button style={{ marginTop: "1rem" }}>Start writing </button>
            <button style={{ marginTop: "1rem" }}>Start Reading </button>
            </section>

            {/* Blog List */}

            <section>
                <h2> Latest Stories </h2>
                {mockBlogs.map((blog)=>(
                    <article
                    
                    key = {blog.id}
                    style={{
                        padding: "1rem 0",
                        borderBottom: "1px solid white"
                    }}
                    >

                        <h3>
                            {blog.title}
                            <address style = {{ display: "inline", fontWeight: "normal", fontSize: "1rem"}}> 
                                -{blog.author}
                            </address>
                        </h3>

                        <p>{blog.preview}</p>
                        <small > {blog.createdAt} </small>

                    </article>
                ))}
            </section>
        </Page>
    )
}

export default Blogs;