import { useState, useEffect } from "react";
import axios from "axios";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  // Fetch todos from an API or database
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/todos/");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const setStatus = (message, type) => {
    if (type === "error") {
      setError(message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    } else if (type === "success") {
      setSuccess(message);
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    }
  };

  const addTodo = async (newTodo) => {
    setError(null);
    setSuccess(null);
    try {
      // Post the newTodo to your API
      const response = await axios.post("http://localhost:8000/todos/", {
        description: newTodo,
      });

      if (response.status === 201) {
        // If the post is successful, fetch and update the local state
        fetchTodos();
        setTodos([...todos, newTodo]);
        setStatus("Todo added successfully", "success");
      } else {
        setStatus("Error adding todo: " + response.statusText, "error");
      }
    } catch (error) {
      setStatus("Error adding todo: " + error.message, "error");
    }
  };

  return { todos, addTodo, error, success };
}
