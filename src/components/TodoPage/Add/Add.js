import React from "react";
import styles from './add.scss';
import Priority from '../../../utils/priority-enum';


export const Add = ({ handleAdd, innerRef }) => {

  return (
    <form onSubmit={handleAdd} className={styles.wrapper} ref={innerRef}>
      <input form-item-title="title" placeholder="What needs to be done?" type="text" className={styles.title} />
      <select className={[styles.priority, "u-full-width"].join(' ')} form-item-title="priority">
        {
          Object.keys(Priority).map((p,i) => <option key={i} value={p}>{p}</option>)
        }
      </select>
      <button className={styles.add} type="submit">Add</button>
    </form>
  );
}

export default Add;
