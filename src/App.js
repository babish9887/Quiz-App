import { quizData } from './quizdata';
import { useRef, useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount]=useState(0);
  const correctans=useRef(0);
  const [randomquiz, setrandomQuiz]=useState(quizData);
  const quizcount =useRef(5);

  function handlerestart(){
    window.location.reload();
  }

  useEffect(()=>{
   const temp= [...quizData].sort(()=>Math.random()-0.5);
   setrandomQuiz(temp);
  },[])


  return (
  <div className='app'>
    {count===quizcount.current && 
    <div className='scorebox'>
      Your Score is {correctans.current} / {quizcount.current}
      <button className='restart' onClick={handlerestart}>Restart</button>
    </div>}
   {count<quizcount.current &&
    <>
     <div className='questionbox'>
      <div className='question-count'>
        <span>Question {count+1}</span>/{quizcount.current}
      </div>
      <div className='question-text'>{randomquiz[count].question}</div>
      <div className='timer'>
      </div>
    </div>
    <div className='answerbox' >
      <button onClick={handleClick}>{randomquiz[count].options[1]}</button>
      <button onClick={handleClick}>{randomquiz[count].options[0]}</button>
      <button onClick={handleClick}>{randomquiz[count].options[3]}</button>
      <button onClick={handleClick}>{randomquiz[count].options[2]}</button>
      </div>
  </>
   }
   </div>
  );

  function handleClick(e){
    if(e.target.innerHTML===randomquiz[count].correctAnswer){
    e.target.classList.add('correct')
      correctans.current+=1;
    }
    else
      e.target.classList.add('incorrect');

      setTimeout(()=>{
        setCount((c)=>c+1);
        e.target.classList.remove('correct');
        e.target.classList.remove('incorrect');
      }, 400)
  }
}

export default App;
