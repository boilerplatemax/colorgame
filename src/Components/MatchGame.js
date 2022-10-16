import React,{useState, useEffect, useRef} from 'react'
import {Animated} from "react-animated-css";
import { v4 as uuidv4 } from 'uuid';
import Card from './Card';
//https://cdn2.thecatapi.com/images/a3.jpg
//https://cdn2.thecatapi.com/images/C0YfrgcOD.jpg
const data =[
    {
        id:uuidv4(),
        name:'card1',
        src:'https://cdn2.thecatapi.com/images/ab3.jpg',
        visible:false,
        solved:false
    },
    {
        id:uuidv4(),
        name:'card2',
        src:'https://cdn2.thecatapi.com/images/ce1.jpg',
        visible:false,
        solved:false
    },
    {
        id:uuidv4(),
        name:'card3',
        src:'https://cdn2.thecatapi.com/images/4rn.jpg',
        visible:false,
        solved:false
    },
    {
        id:uuidv4(),
        name:'card4',
        src:'https://cdn2.thecatapi.com/images/2a5.jpg',
        visible:false,
        solved:false
    },
    {
        id:uuidv4(),
        name:'card5',
        src:'https://cdn2.thecatapi.com/images/6an.jpg',
        visible:false,
        solved:false
    },
    {
        id:uuidv4(),
        name:'card6',
        src:'https://cdn2.thecatapi.com/images/MTk5NDY0MQ.jpg',
        visible:false,
        solved:false
    },
    {
        id:uuidv4(),
        name:'card7',
        src:'https://cdn2.thecatapi.com/images/3r1.jpg',
        visible:false,
        solved:false
    },
    {
        id:uuidv4(),
        name:'card8',
        src:'https://cdn2.thecatapi.com/images/wiFvbArkQ.jpg',
        visible:false,
        solved:false
    }
    
]
const BACK_IMG='https://i.etsystatic.com/7867651/r/il/d1ac8a/2083985616/il_794xN.2083985616_ou94.jpg'
export default function MatchGame() {
const shuffledArray = [...data,...data.map(item=>[{...item, id:uuidv4()}][0])].sort(()=>.5-Math.random())

const [cardArray, setCardArray]=useState(shuffledArray)

const cardArrayRef = useRef([])

const [guess, setGuess] = useState([])

const [canClick, setCanClick] = useState(true)

const [moves, setMoves] = useState(0)

const [bestMoves, setBestMoves] = useState(0)

const [gameOver, setGameOver]=useState(false)


useEffect(()=>{
setCardArray(c=>c.map(item=>[{...item, visible:false}][0]))
},[gameOver])

useEffect(()=>{
cardArrayRef.current=cardArray
},[cardArray])

useEffect(()=>{
    if(guess.length!==2)return
    if(guess.length%1===0)setMoves(prev=>prev+1)
    setCanClick(false)
    const arr = cardArrayRef.current
    const checkGuess = () =>{

        const correctAnswer=guess[0]
        console.log('matched!')
        arr.filter(item=>item.name===correctAnswer)[0].solved=true
        arr.filter(item=>item.name===correctAnswer)[1].solved=true
        setCardArray([...arr])
    }
    const flipAllCards = () =>{
        
        setCardArray(arr.map(item=>[{...item, visible:false}][0]))

    }
    
    const checkGameOver = () =>{
        const noMoreCards = arr.every(value => value.solved === true)
        if(noMoreCards){
            setGameOver(noMoreCards)
        }
    }
    
    setTimeout(
        ()=>{
            flipAllCards()
            if(guess[0]===guess[1]){
                checkGuess()
                checkGameOver()
            }
            
            setGuess([])
            setCanClick(true)
        },750
    )
    
},[guess,cardArrayRef])

useEffect(()=>{
    if(gameOver)if(bestMoves>moves||bestMoves===0)setBestMoves(moves+1)
},[gameOver,bestMoves,moves])

const clickHandler=(card)=>{
    if(card.visible)return
    if(canClick===false)return

    //flip card
    const newArray=cardArray
    newArray.filter(item=>item.id===card.id)[0].visible=true
    setCardArray([...newArray])
    //is solved
    setGuess([...guess, card.name])
}

const resetGame=()=>{
    setGuess([])
    setCardArray(shuffledArray)
    setGameOver(false)
    setMoves(0)
    
}
  return (
    <div className='match-game'>
    
        <div className='match-game__header'>
            <div className='match-game__header-title'><h3>Matching Game</h3></div>
            <div className='match-game__header-moves'><h3>Moves: {moves}</h3></div>
            <div className='match-game__header-moves'><h3>Best: {bestMoves}</h3></div>
        </div>
        
        {
        gameOver===false?
        <div className='match-game__card-container'>
            {cardArray&&cardArray.map((card)=>{
                return(
                
                <div
                key={uuidv4()}

                onClick={()=>clickHandler(card)}>

                    <Card card={card} clickHandler={clickHandler} BACK_IMG={BACK_IMG} />
      
                </div>
                
                )
            })}
        </div>:

        <>
            <div className='match-game__card-container'>
            {cardArray&&cardArray.map((card, index)=>{
                return(
                    
                <Animated animationIn="fadeIn" animateOnMount isVisible={true} animationInDelay={index*50} key={uuidv4()}>
                <div className='match-game__card match-game__card-game-over'>
                    <div className='match-game__card-front'>
                        <img className='match-game__img' src={card.src} alt={card.id}/>
                    </div>
                </div>
                </Animated>
                
                )
            })}
            </div>
            <button onClick={resetGame} className='match-game__try-again-btn'>Try again</button>
        </>
        }
    </div>
  )
}


                
