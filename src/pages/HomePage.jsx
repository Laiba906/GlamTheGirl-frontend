import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Toolbar, Typography, Tab, Tabs, Grid, Card, CardContent, CardMedia, Button, Rating } from '@mui/material';
import Axios from 'axios'; // Axios for fetching data
import Navbar from '../components/Navbar';
import DrawerMenu from '../components/DrawerMenu';
import Footer from '../components/Footer';
import SalonCard from '../components/SalonCard'; // Import SalonCard to display in User Panel

function HomePage() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [salons, setSalons] = useState([]);
  const [activeTab, setActiveTab] = useState(0);  // 0 = User Panel, 1 = Salons Panel

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  useEffect(() => {
    // Fetching salons data from the backend
    Axios.get('http://localhost:5000/api/salons') // Your backend API
      .then((response) => setSalons(response.data))
      .catch((error) => console.error('Error fetching salons:', error));
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue); // Switching between User and Salons Panels
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      {/* Navbar with activeTab passed */}
      <Navbar handleDrawerToggle={handleDrawerToggle} activeTab={activeTab} />
      <DrawerMenu isDrawerOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: { sm: '240px' }, display: 'flex', flexDirection: 'column' }}>
        <Toolbar />

        {/* Tabs for User and Salons Panels */}
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="panel tabs" sx={{ marginBottom: '20px' }}>
          <Tab label="User Panel" />
          <Tab label="Salons Panel" />
        </Tabs>

        {/* User Panel Content */}
        {activeTab === 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#e43368' }}>THE BRIGHTER WAY TO LOOK BEAUTY</Typography>

            {/* Cards Section */}
            <div className="cards" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px', marginTop: '20px' }}>
              <SalonCard
                title="Make mani moments"
                description="Another season, another reason to book that hot mani-pedi slot."
                imageUrl="https://cdn1.treatwell.net/images/view/v2.i11003062.w1084.h384.x65769E68.png"
                buttonText="Book nails now"
              />
              <SalonCard
                title="Find your Top Rated faves"
                description="Top Rated is our annual award for salons that give 5-star treatment."
                imageUrl="https://cdn1.treatwell.net/images/view/v2.i11003384.w1085.h388.x9F7FC7B3.png"
                buttonText="Book the best salons"
              />
              <SalonCard
                title="Find your Aesthetic Solution"
                description="Aesthetic treatments improve appearance through non-surgical options like skin rejuvenation, injectables, body contouring, and laser hair removal."
                imageUrl="https://cdn1.treatwell.net/images/view/v2.i11028845.w680.h340.x34CCDF9D.png"
                buttonText="Aesthetic Solutions"
              />
            </div>
          </Box>
        )}

        {/* Salons Panel Content */}
        {activeTab === 1 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Salons Profile</Typography>

            {/* Display List of Salons */}
            <Grid container spacing={4}>
              {salons.map((salon) => (
                <Grid item xs={12} sm={6} md={4} key={salon._id}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={salon.imageUrl}
                      alt={salon.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {salon.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {salon.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={2}>
                        Address: {salon.address}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        Phone: {salon.contact.phone}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Email: {salon.contact.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        Working Hours: {Object.values(salon.workingHours).join(', ')}
                      </Typography>
                      <Rating name="read-only" value={salon.rating} readOnly />
                    </CardContent>
                    <Button size="small" color="primary">
                      Book Now
                    </Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default HomePage;
