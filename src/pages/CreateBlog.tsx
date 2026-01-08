import { useState } from "react";
import Page from "../components/layout/Page";


const CreateBlog = () => {

    const [title, setTitle]= useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e:React.FormEvent)=>{

        e.preventDefault();

        if (!title || !content){
            alert(" Title and content are required. ")
            return;
        }   

        console.log("New blog created: ", {
            title,
            content
        });

        alert ("Blog successfully created!")
        setTitle("");
        setContent("");
    }


    return (

        <Page>
        <h1> Create a new story! </h1>
        <p> Write something you want to share with others. </p>

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

export default CreateBlog;