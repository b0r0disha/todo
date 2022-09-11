import styles from './TodoForm.module.css';

export const TodoForm = ({ addTodoUnit }) => {
  const addUnitName = event => {
    event.preventDefault();

    const inputField = new FormData(event.target).get('unitName');
    addTodoUnit('unitName', inputField, { isDone: false, isHide: false });
    event.target.reset();
  };
  return (
    <>
      <form className={styles.unitForm} onSubmit={event => addUnitName(event)}>
        <input
          placeholder="write a unit name..."
          type="text"
          required="1"
          name="unitName"
        />
        <button type="submit">+</button>
      </form>
    </>
  );
};
