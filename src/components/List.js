import React from "react";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";
import { baseURL } from "../utils/constant";

const List = ({ id, task, values, setUpdateUI, updateMode }) => {
  const removeTask = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res);
      setUpdateUI((prevState) => !prevState);
    });
  };

  return (
    <li>
      {task}
      &nbsp; &nbsp; &nbsp; &nbsp;
      {values}
      <div className="icon_holder">
        <BiEditAlt onClick={() => updateMode(id, task)} className="icon" />
        <BsTrash onClick={removeTask} className="icon" />
      </div>
    </li>
  );
};

export default List;
