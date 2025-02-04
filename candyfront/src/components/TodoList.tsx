import React, { useState } from 'react';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);

  const addToDo = () => {
    const newToDo = prompt('Enter task...');
    if (newToDo) {
      setTodos([...todos, newToDo]);
    }
  };
  return (
    <div>
      <button onClick={addToDo}>Tap</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};
export default TodoList;
