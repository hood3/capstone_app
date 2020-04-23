import React, { Component } from 'react';
import Answers from './Answers';

class AnswersList extends Component {
    constructor(props) {
      super(props)
      this.state = {
        score:0,        
        isCorrect:null,  
        choices:props.choices      
      }
    }    

    goNext = () => {
      this.setState({isCorrect:null})
      this.props.goNextQuiz(true)
    }

    getResponse = (response) =>{
      this.evaluateAnswer(response)  
    }

    evaluateAnswer(response){
      const isCorrect = response === this.props.answer;
      const choices = this.state.choices.filter(choice => choice !== response);
      this.setState({
        isCorrect: isCorrect,
        choices: choices
      });          
      this.props.incrementScore(isCorrect);
    }

    render() {
      let {question, choices} = this.props
      let isCorrect = this.state.isCorrect   

      const Display = (isCorrect) => {
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