import React, { useState } from 'react';
import { useDrag, DragPreviewImage } from 'react-dnd';

const Piece = ({ piece: { type, color }, position }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: 'piece',
    item: { id: `${position}_${type}_${color}` },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const image = require(`../assets/images/${type}_${color}.png`);

   
  
  return (
    <>
      <DragPreviewImage connect={preview} src={image} />
      <div
        className='piece-container piece-design'
        ref={drag}
        style={{ opacity: isDragging ? 0 : 1 }}
      ><div>
        <img   className='piece' src={image}  alt={`${type} ${color} piece`} /></div>
      </div>
    </>
  );
};

export default Piece;
