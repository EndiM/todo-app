import React from "react";
import styles from './toolbar.scss';
import Status from '../../../utils/status-enum';

export const Toolbar = ({ handleRemoveDone, handleSearch, filterRef, toggleSearch, searchActive, innerSearchRef, statusActive }) => {
  return (
    <div className={styles.wrapper} >
      <div className={[styles.search, searchActive ? styles.extend : ""].join(' ')} >
        <input type="search" placeholder="Search for tasks.." onFocus={toggleSearch} onBlur={toggleSearch} onChange={handleSearch} ref={innerSearchRef} />
      </div>
      <div className={[styles.removeDone, searchActive ? styles.hide : ""].join(' ')}>
        <button onClick={handleRemoveDone}>
          <span>Clear done tasks</span>
        </button>
      </div>
      <div className={[styles.filter, searchActive ? styles.hide : ""].join(' ')} ref={filterRef}>
        <button data-filter value="" className={[styles.by, statusActive === "" ? styles.active : ""].join(' ')}>All</button>
        {
          Object.keys(Status).map((s, i) => <button key={i} data-filter value={Status[s]} className={[styles.by, statusActive == Status[s] ? styles.active : ""].join(' ')}>{s}</button>)
        }
      </div>

    </div>
  );
}

export default Toolbar;
