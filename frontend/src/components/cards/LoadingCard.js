/** @format */

import React from 'react';
import { Card, Skeleton } from 'antd';

// CSS
import './card.scss';
import { camelCase } from 'lodash';

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];
    let cardWidth = 90 / count;
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card
          key={i}
          div
          className='loading__card'
          style={{ width: `${cardWidth}rem` }}
        >
          <Skeleton active></Skeleton>
        </Card>
      );
    }

    return totalCards;
  };

  return <div className='loading'>{cards()}</div>;
};

export default LoadingCard;
