import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'; 

const CustomCard = ({ title, description, buttonText, onButtonClick }) => {
  return (
    <Box flexDirection={'row'} display="flex">
    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', color: 'gray' }}>
        <DragIndicatorIcon />
      </Box>
    <Card sx={{ width:"100%", borderRadius: 4, boxShadow: 3, display: 'flex', alignItems: 'center' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={onButtonClick}
            sx={{ borderRadius: 2 }}
          >
            {buttonText}
          </Button>
        </Box>
      </CardContent>
    </Card>
    </Box>
  );
};

export default CustomCard;
