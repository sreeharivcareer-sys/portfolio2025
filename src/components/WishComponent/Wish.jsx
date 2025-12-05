import React from 'react'
import './Wish.scss';

export const Wish = ({blackWish}) => {
  return (
    <div className={blackWish ? 'wish-text black' : 'wish-text'}>Hi, GoodMorning!</div>
  )
}
