import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'; // Import Link
import '../styles/NavBar.css';  // Import your CSS file

function Navbar({ handleDrawerToggle, activeTab }) {
  return (
    <AppBar 
      position="fixed" 
      className="appBar" // Apply the CSS class
      sx={{ zIndex: 1201, width: { sm: `calc(100% - 240px)` }, ml: { sm: '240px' } }}
    >
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Glam The Girl
        </Typography>

        {/* Conditional rendering based on activeTab */}
        {activeTab === 0 ? (  // User Panel
          <>
            <Button color="inherit" component={Link} to="/signup/user">User Signup</Button>
            <Button color="inherit" component={Link} to="/login/user">User Login</Button>
          </>
        ) : (  // Salon Panel
          <>
            <Button color="inherit" component={Link} to="/signup/salon">Salon Signup</Button>
            <Button color="inherit" component={Link} to="/login/salon">Salon Login</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
