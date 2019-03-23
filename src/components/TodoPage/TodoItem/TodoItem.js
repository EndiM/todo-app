import React from 'react';
import styles from './todo-item.scss';
import Priority from '../../../utils/priority-enum';
import Status from '../../../utils/status-enum';
import getKeyByValue from '../../../utils/getKeyByValue';

const TodoItem = ({ todoItem: item, handleRemove, toggleDone }) => {
  const priority = getKeyByValue(Priority, item.priority).toLowerCase();
  const status = getKeyByValue(Status, item.status).toLowerCase();
  return (
    <div data-item className={[styles.todoItemWrapper, styles[priority], styles[status]].join(' ')} onClick={(e) => toggleDone({ e, id: item.id })}>
      <span className={styles.title}>{item.title}</span>
      <span className={[styles.state, item.status === Status.Done ? styles.done : ""].join(' ')} ></span>
      <span className={styles.remove} onClick={() => handleRemove(item.id)}></span>
    </div>

  )
}

export default TodoItem;
