/** @format */

import React from 'react';
import { Card, Skeleton } from 'antd';

// CSS
import './card.scss';

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card key={i}>
          <Skeleton active></Skeleton>
        </Card>
      );
    }

    return totalCards;
  };

  return <div className='card'>{cards()}</div>;
};

export default LoadingCard;
