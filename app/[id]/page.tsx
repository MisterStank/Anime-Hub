"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Anime {
  name: string;
  episodes: number;
  episodes_aired: number;
  score: string;
  image: {
    original: string;
    preview: string;
  };
  kind: string;
}

function AnimeDetail({ params }: { params: { id: number } }) {
  const [anime, setAnime] = useState<Anime | null>(null);

  const fetchAnimeById = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`https://shikimori.one/api/animes/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch anime");
      }
      const data = await response.json();
      setAnime({
        name: data.name,
        episodes: data.episodes,
        episodes_aired: data.episodes_aired,
        score: data.score,
        image: data.image,
        kind: data.kind,
      });
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  };

  useEffect(() => {
    fetchAnimeById(params.id);
  }, []);

  if (!anime) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center h-[89dvh]">
      <div className="relative w-[225px] h-[320px]">
        <Image
          src={`https://shikimori.one${anime.image.original}`}
          alt={anime.name}
          fill
          className="rounded-xl"
        />
      </div>
      <h1 className="font-semibold text-xl">{anime.name}</h1>
      <div className="py-1 px-2 bg-[#161921] rounded-sm">
        <p className="text-white text-sm font-bold capitalize">{anime.kind}</p>
      </div>
      <p>Episode: {anime.episodes || anime.episodes_aired}</p>
      <p>Score: {anime.score}</p>
    </div>
  );
}

export default AnimeDetail;
