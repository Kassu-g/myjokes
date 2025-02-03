import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { IJoke } from '../hooks/UseJokes';

interface SavedPageProps {
  savedJokes: IJoke[];
}

const SavedPage: React.FC<SavedPageProps> = ({ savedJokes }) => {
  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom>
        Saved Jokes
      </Typography>
      {savedJokes.length === 0 ? (
        <Typography variant="body1">No jokes saved yet.</Typography>
      ) : (
        savedJokes.map((joke) => (
          <Card sx={{ marginTop: '16px' }} key={joke.id}>
            <CardContent>
              <Typography variant="h6">{joke.setup}</Typography>
              <Typography variant="body2" color="text.secondary">
                {joke.punchline}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default SavedPage;
