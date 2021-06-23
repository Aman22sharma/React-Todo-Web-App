// import logo from './logo.svg';
import './App.css';
import React from 'react';
import Listitems from './Listitems'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


library.add(faTrash);

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      items: [],
      currentTime:{
        text: '',
        key: ''
      }
    }
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  handleInput(e){
    this.setState({
      currentTime:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentTime;
    console.log(newItem)
    if(newItem.text !== ""){
      const newItems = [...this.state.items, newItem];
      this.setState({
        items: newItems,
        currentTime:{
          text: '',
          key: ''
        }
      })
    }
  }

  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })

  }

  setUpdate(text,key){
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    this.setState({
      items: items
    })
  }

  render(){
    return (
      <div className="App">
        <header>
          <form id="to-do-form" onSubmit={this.addItem}>
          <h1>To-do List</h1>
            <input type="text" placeholder="Enter text"
              value={this.state.currentTime.text} 
              onChange={this.handleInput}/>
            <button type="submit">Add</button>
          </form>
        </header>
        <Listitems items= {this.state.items}
        deleteItem ={this.deleteItem}
        setUpdate={this.setUpdate}></Listitems>
      </div>
    )
  }
}

export default App;
