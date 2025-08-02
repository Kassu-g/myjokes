import { useState } from 'react';

export interface IJoke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

export const useJokes = () => {
  const [savedJokes, setSavedJokes] = useState<IJoke[]>([]);

  const addJoke = (joke: IJoke): boolean => {
    let added = false;
    setSavedJokes((prevJokes) => {
      if (prevJokes.some((j) => j.id === joke.id)) {
        return prevJokes;
      }
      added = true;
      return [...prevJokes, joke];
    });
    return added;
  };

  return { savedJokes, addJoke };
};
