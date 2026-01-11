import { supabase } from "../lib/supabase";

const createBlog = async (
    title: string,
    content: string,
    author: string
) =>{
    const { data, error } = await supabase
    .from("blogs")
    .insert([{ title, content, author }])
    .select()
    .single();

    if ( error ) throw error;
    return data;
};

const getBlogsPaginated = async ( start: number, end: number ) => {

    const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false })
    .range(start, end)

    if (error) throw error;
    return data;

}


const deleteBlog = async (id: string)=>{
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) throw error;
};

const getBlogs = async() => {
    
    const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false })
    if ( error ) throw error;{
        return data;
    };
}


const updateBlog = async (

  id: string,
  title: string,
  content: string
) => {
  const { data, error } = await supabase
    .from("blogs")
    .update({ title, content})
    .eq("id", id)
    .select()
    .single()

  if (error) throw error;
  return data;

};

export {
    createBlog,
    deleteBlog,
    updateBlog,
    getBlogs,
    getBlogsPaginated
};