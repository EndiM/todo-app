import React from 'react';
import TodoItem from '../TodoItem';

const TodoList = ({ todoList, handleRemove, toggleDone }) => {
  return (
    <div>
      {
        todoList.map((todoItem, i) => {
          return (
            <TodoItem key={i} todoItem={todoItem} handleRemove={handleRemove} toggleDone={toggleDone} />
          )
        })
      }
    </div>
  )
}

export default TodoList;
