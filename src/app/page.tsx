"use client";
import { useState } from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

type Todo = {
  id: number;
  task: string;
};

function TodoApp() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<string>("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  const addTodo = () => {
    if (todo.trim() === "") return;
    const updatedTodos = [
      ...todos,
      {
        id: todos.length + 1,
        task: todo,
      },
    ];
    setTodos(updatedTodos);
    setTodo("");
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const startEditTodo = (id: number, task: string) => {
    setEditId(id);
    setEditTask(task);
  };

  const saveEditTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task: editTask } : todo
    );
    setTodos(updatedTodos);
    setEditId(null);
    setEditTask("");
  };

  return (
    <div className="bg-darkerChatgptGray min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-violet-700 to-blue-700 mb-7">
        Todo App
      </h1>
      <div className="relative w-full md:w-1/3 text-2xl mb-4">
        <input
          type="text"
          value={todo}
          placeholder="Task name"
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="bg-lightGray text-gray-400 p-3 rounded-lg outline-none w-full pr-20"
        />
        <button
          onClick={addTodo}
          className="absolute inset-y-0 right-2 px-4 mt-2 mb-2 bg-darkerChatgptGray hover:bg-black text-gray-300 rounded-md"
        >
          Add
        </button>
      </div>

      <div className="w-full md:w-1/3 max-h-96 overflow-y-auto flex flex-col gap-1 mt-2 text-gray-400 text-1xl">
        {todos.map((todo) => (
          <div key={todo.id} className="flex p-3">
            {editId === todo.id ? (
              <input
                type="text"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                placeholder="Edit task"
                className="bg-darkerChatgptGray p-2 outline-none w-full border-blue-500 border-b-2"
              />
            ) : (
              <span className="flex-grow">{todo.task}</span>
            )}
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  if (editId === todo.id) {
                    saveEditTodo(todo.id);
                  } else {
                    startEditTodo(todo.id, todo.task);
                  }
                }}
                className="px-2 text-blue-700 text-lg"
              >
                {editId === todo.id ? <FaCheck /> : <FaEdit />}
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-2 text-customRed text-lg"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
