import { useState, useEffect } from "react";
import Page from "../components/layout/Page";
import { getBlogs, updateBlog, deleteBlog } from "../services/blogService";
import utils from "../utils/validators"


type Props = {
    blogId: string;
    onClose: ()=> void;
    onSuccess: ()=> void;
};

const EditBlog = ({ blogId, onClose, onSuccess } : Props ) => {
    const [title, setTitle]= useState("");
    const [content, setContent] = useState("");

    useEffect(() => {

        const load = async ()=> {
            const blogs = await getBlogs();
            const blog = blogs.find((b: any) => b.id === blogId);
        
        
        if (!blog){
            alert("Blog not found")
            return;
        }

        setTitle(blog.title);
        setContent(blog.content);

        // alert("Blog successfully edited.")
    }
    load();
    }, [blogId]);

    
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (utils.isBlank(title) || utils.isBlank(content)) {
        alert("Title and content are required.");
        return;
    }

    try {
        await updateBlog( blogId, title, content );
        onSuccess();
        onClose();
        alert("Blog updated!");
    } catch (err: any) {
        alert(err.message);
    }
    };

    return (

        <Page>
        <h1> Update Your Blog </h1>
        <p>update your story and save the changes. </p>

        <form onSubmit = {handleSubmit} >
            <div>
                <label> Title </label>
                <input 
                type = "text"
                value = {title}
                onChange={(e) => setTitle(e.target.value)}          />
            </div>

            <div>
                <label> Content </label>
                    <textarea
                    value = {content}
                    onChange={(e) => setContent(e.target.value)}
                    />
                
            </div>

            <button type = "submit" > Save changes </button>
            <button type = "button" onClick={close}> Cancel </button>
             
        </form>
        </Page>
    )
}

export default EditBlog;