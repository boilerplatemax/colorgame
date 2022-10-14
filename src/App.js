import React,{useState, useEffect} from 'react'
import './App.css';
const chars =['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']

function getRandomColor(){
  let randomColorArray =[]
  for(var i=0;i<3;i++){
    let color='#'
      for(var j=0;j<6;j++){
        color+=chars[Math.floor(Math.random()*chars.length)]
      }
      randomColorArray.push(color) 
    }
    return randomColorArray
  }


function App() {
  const [randomNum, setRandomNum]=useState(Math.floor(Math.random()*3))

  const [colorArray, setColorArray]=useState(getRandomColor())

  const [answer, setAnswer]=useState('Guess the color!')

  const checkAnswerHandler=e=>{
    const correctColor=colorArray[randomNum]
    const guess =e.target.innerHTML

    if(guess===correctColor){
      setAnswer('Correct')
      setColorArray(getRandomColor())
      setRandomNum(Math.floor(Math.random()*3))
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
        <button onClick={checkAnswerHandler} className='btn'>{colorArray[0]}</button>
        <button onClick={checkAnswerHandler} className='btn'>{colorArray[1]}</button>
        <button onClick={checkAnswerHandler} className='btn'>{colorArray[2]}</button>
      </div>
      
    </div>
  );
}

export default App;
