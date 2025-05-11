import React, { useMemo, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import CustomCard from '../Cards/CustomCard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useSelector, useDispatch } from 'react-redux';
import { updateData } from '../../redux/Slicers/dataSlice';
import useDragAndDrop from '../../hooks/useDragAndDrop';

const CardScroller = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.items);

  // Memoize the sorted data to avoid unnecessary re-sorting on each render
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => a.order - b.order);
  }, [data]);

  // Declare the update handler once
  const handleUpdate = (updatedData) => dispatch(updateData(updatedData));

  const {
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useDragAndDrop(data, handleUpdate, 'order');

  // Optional: keep track of the dragged item to add visual feedback
  const [draggedIndex, setDraggedIndex] = useState(null);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        p: 1,
        gap: 1,
      }}
    >
      {sortedData.map((card, index) => (
        <div
          key={card.id}
          role="listitem"
          draggable
          onDragStart={(e) => {
            handleDragStart(e, index);
            setDraggedIndex(index);
          }}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => {
            handleDrop(e, index);
            setDraggedIndex(null);
          }}
          style={{
            borderRadius: '8px',
            border: dragOverIndex === index ? '2px dashed #3f51b5' : 'none',
            padding: dragOverIndex === index ? '8px' : '0',
            backgroundColor: dragOverIndex === index ? '#f0f0f0' : 'transparent',
            opacity: draggedIndex === index ? 0.5 : 1,
            transition: 'all 0.3s ease',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <IconButton
              variant="outlined"
              color="secondary"
              onClick={(e) => e.stopPropagation()}
              sx={{ mr: 1 }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
            <CustomCard
              title={card.title}
              description={card.description}
              buttonText="Click Me"
              onButtonClick={() => alert(`Card ${card.order + 1} clicked!`)}
            />
          </Box>
        </div>
      ))}
    </Box>
  );
};

export default CardScroller;
