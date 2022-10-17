import React from 'react'

export default function Card(props) {
const {card, BACK_IMG, clickHandler, selectedId}=props

  return (
    <div
      className={
        `match-game__card
        ${card.solved&&' match-game__card-solved'}
        ${card.visible&&selectedId===card.id&&' match-game__card-flip'}`
      }
      onClick={()=>clickHandler(card)}
      style={{backgroundImage:`url(${card.src})`}}
      >
      {!card.visible&&
        <div className='match-game__card-back'>
            <img className='match-game__card-back-img' src={BACK_IMG} alt={card.id}/>
        </div>}
    </div>
  )
}
