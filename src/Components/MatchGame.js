import React,{useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';

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

export default function MatchGame() {
    const shuffledArray = [...data,...data.map(item=>[{...item, id:uuidv4()}][0])].sort(()=>.5-Math.random())

const [cardArray, setCardArray]=useState(shuffledArray)

const [guess, setGuess] = useState([])

const [canClick, setCanClick] = useState(true)

const [moves, setMoves] = useState(0)

const [bestMoves, setBestMoves] = useState(0)

const [gameOver, setGameOver]=useState(false)



useEffect(()=>{
    
//onmount our data array is double, given random ids and shuffled
setCardArray(shuffledArray)
const arr = cardArray
setCardArray(arr.map(item=>[{...item, visible:false}][0]))
},[gameOver])

useEffect(()=>{
    if(guess.length!=2)return
    if(guess.length%1===0)setMoves(prev=>prev+1)
    setCanClick(false)

    const checkGuess = () =>{
        const arr = cardArray
        const correctAnswer=guess[0]
        console.log('matched!')
        arr.filter(item=>item.name===correctAnswer)[0].solved=true
        arr.filter(item=>item.name===correctAnswer)[1].solved=true
        setCardArray([...arr])
    }
    const flipAllCards = () =>{
        const arr = cardArray
        setCardArray(arr.map(item=>[{...item, visible:false}][0]))
        console.log(arr)
    }
    
    const checkGameOver = () =>{
        const noMoreCards = (cardArray.every(value => value.solved === true))
        if(noMoreCards){
            setGameOver(noMoreCards)
            if(bestMoves>moves||bestMoves===0)setBestMoves(moves+1)

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
    
},[guess])
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
const cardClassNameHandler = (solved) =>{
    let cardClassName='match-game__card'
    if(solved){
        cardClassName+=' match-game__solved'
    }
    return cardClassName
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
            <div className='match-game__header-title'><h2>Matching Game</h2></div>
            <div className='match-game__header-moves'><h2>Moves: {moves} Best: {bestMoves}</h2></div>
        </div>
        {
        gameOver===false?
        <div className='match-game__card-container'>
            {cardArray&&cardArray.map((card)=>{
                return(
                <div
                key={uuidv4()}
                className={cardClassNameHandler(card.solved)}
                onClick={()=>clickHandler(card)}>
                    {card.visible&&
                    <img className='match-game__img' src={card.src}/>
                    }
                </div>
                )
            })}
        </div>:
        <div>
            <button onClick={resetGame}>Try again</button>
        </div>
        }
    </div>
  )
}
