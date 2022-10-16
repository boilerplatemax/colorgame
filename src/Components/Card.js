import React from 'react'

export default function Card(props) {
const {card, BACK_IMG, clickHandler}=props
  return (
    <div
        className={`match-game__card ${card.solved&&'match-game__card-solved'}`}
        onClick={()=>clickHandler(card)}>
        {card.visible?<div className='match-game__card-front'>
            <img className='match-game__img' src={card.src} alt={card.id}/>
        </div>:
        <div className='match-game__card-back'>
            <img className='match-game__card-back-img' src={BACK_IMG} alt={card.id}/>
        </div>}
    </div>
  )
}
