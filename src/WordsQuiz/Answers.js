import React from 'react';

const Answers = ({ choice, getResponse}) => { 
  const clickHandler = () => {   
    getResponse(choice);   
  }

  return (
    <div className="answersChoices" onClick={clickHandler} >
      <p>{choice}</p>       
    </div>
  );
}

export default Answers;