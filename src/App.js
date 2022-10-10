import { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';

let i = 0;
const LSKey = 'todoApp';//local storage key

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LSKey));
    if (storedTodos == null) {return;}
    if (storedTodos.length > 0) {setTodos(storedTodos);
    console.log('useEffect, get');}
  }, [])

  useEffect(() => {
    localStorage.setItem(LSKey, JSON.stringify(todos));
    console.log('useEffect, set');
  }, [todos])


  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }


  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === ' ') return; 
    setTodos(prevTodos => {
      ++i;
      return [...prevTodos, {id: Math.random(), name: name, complete: false}];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" /> 
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed</button>
      <div>{todos.filter(todo => !todo.complete).length} left Todos</div>
    </>
  )
}

export default App;
