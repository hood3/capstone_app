import React, { Component } from 'react';
import Answers from './Answers';//Import the answer choice function

class AnswersList extends Component {//Constructor that sets the state values and passes
    constructor(props) {           //the children props
      super(props)
      this.state = {
        score:0,        
        isCorrect:null,  
        choices:props.choices      
      }
    }    

    goNext = () => {   //If answer choice is correct reset the isCorrect to null and invoke
      this.setState({isCorrect:null})//the next quiz function
      this.props.goNextQuiz(true)
    }

    getResponse = (response) =>{ //getResponse is invoked by answer clickhandler, to evaluate
      this.evaluateAnswer(response)  //the answer by invoking evaluateAnswer
    }

    evaluateAnswer(response){//Function that evaluates the answer
      const isCorrect = response === this.props.answer;//sets isCorrect to response if 
      //response equals the child component answer
      const choices = this.state.choices.filter(choice => choice !== response);//Filters out
      //choices from array of answers
      this.setState({//Sets the state values
        isCorrect: isCorrect,
        choices: choices
      });          
      this.props.incrementScore(isCorrect);//Invokes child incrementScore if answer is correct
    }

    render() {
      let {question, choices} = this.props//Sets question and choices as props for use with quiz
      let isCorrect = this.state.isCorrect //Sets isCorrect to whatever the state is  

      const Display = (isCorrect) => {//Method for displaying correct/wrong on UI
        switch (isCorrect) {
          case true:
            return (
              <div>
                <p className="para">Correct</p>
                <button className="btn10" onClick={this.goNext}>Next</button>
              </div>
              );            
          case false:
            return <p className="para">Wrong</p>;           
          default:
            return null;
        }
      }

      return (
        <div>
        <h2 className="question">{question}</h2>
          {
            choices.map((choice, i) => {
              return (
              <Answers key={i} choice={choice} getResponse={this.getResponse} />
              );
            })
          }
          {Display(isCorrect)}
        </div>
      );
  }
}

export default AnswersList;