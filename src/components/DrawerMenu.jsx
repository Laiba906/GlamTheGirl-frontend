// components/DrawerMenu.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';

const drawerWidth = 240;

function DrawerMenu({ isDrawerOpen, handleDrawerToggle }) {
  return (
    <Drawer
      variant="temporary"
      open={isDrawerOpen} // Drawer will open/close based on this state
      onClose={handleDrawerToggle} // Close the drawer on clicking outside
      sx={{
        display: 'block', // Always show the drawer (remove xs: 'block', sm: 'none' if you want it on all screens)
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#d1918c', color: '#ffffff' },
      }}
    >
      <Toolbar />
      <List>
        {['Hair', 'Make up', 'Skin', 'Body', 'Nails'].map((text) => (
          <ListItem button key={text} onClick={handleDrawerToggle}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default DrawerMenu;
