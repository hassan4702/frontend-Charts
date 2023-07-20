import React, { useEffect, useState } from "react";
import List from "./components/List";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Linechart from "./components/Charts";

const App = () => {
  const [input, setInput] = useState("");
  const [inputText, setInputText] = useState("");
  const [values, setValues] = useState([]);
  const [task, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateID, setUpdateID] = useState(null);
  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    if (input.trim() !== "") {
      const newValues = inputText
        .split(",")
        .map((value) => parseFloat(value.trim()));
      setValues((prevArray) => [...prevArray, ...newValues]);
      setInputText("");
      axios
        .post(`${baseURL}/save`, { task: input, values: newValues })
        .then((res) => {
          console.log(res.data);
          setInput("");
          setUpdateUI((prevState) => !prevState);
        });
    }
  };

  const updateMode = (id, text,inputText) => {
    console.log(text);
    setInput(text);
    setInputText(inputText)
    setUpdateID(id);
  };
  const updateTask = () => {
    const newValues = inputText
        .split(",")
        .map((value) => parseFloat(value.trim()));
      setValues((prevArray) => [...prevArray, ...newValues]);
      setInputText("");
    axios.put(`${baseURL}/update/${updateID}`, { task: input,values:newValues }).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdateID(null);
      setInput("");
      setInputText("");
    });
  };

  return (  
    <main>
      <h1>Graph</h1>
      <div className="input_holder">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" onClick={updateID ? updateTask : addTask}>
          {updateID ? "Update task" : "Add task"}
        </button>
      </div>
      <ul>
        {task.map((task) => (
          <List
            task={task.task}
            values={task.values}
            key={task._id}
            id={task._id}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>

      <Linechart/>
    </main>
  );
};

export default App;
