import { IoCheckmarkSharp } from 'react-icons/io5';
import { FaTrash } from 'react-icons/fa';
import styles from './TodoItem.module.css';

export const TodoItem = ({ todoItems, handleToggleDone, handleDeleteTodo }) => {
  return (
    <>
      <ul className={styles.list}>
        {todoItems.map(item => (
          <li key={item.id} className={item.isDone ? styles.isDone : ''}>
            <div
              className={item.isDone ? styles.checkboxIsDone : styles.checkbox}
              onClick={() => handleToggleDone(todoItems, item.id)}
            >
              {item.isDone && <IoCheckmarkSharp style={{ color: '#F4F4F4' }} />}
            </div>
            {item.todoName}
            <FaTrash
              className={styles.todoButton}
              type="button"
              onClick={() => handleDeleteTodo(item.id)}
            >
              x
            </FaTrash>
          </li>
        ))}
      </ul>
    </>
  );
};
