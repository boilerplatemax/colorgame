import React,{useState, useEffect} from 'react'

export default function ColorGame() {
    const [color,setColor]=useState('')
    const [colorArray, setColorArray]=useState([])
    //this bool state could have been omitted however it helps with readability and it makes sense to check a bool rather than checking if a string === true/false
    const [answer, setAnswer]=useState(true)
    const [message, setMessage]=useState('Guess the color!')
    //passing answer as a dependency will run this code on page load but also whenever the answer changes
    useEffect(()=>{
  
      const generateColors=()=>{
        const actualColor=getRandomColor()
        setColor(actualColor)
        //0.5-Math.random() will either return a negative or positive number, depending on result each array element will either stay in its spot or shift which creates a simple shuffle mechanic
        setColorArray([actualColor,getRandomColor(),getRandomColor()].sort(()=>0.5-Math.random()))
      
      }
      //only regenerate colours when the user is correct
    if(answer)generateColors()
    },[answer])
  
    const chars =['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
    const getRandomColor=()=>{
      const color = new Array(6).fill("").map(()=>chars[Math.floor(Math.random()*chars.length)]).join('')
      return `#${color}`
      
    }
  
    const checkAnswerHandler=e=>{
      const guess =e.target.innerHTML
      if(guess===color){
        setAnswer(true)
        setMessage('Correct')
      }
      else{
        setAnswer(false)
        setMessage('Wrong')
      }
    }
    return (
      <div className="color-game" style={{width:'100vw', height:'100vh', backgroundColor:color, position:'absolute'}}>
        <div className='title'>
          <h1 className={answer?'correct':'false'}>
          {message}
        </h1>
        </div>
        <div className='btn__container'>
          {colorArray.map((x, index)=>{
            return(
            <button
            onClick={checkAnswerHandler}
            key={index} className='btn'>
              {colorArray[index]}
            </button>
            )
          })}
  
        </div>
      </div>
    );
  }

  