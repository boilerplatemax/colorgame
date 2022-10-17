import React,{useState, useEffect, useRef} from 'react'
import { v4 as uuidv4 } from 'uuid';
import Card from './Card';
import gameData from '../data/matchgamedata.json'
//https://cdn2.thecatapi.com/images/a3.jpg
//https://cdn2.thecatapi.com/images/C0YfrgcOD.jpg
const data =gameData

export default function MatchGame() {
const BACK_IMG='https://i.etsystatic.com/7867651/r/il/d1ac8a/2083985616/il_794xN.2083985616_ou94.jpg'

const shuffledArray = [
    //populate array with twice the data and assign random ids
    ...data.map(item=>[{...item, id:uuidv4()}][0]),
    ...data.map(item=>[{...item, id:uuidv4()}][0])]
    .sort(()=>.5-Math.random())

const [cardArray, setCardArray]=useState(shuffledArray)
//I decided to handle onClick function in a useEffect for cleanliness
const cardArrayRef = useRef([])

const [guess, setGuess] = useState([])

const [canClick, setCanClick] = useState(true)

const [moves, setMoves] = useState(0)

const [selectedId, setSelectedId] = useState('')

const [bestMoves, setBestMoves] = useState(0)

const [gameOver, setGameOver]=useState(false)

//show all cards when game is over
useEffect(()=>{
setCardArray(c=>c.map(item=>[{...item, visible:false}][0]))
},[gameOver])

//ref update
useEffect(()=>{
cardArrayRef.current=cardArray
},[cardArray])

useEffect(()=>{
    //no need to run logic if user has not made 2 guesses yet
    if(guess.length!==2)return
    //add a move every other click
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
        //checks if all cards are solved
        const isGameOver = arr.every(value => value.solved === true)
        if(isGameOver){
            setGameOver(true)
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
    if(gameOver)if(bestMoves>moves||bestMoves===0)setBestMoves(moves)
},[gameOver,bestMoves,moves])

const clickHandler=(card)=>{
    //no need to reveal the card if the user already sees it
    if(card.visible)return
    if(canClick===false)return
    //show card to user
    const newArray=cardArray
    newArray.filter(item=>item.id===card.id)[0].visible=true
    setCardArray([...newArray])
    //set guess which triggers use effect
    setGuess([...guess, card.name])
    //setSelectedId
    setSelectedId(card.id)
}

const resetGame=()=>{
    setGuess([])
    setCardArray(shuffledArray)
    //set to false because game is no longer over
    setGameOver(false)
    setMoves(0)
    
}
  return (
    <div className='match-game'>
        <div className='match-game__header'>
            <div className='match-game__header-title'><h3>Matching Game</h3></div>
            <div className='match-game__header-moves'><h3>Moves: {moves}</h3><h3>Best: {bestMoves}</h3></div>
        </div>
        
        {
        gameOver===false?
        <div className='match-game__card-container'>
            {cardArray&&cardArray.map((card)=>{
                return(  
                <div
                key={uuidv4()}
                onClick={()=>clickHandler(card)}>
                    <Card card={card} clickHandler={clickHandler} selectedId={selectedId} BACK_IMG={BACK_IMG}/>
                </div>
                
                )
            })}
        </div>:

        <>
            <div className='match-game__card-container'>
            {cardArray&&cardArray.map((card, index)=>{
                return(
                    
                    <div className='match-game__card'
                    style={{backgroundImage:`url(${card.src})`}}>
                        
                    </div>
                
                )
            })}
            </div>
            <button onClick={resetGame} className='match-game__try-again-btn'>Try again</button>
        </>
        }
    </div>
  )
}


                
