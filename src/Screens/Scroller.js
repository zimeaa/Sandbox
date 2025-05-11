import React from 'react';
import TitleCard from '../Components/Cards/TitleCard';
import CardScroller from '../Components/CardScroller/CardScroller';

function Scroller() {
  return (
    <>
      <TitleCard 
        title="Card Scroller"
        description="Here you can find the card scroller component that is used in the app." 
        />
      <CardScroller />
    </>
  );
}

export default Scroller;