import React, { use, useEffect } from 'react'
import CreateToDo from './components/CreateToDo'
import ToDo from './components/ToDo'

const App = () => {
  const [todos,setTodos] = React.useState([]);
  const fetchTodos= async()=>{
    try{
      const response=await fetch("https://todoapp-u2zv.onrender.com/todos");
      if(!response.ok){
        throw new Error("Network response was not ok");
      }
      const { todos }=await response.json();
      setTodos(todos);
    }catch(error){
      console.error("Error fetching todos:", error);
    }
  }
  useEffect(() => {
    fetchTodos();
  }
  , []);
  return (
    <>
    <CreateToDo />
    <ToDo todos={todos} />
    </>
  )
}

export default App