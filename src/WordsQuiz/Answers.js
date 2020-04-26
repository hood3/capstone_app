import React from 'react';

const Answers = ({ choice, getResponse}) => { //Method to get the answer choice and invoke
  const clickHandler = () => {   //the getResponse function each time a choice is clicked on
    getResponse(choice);   
  }

  return (
    <div className="answersChoices" onClick={clickHandler} >
      <p>{choice}</p>       
    </div>
  );
}

export default Answers;