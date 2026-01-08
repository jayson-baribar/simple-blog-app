import { useState, useEffect } from "react";
import Page from "../components/layout/Page";


const EditBlog = () => {

    const [title, setTitle]= useState("");
    const [content, setContent] = useState("");

    useEffect( ()=>{

        const existingBlog ={
            title: "My first blog",
            content: "Content of the blog"
        };

        setTitle(existingBlog.title);
        setContent(existingBlog.content);
    }, []);

    
    const handleSubmit = (e:React.FormEvent)=>{

        e.preventDefault();

        if (!title || !content){
            alert(" Title and content are required. ")
            return;
        }   

        console.log("Blog updated!: ", {
            title,
            content
        });

        alert ("Blog successfully updated!")
    }


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
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your story title"
          />
            </div>

            <div>
                <label> Content </label>
                    <textarea
                    value = {content}
                    placeholder="Write your story here "
                    onChange={(e) => setContent(e.target.value)}
                    />
                
            </div>

            <button type = "submit" > Publish </button>
        </form>
        </Page>
    )
}

export default EditBlog;