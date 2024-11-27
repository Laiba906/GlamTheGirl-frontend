// components/Footer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: '#d1918c', color: '#ffffff', padding: '20px', textAlign: 'center' }}>
      <Typography variant="body2">© 2024 Glam The Girl. All Rights Reserved.</Typography>
      <Typography variant="body2">Follow us on: Facebook | Instagram | Twitter</Typography>
    </Box>
  );
}

export default Footer;
