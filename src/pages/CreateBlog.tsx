import { useState } from "react";
import Page from "../components/layout/Page";
import { createBlog } from "../services/blogService";
import utils from "../utils/validators";
import { supabase } from "../lib/supabase";


type Props = {
  onClose: ()=> void;
  onSuccess: ()=> void;
};

const CreateBlog = ( { onClose, onSuccess } : Props ) => {

    const [title, setTitle]= useState("");
    const [content, setContent] = useState("");


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (utils.isBlank(title) || utils.isBlank(content)) {
    alert("Title and content are required.");
    return;
  }

  const { data } = await supabase.auth.getUser() ;
  const user = data.user;

  if (!user){
    alert( "You must be logged in ");
    return;
  }

  try {
    await createBlog( title, content, user.email || "Unknown" );
    alert("Blog created!");
    onSuccess();
    onClose();
  } catch (err: any) {
    alert(err.message);
  }
};

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