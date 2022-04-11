import { useState, useEffect } from "react";
import { api } from "../services/api";
import { GenreResponseProps } from "../App";

import { Button } from './Button'

interface SideBarProps {
  selectedGenreId: number;
  handleClick: Function; // recebe a função handleClickButton (que recebe number e retorna void)
}

export function SideBar({selectedGenreId, handleClick}: SideBarProps) {
  // Complete aqui

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClick(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  );
}