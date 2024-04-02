"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Studio {
  id: number;
  name: string;
  filtered_name: string;
  real: boolean;
  image: string;
}

interface Video {
  id: number;
  url: string;
  image_url: string;
  player_url: string;
  name: string;
  kind: string;
  hosting: string;
}

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
  rating: string;
  status: string;
  studios: Studio[];
  videos: Video[];
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
        rating: data.rating,
        status: data.status,
        studios: data.studios,
        videos: data.videos,
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
    <div className="flex flex-col items-center h-[89dvh] pt-9 gap-y-5">
      <div className="flex flex-row gap-x-20">
        <div className="relative w-[225px] h-[320px]">
          <Image
            src={`https://shikimori.one${anime.image.original}`}
            alt={anime.name}
            fill
            className="rounded-xl"
          />
        </div>
        <iframe
          width="420"
          height="315"
          src={`${anime.videos[0].player_url}?autoplay=1&mute=1&loop=1`}
          allowFullScreen
          allow="autoplay"
          className="rounded-xl"
        ></iframe>
      </div>

      <div className="flex flex-row">
        <h1 className="font-semibold text-3xl">{anime.name}</h1>
        <div className="py-1 px-2 bg-[#161921] rounded-sm">
          <p className="text-white text-sm font-bold capitalize">
            {anime.kind}
          </p>
        </div>
      </div>
      <p>Studios: {anime.studios[0].name}</p>
      <p>Episodes: {anime.episodes || anime.episodes_aired}</p>
      <p>Rating: {anime.rating}</p>
      <p>Status: {anime.status}</p>
      <p>Score: {anime.score}</p>
    </div>
  );
}

export default AnimeDetail;
