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
    if (savedJokes.some((j) => j.id === joke.id)) {
      return false;
    }
    setSavedJokes([...savedJokes, joke]);
    return true;
  };

  return { savedJokes, addJoke };
};
