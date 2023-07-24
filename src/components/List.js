
// import React, { useEffect } from "react";
// import { BsTrash } from "react-icons/bs";
// import { BiEditAlt } from "react-icons/bi";
// import axios from "axios";
// import { baseURL } from "../utils/constant";

// const List = ({ id, task, values, setUpdateUI, updateMode }) => {
//   const removeTask = () => {
//     axios.delete(`${baseURL}/delete/${id}`).then((res) => {
//       console.log(res);
//       setUpdateUI((prevState) => !prevState);
//     });
//   };

//   useEffect(() => {
//     // Set up an interval to refresh the data every 5 seconds (adjust the interval as needed).
//     const interval = setInterval(() => {
//       // Call the function to update the UI data
//       setUpdateUI((prevState) => !prevState);
//     }, 5000); // 5000 milliseconds = 5 seconds

//     // Clear the interval when the component is unmounted to prevent memory leaks.
//     return () => clearInterval(interval);
//   }, [setUpdateUI]);

//   return (
//     <li>
//       {task}
//       &nbsp; &nbsp; &nbsp; &nbsp;
//       {values}
//       <div className="icon_holder">
//         <BiEditAlt onClick={() => updateMode(id, task)} className="icon" />
//         <BsTrash onClick={removeTask} className="icon" />
//       </div>
//     </li>
//   );
// };

// export default List;

import React, { useEffect } from "react";
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

  useEffect(() => {
    // Set up an interval to refresh the data every 5 seconds (adjust the interval as needed).
    const interval = setInterval(() => {
      // Call the function to update the UI data
      setUpdateUI((prevState) => !prevState);
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clear the interval when the component is unmounted to prevent memory leaks.
    return () => clearInterval(interval);
  }, [setUpdateUI]);

  return (
    <tr>
      <td>{task}</td>
      <td>{values}</td>
      <td>
        <div className="icon_holder">
          <BiEditAlt onClick={() => updateMode(id, task)} className="icon" />
          <BsTrash onClick={removeTask} className="icon" />
        </div>
      </td>
    </tr>
  );
};

export default List;
