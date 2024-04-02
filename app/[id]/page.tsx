"use client";
import React, { useEffect, useState } from "react";

interface Anime {
  name: string;
  episode: number;
  score: string;
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
        episode: data.episodes_aired,
        score: data.score,
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
    <div className="flex flex-col items-center">
      <h2>{anime.name}</h2>
      <p>Episode: {anime.episode}</p>
      <p>Score: {anime.score}</p>
    </div>
  );
}

export default AnimeDetail;
