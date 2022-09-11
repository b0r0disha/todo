import {
  IoFolder,
  IoChevronDownOutline,
  IoChevronUpOutline,
} from 'react-icons/io5';
import { TodoItem } from './TodoItem';
import styles from './TodoList.module.css';

export const TodoList = ({
  todos,
  addTodoItem,
  handleToggleDone,
  handleDeleteTodo,
  handleHideList,
}) => {
  const addTodo = (event, id) => {
    event.preventDefault();

    const inputField = new FormData(event.target).get('text');
    addTodoItem(inputField, id);
    event.target.reset();
  };

  return todos.map((item, index) => {
    return (
      <div key={index}>
        <div className={styles.unitName}>
          <IoFolder size={23} style={{ color: '#413F3F66' }} />
          <p>{item.unitName}</p>
          <div className={styles.line}></div>
          {item.isHide ? (
            <IoChevronDownOutline onClick={() => handleHideList(item.id)} />
          ) : (
            <IoChevronUpOutline onClick={() => handleHideList(item.id)} />
          )}
          {item.isHide && (
            <div className={styles.number}>{item.children.length}</div>
          )}
        </div>

        {!item.isHide && (
          <>
            <TodoItem
              key={item.id}
              todoItems={item.children}
              handleToggleDone={handleToggleDone}
              handleDeleteTodo={handleDeleteTodo}
            />
            <form
              className={styles.listForm}
              onSubmit={event => addTodo(event, item.id)}
            >
              <input
                className={styles.input}
                type="text"
                required="1"
                name="text"
                placeholder="write a task..."
              />
              <button type="submit">+</button>
            </form>
          </>
        )}
      </div>
    );
  });
};
