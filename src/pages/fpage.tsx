import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { IJoke } from '../hooks/UseJokes';

interface FrontPageProps {
  saveJoke?: (joke: IJoke) => boolean;
}

const FrontPage: React.FC<FrontPageProps> = ({ saveJoke }) => {
  const [joke, setJoke] = useState<IJoke | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    if (fetchTrigger === 0) return;

    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setJoke(null);

    fetch('https://official-joke-api.appspot.com/random_joke', { signal })
      .then((response) => response.json())
      .then((data: IJoke) => {
        setJoke(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Fetching joke failed', err);
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [fetchTrigger]);

  return (
    <div style={{ padding: '16px' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setFetchTrigger((prev) => prev + 1)}
      >
        Get a New Joke
      </Button>

      {loading && (
        <div style={{ marginTop: '16px' }}>
          <Typography variant="h6">Loading a joke...</Typography>
          <CircularProgress />
        </div>
      )}

      {joke && !loading && (
        <Card sx={{ marginTop: '16px' }} key={joke.id}>
          <CardContent>
            <Typography variant="h5" component="div">
              {joke.setup}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {joke.punchline}
            </Typography>
          </CardContent>
          {saveJoke && (
            <CardActions>
              <Button size="small" onClick={() => saveJoke(joke)}>
                Save Joke
              </Button>
            </CardActions>
          )}
        </Card>
      )}
    </div>
  );
};

export default FrontPage;
