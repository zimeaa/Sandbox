import React from 'react';
import { Card, CardContent } from '@mui/material';

function TitleCard(props) {
    return (
        <Card sx={{ backgroundColor: "#1A1C22", color: "white" }}>
      <CardContent
        sx={{
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          fontSize: "20px",
        }}
      >
        <h1 className="leading-xl font-display text-primary dark:text-primary-dark font-semibold text-5xl lg:text-6xl -mt-4 mb-7 w-full max-w-3xl lg:max-w-xl">
         {props.title} 
        </h1>
        <p className="max-w-3xl mx-auto text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">
         {props.description}
        </p>
      </CardContent>
    </Card>
    );
}

export default TitleCard;