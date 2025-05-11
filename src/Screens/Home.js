import React from 'react';
import TracerFlow from '../Components/TracerFlow/TracerFlow';
import TitleCard from '../Components/Cards/TitleCard';

function Home(props) {
  return (
    <>
      <TitleCard 
        title="Tracer Flow" 
        description="Visualize the flow of trace-ids through your system. This is a simple example of how to use React Flow to create a tracer flow diagram."
        />
    <TracerFlow/>
    </>
  );
}

export default Home;