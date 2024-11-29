// components/SalonCard.jsx
import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

function SalonCard({ title, description, imageUrl, buttonText }) {
  return (
    <Card sx={{ maxWidth: 450, mb: 4 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={imageUrl} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small">{buttonText}</Button>
      </CardActions>
    </Card>
  );
}

export default SalonCard;

