import { BlogWrapper, Hero } from "./_home";

interface pageProps {}

const Home = ({}: pageProps) => {
  return (
    <div>
      <Hero />
      <BlogWrapper />
    </div>
  );
};

export default Home;
