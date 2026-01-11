import NavBar from "../NavBar";

interface PageProps {
  children: React.ReactNode;
}

const Page = ({ children }: PageProps) => {
  return (
    <>
      <NavBar />
      <main className="p-4 overflow-x-hidden">
        {children}
      </main>
    </>
  );
};

export default Page;
