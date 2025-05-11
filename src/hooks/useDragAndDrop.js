import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useDragAndDrop = (data, updateAction, orderProperty) => {
  const dispatch = useDispatch();
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const updatedData = [...data];
    const [draggedItem] = updatedData.splice(draggedIndex, 1); 
    updatedData.splice(dropIndex, 0, draggedItem); 

    const reorderedData = updatedData.map((item, index) => ({
        ...item,
        [orderProperty]: index,
      }));
      

    dispatch(updateAction(reorderedData));

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return {
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};

export default useDragAndDrop;