import React from 'react';
import Rectangle from '../Rectangle/Rectangle.js';


const rectList = (props) => {
    const rectList = props.rectList;

    if (!Array.isArray(rectList)) return null;

    return rectList.map(
      (rect, indx) => <Rectangle
                        key={rect.id}
                        {...rect}
                        onItemClick={() => props.onRemoveItem(indx)} />
    );
};

export default rectList;
