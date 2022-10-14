import React,{useState, useEffect} from 'react'
import './App.css';

function App() {
  const [randomNum, setRandomNum]=useState('')

  const [colorArray, setColorArray]=useState([])

  const [answer, setAnswer]=useState('Guess the color!')

  useEffect(()=>{
    setColorArray([getRandomColor(),getRandomColor(),getRandomColor()])
    setRandomNum(Math.floor(Math.random()*3))
  },[])
  const chars =['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
  const getRandomColor=()=>{
    const color = new Array(6).fill("").map(()=>chars[Math.floor(Math.random()*chars.length)]).join('')
    return `#${color}`
    
  }
  const generateColors=()=>{
    setColorArray([getRandomColor(),getRandomColor(),getRandomColor()])
    setRandomNum(Math.floor(Math.random()*3))
  }
  const checkAnswerHandler=e=>{
    const correctColor=colorArray[randomNum]
    const guess =e.target.innerHTML

    if(guess===correctColor){
      setAnswer('Correct')
      generateColors()
    }
    else{
      setAnswer('Wrong')
    }
  }
  return (
    <div className="App" style={{width:'100vw', height:'100vh', backgroundColor:colorArray[randomNum], position:'absolute'}}>
      <div className='title'>
        <h1 className={answer==='Correct'?'correct':'false'}>
        {answer}
      </h1>
      </div>
      <div className='btn__container'>
        {colorArray.map((x, index)=>{
          return(<button onClick={checkAnswerHandler} key={index} className='btn'>{colorArray[index]}</button>)
        })}

      </div>
    </div>
  );
}
export default App;
