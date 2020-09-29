import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import { TextField, List, } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  //when app loads we need to listen to the database and fetch all the todos as we add and remove them
  useEffect(() => {
    //this code fires when the app loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
      // console.log(snapshot.docs.map(doc => doc.data().todo));
      // if(snapshot.docs.exists){
        setTodos(snapshot.docs.map(doc => ({id: doc.id , ...doc.data()})))
        // console.log(snapshot.docs[0].data().timestamp);
      // }

      // console.log(snapshot.exists)
      

      
    });
    return () => {
      
    }
  }, [])

  const addTodo = (event) =>{
    //this is what will happen when the button is clicked.
    //prevent the webpage from refreshing so prevent the default submit behavior
    event.preventDefault();
    if (input === ''){
      return;
    }
    db.collection('todos').add({
      todo: input,
      timestamp: new Date().toLocaleDateString()
    });
    // setTodos(todos.concat(input));
    setInput('');

  }
  return (
    <div className="App">
      <h1>Todo List</h1>
      <form>
      {/* <input value = {input} onChange={event =>setInput(event.target.value)}/> */}

      
        <TextField id="standard-basic" label="Write a todo" value = {input} onChange={event =>setInput(event.target.value)} />

        <Button variant="contained" color="primary" type='submit' onClick= {addTodo} disabled = {!input}>
          Add Todo
        </Button>
        {/* <button type='submit' onClick= {addTodo}>Add Todo</button> */}
      </form>
      <List className='todo_list'>
        {todos.map(todo =>( 
          <Todo todo={todo}/>
        ))}
      </List>
  

    </div>
  );
}

export default App;
