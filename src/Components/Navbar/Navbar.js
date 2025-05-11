import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Box, InputBase } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: '#282c34',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid rgba(122, 122, 122, 0.1)',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
        padding: '8px 16px',
        width: '100%',
        boxSizing: 'border-box',
        height: '70px',
      }}
    >
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <IconButton style={{ padding: '5px' }}>
            <HomeIcon fontSize="medium" style={{ color: 'white' }} />
          </IconButton>
        </Link>
      </div>

      <div style={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            backgroundColor: '#343A46',
            borderRadius: '20px',
            padding: '4px 8px',
            width: '45%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton type="button" sx={{ p: '8px', color: 'white' }} aria-label="search">
            <SearchIcon fontSize="small" />
          </IconButton>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              color: 'white',
              fontSize: '16px',
            }}
            placeholder="Search"
          />
        </Box>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '30px', fontSize: '18px', color: 'white' }}>
        <Link to="/scroller" style={{ textDecoration: 'none', color: 'white' }}>
          Scroller
        </Link>
        <Link to="/blog" style={{ textDecoration: 'none', color: 'white' }}>
          Blog
        </Link>
        <Link to="/community" style={{ textDecoration: 'none', color: 'white' }}>
          Community
        </Link>
        <Link to="/dev" style={{ textDecoration: 'none' }}>
          <IconButton style={{ padding: '5px' }}>
            <DeveloperModeIcon fontSize="medium" style={{ color: 'white' }} />
          </IconButton>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
