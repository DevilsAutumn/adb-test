import React, { useState } from "react";
import "./App.css";
import { useTodos } from "./hooks/useTodos"; // Import the custom hook

export function App() {
  const { todos, addTodo, error, success } = useTodos();
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") {
      return;
    }

    // Call the addTodo function from the custom hook
    addTodo(newTodo);
    setNewTodo("");
  };

  return (
    <div className="App">
      <div>
        <h1>List of TODOs</h1>
        {todos.map((todo, index) => (
          <li key={index}>{todo.description}</li>
        ))}
      </div>
      <div>
        <h1>Create a ToDo</h1>
        {error && <h4>{error}</h4>}
        {success && <h4>{success}</h4>}
        <form onSubmit={handleAddTodo}>
          <div>
            <label htmlFor="todo">ToDo: </label>
            <input
              type="text"
              id="todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "5px" }}>
            <button type="submit">Add ToDo!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
