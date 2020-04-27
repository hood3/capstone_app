import React, { Component } from 'react';
import axios from "axios";
import Layout from '../Layout';
import '../myStyles/App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class GetSentences extends Component {//Constructor sets state of values
  constructor(props) {
    super(props);
    this.state = {
     word: '',  
     sentences: []     
    }
  } 
    
    getUser = (e) => {//Gets the word input into text form from user
      e.preventDefault();//Prevents page from reloading after button is clicked
      const user = e.target.elements.username.value;//Sets user to word entered
      const mykey = process.env.REACT_APP_WORDS_KEY; //Sets mykey to env variable     
      if (user) {  //If a word is entered, submits word to words api      
        let url= `https://wordsapiv1.p.rapidapi.com/words/${user}/examples`          
        let config = {headers:{"X-Mashape-Key":mykey}}//Sends key with url
        axios.get(url,config)
        .then((res) => {
          const sentences = res.data.examples;//Gets example sentences from word api
          const word = res.data.word; //Gets word from word api(same as word entered by user)         
          this.setState({ sentences });//Set state with sentences object
          this.setState({word});//Sets state with word
        })
      } else return;
    }

    onSubmitSave = (e) => {// Saves example sentences that are clicked on to my database               
      axios.post(`${process.env.REACT_APP_API}/items`, { // Post word and sentences to endpoint                  
        word:this.state.word,
        sentence:e.target.innerText                      
     });  
     toast.success('Saved to the database !!');            
   }      

    render() { //Iterates thru sentences object to display each on UI  
      const list = this.state.sentences.map(examples => <li key={examples} onClick={this.onSubmitSave}  
        >{examples}.</li>)//Any sentence is clicked on, Invokes onSubmitSave function 
      
      return (
        <Layout>
        <section id ="homie">
        <ToastContainer />
        <div className="container">
        <div className="homepg">
            <form onSubmit={this.getUser} className="myForm"><br/>
                <label className="par">
                    Word: 
                    <input className="inputbox" type="search" name="username" required/>
                </label>
                <button className="btn10">Submit to Library</button>
            </form>
            <p className="par">Please enter a English word in all lower caps<br/>Click on 
            each and every sentence you wish to save to your quiz.<br/>You may go to your
            personal quiz at any time by clicking your name in upper right corner.<br/></p>
            {this.state.sentences ? <div className="par">Word: {this.state.word}<br/>
            Sentences:<br/><ol className="list" >{list}</ol><br/></div> : <p className="par">
            You must enter a word in all lower cap.</p>}
        </div>
        </div>
        </section>
        </Layout>
      );
    }
  };
  
  export default GetSentences;
    

