import React from "react";
import { hot } from "react-hot-loader";
import Add from './Add';
import TodoList from './TodoList';
import styles from './todo-page.scss'
import Priority from '../../utils/priority-enum';
import Status from '../../utils/status-enum';
import Toolbar from './Toolbar';
let totalCount = 3;
class TodoPage extends React.Component {

  constructor() {
    super();

    this.state = {
      todoList: [{
        id: 1,
        title: "This is first todo",
        priority: Priority.High,
        status: Status.Done
      }, {
        id: 2,
        title: "This is second todo",
        priority: Priority.Medium,
        status: Status.Active
      }, {
        id: 3,
        title: "This is third todo",
        priority: Priority.Low,
        status: Status.Active
      }],
      filteredTodoList: [{
        id: 1,
        title: "This is first todo",
        priority: Priority.High,
        status: Status.Done
      }, {
        id: 2,
        title: "This is second todo",
        priority: Priority.Medium,
        status: Status.Active
      }, {
        id: 3,
        title: "This is third todo",
        priority: Priority.Low,
        status: Status.Active
      }],
      searchActive: false,
      statusActive: ""
    };

    this.formRef = React.createRef();
    this.searchRef = React.createRef();
    this.filterButtonGroupRef = React.createRef();
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleRemoveDone = this.handleRemoveDone.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilterWrapper = this.handleFilterWrapper.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleDone = this.toggleDone.bind(this);
  }

  toggleDone({ e, id }) {
    if (e && e.target.matches('div[data-item]')) {
      const modifiedTodoList = this.state.todoList.map(item => {
        if (item.id === id) {
          return Object.assign({}, item, { status: item.status === Status.Done ? Status.Active : Status.Done })
        }
        return item;
      });
      const modifiedFilteredTodoList = this.state.filteredTodoList.map(item => {
        if (item.id === id) {
          return Object.assign({}, item, { status: item.status === Status.Done ? Status.Active : Status.Done })
        }
        return item;
      });
      this.setState({
        todoList: modifiedTodoList,
        filteredTodoList: modifiedFilteredTodoList
      });
    }
  }

  handleSearch(e) {
    e.persist();
    if (e.target.value) {
      return this.setState((state) => ({
        filteredTodoList: state.todoList.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase()))
      }));
    }
    return this.setState((state) => ({
      filteredTodoList: [...state.todoList]
    }));
  }

  handleRemove(id) {
    this.setState((state) => ({
      todoList: state.todoList.filter(item => item.id !== id),
      filteredTodoList: state.filteredTodoList.filter(item => item.id !== id)
    }));
  }

  toggleSearch() {
    this.setState((state) => ({ searchActive: !state.searchActive }));
    if (this.searchRef.current.value) {
      this.setState((state) => ({ filteredTodoList: [...state.todoList] }));
    }
    this.searchRef.current.value = "";
  }

  handleRemoveDone() {
    this.setState((state) => ({
      todoList: state.todoList.filter(item => item.status !== Status.Done),
      filteredTodoList: state.filteredTodoList.filter(item => item.status !== Status.Done)
    }));
  }

  handleFilterWrapper(e) {
    if (e && e.target.matches('button[data-filter]')) {
      return this.handleFilter(e.target.value);
    }
    return this.handleFilter(this.state.statusActive);
  }

  handleFilter(value) {
    if (value) {
      return this.setState((state) => ({
        filteredTodoList: state.todoList.filter(item => item.status.toString() === value),
        statusActive: value
      }));
    }
    return this.setState((state) => ({
      filteredTodoList: [...state.todoList],
      statusActive: ""
    }));
  }

  componentDidMount() {
    this.filterButtonGroupRef.current.addEventListener('click', this.handleFilterWrapper);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleFilterWrapper);
  }

  handleAddTodo(e) {
    e.preventDefault();
    const data = Array.from(e.target.querySelectorAll("[form-item-title]")).map(item => ({
      key: item.attributes['form-item-title'].value,
      value: item.value
    }));
    let todoItem = {};
    data.forEach(i => todoItem[[i.key]] = i.value);
    if (!todoItem.title) {
      return;
    }
    todoItem.priority = Priority[todoItem.priority];
    todoItem.status = Status.Active;
    todoItem.id = ++totalCount;

    this.setState((state) => ({
      todoList: [todoItem, ...state.todoList]
    }));
    this.handleFilterWrapper();

    e.target.reset();
    totalCount += 1;
  }

  render() {
    const {
      filteredTodoList,
      searchActive,
      statusActive
    } = this.state;
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.headline}>Todos</h1>
        <Add handleAdd={this.handleAddTodo} innerRef={this.formRef} />
        <Toolbar
          filterRef={this.filterButtonGroupRef}
          handleRemoveDone={this.handleRemoveDone}
          toggleSearch={this.toggleSearch}
          innerSearchRef={this.searchRef}
          searchActive={searchActive}
          handleSearch={this.handleSearch}
          statusActive={statusActive} />
        <h6 className={styles.count}>Total tasks: {this.state.todoList.length}</h6>
        <hr className={styles.divider} />
        <TodoList todoList={filteredTodoList} handleRemove={this.handleRemove} toggleDone={this.toggleDone} />
      </div>
    );
  }
}

export default hot(module)(TodoPage);
