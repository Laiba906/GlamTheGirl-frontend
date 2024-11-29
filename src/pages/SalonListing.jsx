import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SalonListing = () => {
  const [salons, setSalons] = useState([]);
  const navigate = useNavigate();  // For navigation to details page

  // Fetch salon data
  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/getAllSalons');
        setSalons(response.data);
      } catch (error) {
        console.error('Error fetching salons:', error);
      }
    };

    fetchSalons();
  }, []);

  // Handle the "Book Now" button click
  const handleBookNow = (salonId) => {
    navigate(`/salon/${salonId}`);  // Navigate to the salon details page
  };

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {salons.map((salon) => (
        <Grid item xs={12} sm={6} md={4} key={salon._id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://images.squarespace-cdn.com/content/v1/5b8e935f4611a044775f2688/1540830530678-6XCVW3GG8PBKBX08VME9/beauty-salon-best-wall-color.jpg?format=1500w"
              title={salon.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {salon.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Address: {salon.address}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Contact: {salon.contactNumber}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => handleBookNow(salon._id)}  // Pass the salonId
              >
                Book Now
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SalonListing;
