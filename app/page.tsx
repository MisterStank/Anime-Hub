import AnimeCard, { AnimeProp } from "@/components/AnimeCard";
import LoadMore from "../components/LoadMore";
import { fetchAnime } from "./action";
import Hero from "@/components/Hero";

async function Home() {
  const data = await fetchAnime(1);
  return (
    <main className="sm:p-2 py-2 px-8 flex flex-col gap-10">
      <Hero />
      <h2 className="text-3xl text-white font-bold">Explore Anime</h2>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <LoadMore />
    </main>
  );
}

export default Home;
