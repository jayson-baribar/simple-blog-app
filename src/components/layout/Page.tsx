interface PageProps{
    children: React.ReactNode;
}

const Page = ({ children } : PageProps) => {
    return <main style = {{ padding: "1rem" }} > {children} </main>
};

export default Page;