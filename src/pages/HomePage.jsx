import React, { useState, useEffect } from 'react';
import {
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
} from '@mui/material';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import DrawerMenu from '../components/DrawerMenu';
import Footer from '../components/Footer';
import SalonCard from '../components/SalonCard';

function HomePage() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [salons, setSalons] = useState([]);
  const [aestheticSolutions, setAestheticSolutions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0); // 0 = User Panel, 1 = Salon Panel

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  // Fetching data for salons and aesthetic solutions
  useEffect(() => {
    Axios.get('http://localhost:5000/api/salons')
      .then((response) => setSalons(response.data))
      .catch((error) => console.error('Error fetching salons:', error));

    Axios.get('http://localhost:5000/api/aesthetic-solutions')
      .then((response) => setAestheticSolutions(response.data))
      .catch((error) => console.error('Error fetching aesthetic solutions:', error));
  }, []);

  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
    // Add your search filtering logic here
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue); // Switch between User and Salon Panels
  };

  // Handle click for Aesthetic Solutions
  const handleAestheticClick = (type) => {
    // Redirect or show modal with options based on the type
    if (type === 'skin') {
      // Navigate to skin-related page or handle it as per your needs
      console.log('Skin care selected');
    } else if (type === 'hair') {
      // Navigate to hair-related page or handle it as per your needs
      console.log('Hair treatment selected');
    } else if (type === 'nails') {
      // Navigate to nails-related page or handle it as per your needs
      console.log('Nail care selected');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} activeTab={activeTab} />
      <DrawerMenu isDrawerOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Find and Book the Best Salons
          </Typography>
          <TextField
            label="Search for services or salons"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: '60%', mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        {/* Tabs for User and Salon Panels */}
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="panel tabs" sx={{ mb: 3 }}>
          <Tab label="User Panel" />
          <Tab label="Salon Panel" />
        </Tabs>

        {/* User Panel Content */}
        {activeTab === 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#e43368', mb: 2 }}>
              Explore Beauty Services and Book Appointments
            </Typography>

            {/* Static Images for Hair, Nails, and Skincare */}
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
                Categories
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ maxWidth: 345, textAlign: 'center' }}>
                    <CardMedia
                      component="img"
                      height="180"
                      image="https://www.liveabout.com/thmb/IunVlV3tNLKbnrPqF4a3Ma60-Sc=/5115x3414/filters:fill(auto,1)/hairdresser-preparing-to-cut-customers-long-hair-in-salon-579980845-57bca9495f9b58cdfdacb68f.jpg"
                      alt="Hair Services"
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Hair Services
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Explore a range of hair services from cuts to coloring.
                      </Typography>
                      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ maxWidth: 345, textAlign: 'center' }}>
                    <CardMedia
                      component="img"
                      height="180"
                      image="https://www.a-gentle-touch.co.uk/wp-content/uploads/2020/09/Manicure-scaled.jpeg"
                      alt="Nail Services"
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Nail Services
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Treat yourself to a manicure, pedicure, or nail art.
                      </Typography>
                      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ maxWidth: 345, textAlign: 'center' }}>
                    <CardMedia
                      component="img"
                      height="180"
                      image="https://sirensbeautysalon-durham.com/wp-content/uploads/2021/05/skincare-services-1.jpg"
                      alt="Skincare Services"
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Skincare Services
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Pamper your skin with facials and treatments.
                      </Typography>
                      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {/* Aesthetic Solutions Section */}
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
                Aesthetic Solutions
              </Typography>

              {/* Options for users to click based on concerns */}
              <Grid container spacing={3} justifyContent="center">
                {/* Card with bold text as clickable option */}
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ maxWidth: 345, textAlign: 'center', cursor: 'pointer' }} onClick={() => handleAestheticClick('skin')}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Skin Care Solutions
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                        Click here for skin care treatments and recommendations based on your concerns.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ maxWidth: 345, textAlign: 'center', cursor: 'pointer' }} onClick={() => handleAestheticClick('hair')}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Hair Treatment Solutions
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                        Click here for personalized hair treatment solutions based on your needs.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ maxWidth: 345, textAlign: 'center', cursor: 'pointer' }} onClick={() => handleAestheticClick('nails')}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Nail Care Solutions
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                        Click here for nail care treatments and solutions.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}

         {/* Salon Panel Content */}
         {activeTab === 1 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#e43368', mb: 2 }}>
              Manage Your Salon Profile and Services
            </Typography>

            {/* Salon Management Section */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h6">Edit Profile</Typography>
                  <Button variant="outlined" sx={{ mt: 2 }} href="/salon/edit">
                    Edit Profile
                  </Button>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h6">Manage Services</Typography>
                  <Button variant="outlined" sx={{ mt: 2 }} href="/salon/services">
                    Edit Services
                  </Button>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h6">View Bookings</Typography>
                  <Button variant="outlined" sx={{ mt: 2 }} href="/salon/bookings">
                    View Bookings
                  </Button>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>

      <Footer />
    </Box>
  );
}

export default HomePage;
