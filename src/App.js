import React, { useEffect, useState } from "react";
import List from "./components/List";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Linechart from "./components/Charts";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [input, setInput] = useState("");
  const [inputText, setInputText] = useState("");
  const [values, setValues] = useState([]);
  const [task, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateID, setUpdateID] = useState(null);
  useEffect(() => {
    // axios.get(`${baseURL}/get`).then((res) => {
    //   console.log(res.data);
    //   setTasks(res.data);
    // });
    fetchData();
  }, [updateUI]);

  const fetchData = async () => {
    const reqData = await axios.get(`${baseURL}/get`);
    const resData = reqData.data;
    setTasks(resData);
    const fetchedValues = resData.map((item) => ({
      name: item.task,
      data: item.values,
    }));
    setValues(fetchedValues);
  };

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
          setInputText("");
          setUpdateUI((prevState) => !prevState);
        });
    }
  };

  const updateMode = (id, text, inputText) => {
    console.log(text);
    setInput(text);
    setInputText(inputText);
    setUpdateID(id);
  };
  const updateTask = () => {
    const newValues = inputText
      .split(",")
      .map((value) => parseFloat(value.trim()));
    setValues((prevArray) => [...prevArray, ...newValues]);
    setInputText("");
    axios
      .put(`${baseURL}/update/${updateID}`, { task: input, values: newValues })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setUpdateID(null);
        setInput("");
        setInputText("");
      });
  };

  return (
    <main>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pt-5">
          Graph
        </h2>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Name of the line
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Values (add comma after each value)
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={updateID ? updateTask : addTask}
          >
            {updateID ? "Update Line" : "Add Line"}
          </button>
        </div>
      </form>
      <div className="mt-5"></div>

      <div className="graph-table-container">
        <Table striped bordered hover className=" bg-blue-50 rounded-lg">
          <thead>
            <tr>
              <th>Name of the Line</th>
              <th>Values</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </Table>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <Linechart values={values} />
    </main>
  );
};

export default App;
