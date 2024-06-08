import { useState, useEffect } from 'react';
import './app.css';
import Navbar from './components/navbar.jsx';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleEdit = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      setIsEditing(id);
      setEditText(todoToEdit.todo);
    }
  };

  const handleSave = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, todo: editText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setIsEditing(null);
    setEditText("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleAdd = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 rounded-xl p-5 bg-gray-100 shadow-lg min-h-[90vh] w-3/4">
        <div className="addTodo my-5">
          <h2 className="text-xl font-semibold text-gray-800">Add a Todo</h2>
          <div className="flex mt-4">
            <input onChange={handleChange} value={todo} type="text" className="flex-1 p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-violet-500" />
            <button onClick={handleAdd} className="ml-4 bg-violet-500 hover:bg-violet-600 p-2 text-sm font-semibold text-white rounded-md transition-colors">Add</button>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Your Todos</h2>
        <div className="todos mt-4">
          {todos.map((item) => (
            <div key={item.id} className="todo flex items-center w-full my-3 bg-white shadow-sm rounded-lg overflow-hidden">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} className="ml-4 h-5 w-5" />
              {isEditing === item.id ? (
                <div className="flex-1 px-4 py-2">
                  <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="w-full p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-violet-500" />
                </div>
              ) : (
                <div className={`flex-1 px-4 py-2 ${item.isCompleted ? "line-through text-gray-400" : "text-gray-700"}`}>{item.todo}</div>
              )}
              <div className="buttons flex">
                {isEditing === item.id ? (
                  <button onClick={() => handleSave(item.id)} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-l-md transition-colors">Save</button>
                ) : (
                  <button onClick={() => handleEdit(item.id)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-l-md transition-colors">Edit</button>
                )}
                <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-r-md transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;