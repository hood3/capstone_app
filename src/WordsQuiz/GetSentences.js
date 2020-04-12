import React, { Component } from 'react';
import axios from "axios";
import Layout from '../Layout';
import '../myStyles/App.css';

class GetSentences extends Component {
  constructor(props) {
    super(props);
    this.state = {
     word: '',  
     sentences: []     
    }
  } 
    
    getUser = (e) => {
      e.preventDefault();
      const user = e.target.elements.username.value;
      const myKey = process.env.REACT_APP_WORDS_KEY;
      if (user) {
        let url= `https://wordsapiv1.p.mashape.com/words/${user}/examples`          
        let config = {headers:{"X-Mashape-Key":myKey}}
        axios.get(url,config)
        .then((res) => {
          const sentences = res.data.examples;
          const word = res.data.word;          
          this.setState({ sentences });
          this.setState({word});
        })
      } else return;
    }

    onSubmitSave = (e) => {            
       axios.post('http://localhost:5000/api/items', {                   
         word:this.state.word,
         sentence:e.target.innerText                  
      });          
    }      

    render() {   
      const list = this.state.sentences.map(examples => <li key={examples} onClick={this.onSubmitSave}  
        >{examples}.</li>)
      
      return (
        <Layout>
        <div className="homepg">
            <form onSubmit={this.getUser} className="myForm"><br/>
                <label className="par">
                    Word: 
                    <input className="inputbox" type="search" name="username" required/>
                </label>
                <button className="btn10">Submit to Library</button>
            </form>
            <p className="par">Please enter a English word in all lower caps </p>
            {this.state.sentences ? <div className="par">Word: {this.state.word}<br/>
            Sentences:<br/>Click on each and every sentence you wish to save to your quiz.<br/>
            You may go to your personal quiz at any time by clicking your name in upper right corner.<br/>
            <ol className="list" >{list}</ol><br/></div> : <p className="par">You must enter a word in all lower cap.</p>}
        </div>
        </Layout>
      );
    }
  };
  
  export default GetSentences;
    

