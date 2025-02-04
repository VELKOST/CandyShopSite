import React from 'react';
// import TodoList from "../components/TodoList";
import TodoList from '../../components/TodoList';
import Counter from '../../components/Counter';
const TodoPage: React.FC = () => {
  return (
    <>
      <TodoList />
      <Counter />
    </>
  );
};

export default TodoPage;
