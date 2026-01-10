import NavBar  from "../NavBar"

interface PageProps{
    children: React.ReactNode;
}

const Page = ({ children } : PageProps) => {
    return (
        <>
        <NavBar/>
        <main style = {{ padding: "1rem" }} > 
        {children} </main>
        </>
    )
};

export default Page;