import { useState, useEffect } from 'react';
import svg from './images/image172.svg';
import uuid4 from 'uuid4';
import './App.css';
import { FaTrash } from 'react-icons/fa';
import { BiTask } from 'react-icons/bi';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState(
    localStorage.todos ? JSON.parse(localStorage.todos) : []
  );

  useEffect(() => {
    localStorage.todos = JSON.stringify(todos);
  }, [todos]);

  const addTodoUnit = (keyName, valueName, anotherField) => {
    setTodos(prev => [
      ...prev,
      { [keyName]: valueName, id: uuid4(), children: [], ...anotherField },
    ]);
  };

  const addTodoItem = (todoName, id) => {
    const changedTodo = {
      todoName: todoName,
      id: uuid4(),
      isDone: false,
    };
    setTodos(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, children: [...item.children, changedTodo] }
          : item
      )
    );
  };

  const handleToggleDone = (todo, id) => {
    const currentTodo = todo.find(item => item.id === id);
    setTodos(prev =>
      prev.map(item =>
        item.children.some(item => item.id === id)
          ? {
              ...item,
              children: item.children.map(item =>
                item.id === id ? { ...item, isDone: !currentTodo.isDone } : item
              ),
            }
          : item
      )
    );
  };

  const handleDeleteTodo = id => {
    setTodos(prev =>
      prev.map(item => ({
        ...item,
        children: item.children.filter(item => item.id !== id),
      }))
    );
  };

  const handleHideList = id => {
    const currentList = todos.find(item => item.id === id);
    setTodos(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isHide: !currentList.isHide } : item
      )
    );
  };

  const handleDeleteDoneTasks = () => {
    setTodos(prev =>
      prev.map(item => ({
        ...item,
        children: item.children.filter(item => !item.isDone),
      }))
    );
  };

  const handleDeleteAllTasks = () => {
    setTodos([]);
  };

  return (
    <div className="App">
      <img className="image" alt="plashka" src={svg} />
      <TodoForm addTodoUnit={addTodoUnit} />
      <div className="todoList">
        <TodoList
          handleHideList={handleHideList}
          addTodoItem={addTodoItem}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleDone={handleToggleDone}
          todos={todos}
        />
      </div>

      <div className="buttons">
        {!!todos.length && (
          <div className="deleteAll" onClick={handleDeleteAllTasks}>
            Delete all tasks <FaTrash />
          </div>
        )}
        {todos.some(item => item.children.some(item => item.isDone)) && (
          <div className="deleteDone" onClick={handleDeleteDoneTasks}>
            Delete all completed tasks <BiTask size={26} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
