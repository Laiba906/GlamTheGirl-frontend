import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, TextField, Slider, Button } from '@mui/material';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import SalonCard from '../components/SalonCard'; // This is the reusable card component

const SalonListing = () => {
  const [salons, setSalons] = useState([]);
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [ratings, setRatings] = useState([1, 5]);
  const [filteredSalons, setFilteredSalons] = useState([]);

  // Fetch salons from the API
  useEffect(() => {
    Axios.get('http://localhost:5000/api/salons')
      .then((response) => {
        setSalons(response.data);
        setFilteredSalons(response.data);
      })
      .catch((error) => console.error('Error fetching salons:', error));
  }, []);

  // Filter salons based on search criteria
  useEffect(() => {
    setFilteredSalons(
      salons.filter(
        (salon) =>
          salon.location.toLowerCase().includes(location.toLowerCase()) &&
          salon.price >= priceRange[0] &&
          salon.price <= priceRange[1] &&
          salon.rating >= ratings[0] &&
          salon.rating <= ratings[1]
      )
    );
  }, [location, priceRange, ratings, salons]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Salon Listings
      </Typography>

      {/* Filter Section */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Search by Location"
          variant="outlined"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          valueLabelFormat={(value) => `$${value}`}
          sx={{ mt: 2 }}
        />
        <Typography variant="body1">Price Range: ${priceRange[0]} - ${priceRange[1]}</Typography>
        <Slider
          value={ratings}
          onChange={(e, newValue) => setRatings(newValue)}
          valueLabelDisplay="auto"
          min={1}
          max={5}
          step={0.5}
          valueLabelFormat={(value) => `${value} Stars`}
          sx={{ mt: 2 }}
        />
        <Typography variant="body1">Ratings: {ratings[0]} - {ratings[1]} Stars</Typography>
      </Box>

      {/* Salon Cards Display */}
      <Grid container spacing={3}>
        {filteredSalons.map((salon) => (
          <Grid item xs={12} sm={6} md={4} key={salon.id}>
            <Link to={`/salons/${salon.id}`}>
              <SalonCard salon={salon} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SalonListing;
