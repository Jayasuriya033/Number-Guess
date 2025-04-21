import './App.css';
import { BsArrowRepeat } from 'react-icons/bs';

import React, { useState } from 'react';

const GuessNumberGame = () => {

/*---------------------- Use State Function ------------------------ */
  const [random,setRandom] = useState(generateRandom());
  const [userInput, setUserInput] = useState('');
  
  const [remainingChances, setRemainingChances] = useState(7);
  const [message, setMessage] = useState('');
  const [chanceMessage, setChanceMessage]=useState('Remaining Chances:');
  const [timeoutId, setTimeoutId] = useState(null);
 
  /*---------------------- Generate the Random Value --------------------- */
   function generateRandom(){
     let random = Math.floor(Math.random()*100)+1;
      return random;
    }
  /*---------------------- Refresh Button ------------------------ */
    const handleRefresh = ()=>{
          setUserInput('');
          setRemainingChances(7);
          setRandom(generateRandom());
          setMessage('');
          setChanceMessage('Remaining Chances: ');
        };
  /*----------------------After the game is completed, all data is Automatically Empty -------------------- */
        const handleInputEmpty = ()=>{
          setUserInput('');
          if (remainingChances === 0) {
            setMessage(`Game over. The correct number was  ${random}.`);
            setChanceMessage('Try again🔁');
            setRemainingChances('');
            setTimeout(handleRefresh, 4000);
          }
        }
/*---------------------- Get a input Function and setting time ------------------------ */

        const handleInputChange = (e) => {
          setUserInput(e.target.value);
          
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
      
          const newTimeoutId = setTimeout(() => {
          }, 5000);
      
          setTimeoutId(newTimeoutId);

          if (e.target.value !== '') {
            handleGuess(e.target.value);
          }
        };
/*---------------------- Value guessing Function ------------------------ */

  const handleGuess = (value) => {
    if(userInput===''){
      setRemainingChances(remainingChances -1);
    }

      if(userInput){
    if (value === random) {
      setChanceMessage("Congratulations😍");
      setRemainingChances('');
      setMessage(`You guessed the correct number.`);
      setTimeout(handleRefresh, 3000);

    } 
    else if(value > random) {
      setMessage('')
      setMessage(`${value} is too High...`);
      setTimeout(handleInputEmpty,1000);
    }
    else if(value < random) {
      setMessage('')
      setMessage(`${value} is too Low...`);
      setTimeout(handleInputEmpty,1000);
    }
  };}

/*---------------------- Return Values ------------------------ */
  return (
     <div className="container">
      <div className='container-box'>
      <h1 className='topic'>Enter the number between 1 to 100 </h1>

      <p className='remaining'>{chanceMessage} {remainingChances}</p>
      <input type="text" value={userInput} onChange={handleInputChange} />
      <p className='result' style={{fontFamily: 'courier' }}>{message}</p>
      <button className="btn btn-secondary" onClick={handleRefresh}><BsArrowRepeat /> Refresh</button>

    </div>
    </div>
  );
};

export default GuessNumberGame;