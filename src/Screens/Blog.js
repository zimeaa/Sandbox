import TitleCard from '../Components/Cards/TitleCard';
import MessageBroker from '../Components/MessageBroker/MessageBroker';

function Blog() {
  return (
    <>
      <TitleCard 
        title="Blog" 
        description="Message Broker testing App front"
      />
      <MessageBroker />
    </>
  );
}

export default Blog;