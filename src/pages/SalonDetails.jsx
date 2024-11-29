import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, Card, CardContent } from '@mui/material';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

const SalonDetails = () => {
  const { id } = useParams(); // Getting the salon ID from the URL
  const [salon, setSalon] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch salon details by ID
    Axios.get(`http://localhost:5000/api/salons/${id}`)
      .then((response) => {
        setSalon(response.data.salon);
        setServices(response.data.services);
        setReviews(response.data.reviews);
      })
      .catch((error) => console.error('Error fetching salon details:', error));
  }, [id]);

  return (
    <Box sx={{ padding: 3 }}>
      {salon ? (
        <>
          <Typography variant="h4" gutterBottom>
            {salon.name}
          </Typography>
          <img src={salon.imageUrl} alt={salon.name} style={{ width: '100%', height: 'auto' }} />

          <Typography variant="body1" sx={{ mt: 2 }}>
            {salon.description}
          </Typography>

          {/* Services Offered */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Services Offered
            </Typography>
            <Grid container spacing={3}>
              {services.map((service) => (
                <Grid item xs={12} sm={6} md={4} key={service.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{service.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${service.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Customer Reviews */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Customer Reviews
            </Typography>
            {reviews.map((review, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body1">{review.comment}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {review.rating} Stars
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Booking Button */}
          <Button variant="contained" color="primary" sx={{ mt: 4 }}>
            Book Now
          </Button>
        </>
      ) : (
        <Typography variant="h6">Loading salon details...</Typography>
      )}
    </Box>
  );
};

export default SalonDetails;
