import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineCheckSquare } from 'react-icons/ai';
import "./App.css";


function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handlerAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  }
  const handleDeleteTodo = (index) => {
    let deletedTodos = [...allTodos];
    deletedTodos.splice(index);

    localStorage.setItem('todolist', JSON.stringify(deletedTodos));
    setTodos(deletedTodos);
  }

  const handleComplete = (index) => {
    let now = new Date();
    let day = now.getDay();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let completedOn = `${month}/${day}/${year} at ${hours}:${minutes}:${seconds}`;

    let filteredItems = {
      ...allTodos[index],
      completedOn: completedOn,

    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItems);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
    

  }
  const handleDeleteCompletedTodo = (index) => {
    let deletedTodos = [...completedTodos];
    deletedTodos.splice(index);
    localStorage.setItem('completedTodos', JSON.stringify(deletedTodos));
    setCompletedTodos(deletedTodos);

  }

  useEffect(() => {
    let savedInfo = JSON.parse(localStorage.getItem('todoList'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));

    if (savedInfo) {
      setTodos(savedInfo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, [])

  return (
    <div className="App">
      <h1> My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title: </label>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Add task title..."></input>
          </div>
          <div className="todo-input-item">
            <label>Description: </label>
            <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Add task description..."></input>
          </div>
          <div className="todo-input-item">
            <button type="submit" onClick={handlerAddTodo} className="primaryBtn">Add</button>
          </div>
        </div>


        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo Tasks
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed Tasks
          </button>
        </div>


        <div className="todo-list">

          {isCompleteScreen === false && allTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete className="icon" onClick={() => handleDeleteTodo(index)} title="Delete" />
                  <AiOutlineCheckSquare className="check-icon" onClick={() => handleComplete(index)} title="complete" />

                </div>
              </div>

            );
          })}

          {isCompleteScreen === true && completedTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><i>Completed on: {item.completedOn}</i></p>

                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleDeleteCompletedTodo(index)}
                    title="Delete"
                  />


                </div>
              </div>

            );
          })}

        </div>
      </div>
    </div>

  );
}

export default App;
