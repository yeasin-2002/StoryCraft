import { BlogWrapper, Footer, Hero } from "./_home";

interface pageProps {}

const Home = ({}: pageProps) => {
  return (
    <div className="space-y-10">
      <Hero />
      <BlogWrapper />
      <Footer />
    </div>
  );
};

export default Home;
