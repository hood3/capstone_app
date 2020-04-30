import React, { Component } from 'react';
import AnswersList from './AnswersList';
import axios from "axios";
import {isAuth} from '../RegisterLogin/helpers';
import Layout from '../Layout';
import '../myStyles/App.scss';

class Quiz extends Component {//Constructor sets the state of all values
    constructor() {
      super()
      this.state = {     
        name:'',
        score:0, 
        saveScore:'',      
        quizSet:[],
        allQuestions: [],
        quiz:{question:"", answer:"", choices:[]},
        doMakeNext: false 
      }      
    };   

  componentDidMount(){ //Retrieves all words and sentences from the database   
    console.log("Mounted")    
    axios.get(`${process.env.REACT_APP_API}/items`)//I prefer using axios to fetch
      .then((res) => {
        console.log(res);  //Displays response in console
        const allQuestions = res.data.map(item => item.word);//Iterate thru all sentences for that word
        this.shuffle(allQuestions)//Invokes shuffle function for allQuestions array
        this.setState({ quizSet: res.data, allQuestions: allQuestions });//Sets the state of 
        //array quizset and allQuestions with shuffled questions
        this.setState({ quizSet: res.data });//Sets quizSet array with shuffled questions
        this.makeOneQuiz()//Invokes the makeOneQuiz function
      })      
  } 

  getAnswer(question){//Function to chose right sentence for correct word
    let answer;
    this.state.quizSet.forEach(element => {//Iterates thru quizset array for sentence that
      //goes with appropriate word in database
      if (element.word === question){//When word element equals sentence, set answer to 
        //sentence element 
        answer = element.sentence//Sets answer to correct sentence
      }
    });
    return answer
  }

  shuffle(arr){  // This function shuffles array in place using temporary variable. 
    let arrayLen = arr.length//Using variable for array length
    for (let i=0;i<arrayLen;i++){//Iterating thru array
      let first = Math.floor(Math.random()*100) % arrayLen
      let second = Math.floor(Math.random()*100) % arrayLen
      let temp = arr[first]//Set temp to first array
      arr[first] = arr[second]//Set first to second
      arr[second] = temp//Set second to temp
    }   
  }

  getChoices(question) {//Function to display 4 choices for word on UI
    let tempQuizSet = this.state.quizSet.filter(q => q.word !== question);
    this.shuffle(tempQuizSet);
    let choices = [];
    let currentWord = "";
    tempQuizSet.forEach((value) =>{
      if(currentWord !== value.word && choices.length < 3) {
        choices.push(value.sentence);
        currentWord = value.word;
      }
    });
    choices.push(this.getAnswer(question))
    console.log(choices);
    return choices;
  }

  makeOneQuiz(){//Function to set array with 3 wrong and one right sentence for word
    let question = this.state.allQuestions.pop();
    let answer = this.getAnswer(question);
    let choices = this.getChoices(question);
    this.shuffle(choices)
    this.setState({quiz:{question:question, answer:answer, choices:choices}})
  }

  goNextQuiz = (response) => {//Function to repeat quiz after button is clicked
    this.setState({doMakeNext:response})
  } 

  incrementScore = (correct) => {//Function for score keeping
  	let score = this.state.score;//Set the state of score
    if(correct) {//If correct add one to score
      score += 1;
    }
    else {
      score -= 1;//If wrong subtract one from score
    }
    localStorage.setItem('score', score);  //Set score in localStorage
    this.setState({score: score})  //Set the state of score    
  }  

  render() {
    if (this.state.doMakeNext){//If doMakeNext is true set to false and invoke new quiz function
      this.makeOneQuiz()
      this.setState({doMakeNext:false})      
    }

      return (
        <Layout>
          <div className='quiz'>
          <div className="scores">
                {`Welcome ${isAuth().name}!!, your current score is: `}
            </div>
            <div className="scores">
                {this.state.score}  
            </div>             
          Click on the correct answer.<br/>The Word Is:
         <AnswersList 
         question={this.state.quiz.question} 
         choices={this.state.quiz.choices}
         answer={this.state.quiz.answer}
         incrementScore={this.incrementScore}        
         goNextQuiz={this.goNextQuiz}       
         />       
        </div>
        </Layout>
      );
  }
}  

export default Quiz;