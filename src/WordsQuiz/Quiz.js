import React, { Component } from 'react';
import CardList from './CardList';
import axios from "axios";
import Rank from './Rank';
import Layout from '../Layout';
import '../myStyles/App.css';

class Quiz extends Component {
    constructor() {
      super()
      this.state = {     
        name:'',
        score:0,       
        quizSet:[],
        allQuestions: [],
        quiz:{question:"", answer:"", choices:[]},
        doMakeNext: false 
      }
    }      

  componentDidMount(){    
    console.log("Mounted")    
    axios.get('http://localhost:5000/api/items')
      .then((res) => {
        console.log(res);
        const allQuestions = res.data.map(item => item.word);
        this.shuffle(allQuestions)
        this.setState({ quizSet: res.data, allQuestions: allQuestions });
        this.setState({ quizSet: res.data });
        this.makeOneQuiz()
      })      
  } 

  getAnswer(question){
    let answer;
    this.state.quizSet.forEach(element => {
      if (element.word === question){
        answer = element.sentence
      }
    });
    return answer
  }

  shuffle(arr){
    let arrayLen = arr.length
    for (let i=0;i<arrayLen;i++){
      let first = Math.floor(Math.random()*100) % arrayLen
      let second = Math.floor(Math.random()*100) % arrayLen
      let temp = arr[first]
      arr[first] = arr[second]
      arr[second] = temp
    }   
  }

  getChoices(question) {
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

  makeOneQuiz(){
    let question = this.state.allQuestions.pop();
    let answer = this.getAnswer(question);
    let choices = this.getChoices(question);
    this.shuffle(choices)
    this.setState({quiz:{question:question, answer:answer, choices:choices}})
  }

  goNextQuiz = (response) => {
    this.setState({doMakeNext:response})
  }  

  incrementScore = (correct) => {
    if(correct) {
      this.setState({score:this.state.score + 1})
    }
    else {
      this.setState({score: this.state.score - 1})
    }   
    this.scoreSave(); 
  }

  scoreSave = () => {
    axios.post('http://localhost:5000/api/user', {                   
         score:this.state.score                     
      });          
    }        

  render() {
    if (this.state.doMakeNext){
      this.makeOneQuiz()
      this.setState({doMakeNext:false})
    }

      return (
        <Layout>
        <div className='quiz'>
          Click on the correct answer.
          <Rank
                name={this.state.name}
                score={this.state.score}
              />
              The Word Is:
         <CardList 
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