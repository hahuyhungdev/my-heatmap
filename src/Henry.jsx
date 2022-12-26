import React, { memo, useCallback, useMemo, useState } from "react";
import { Test } from "./components";
const expensive = (count) => {
  console.log("Calculating...");
  for (let i = 0; i < 1000000000; i++) {
    count += 1;
  }
  console.log("Done calculating");
  return count;
};
const Henry = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(["Learn React", "Learn Next.js"]);
  const [dates, setDates] = useState([]);
  // const calculationResult = useMemo(() => expensive(count), [count]);
  // const calculationResult = expensive(count);

  const increment = () => {
    console.log("increment");
    setCount(count + 1);
  };

  // handle addTodo
  const addTodo = useCallback(() => {
    setTodos([...todos, "Learn React Native"]);
  }, [todos]);
  // const addTodo = () => {
  //   setTodos([...todos, "Learn React Native"]);
  // };
  // deleteTodo
  const deleteTodo = useCallback(
    (index) => {
      console.log("deleteTodo");
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    },
    [todos]
  );

  console.log("render");
  return (
    <div className="main">
      <div className="showResult">
        <p>Count: {count}</p>
        {/* <p>Calculation Result: {calculationResult}</p> */}
      </div>
      <div className="button">
        <button onClick={increment}>Increment</button>
      </div>
      <Test dates={dates} />
      <Todos todos={todos} deleteTodo={deleteTodo} addTodo={addTodo} />
    </div>
  );
};
const Todos = memo(({ todos, deleteTodo, addTodo }) => {
  console.log("todos render");
  return (
    <div>
      <h1>Todos</h1>
      <button onClick={addTodo}>Add Todo</button>
      {todos.map((todo, index) => (
        <div onClick={() => deleteTodo(index)} key={index}>
          {todo}
        </div>
      ))}
    </div>
  );
});

export default Henry;
