import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function Linechart() {
  const [sData, setSdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newValues = [];
      const reqData = await fetch("http://localhost:8000/api/get");
      const resData = await reqData.json();

      for (let i = 0; i < resData.length; i++) {
        newValues.push({ name: resData[i].task, data: resData[i].values });
      }

      setSdata(newValues);
    };

    const interval = setInterval(fetchData, 1000); 

    return () => {
      clearInterval(interval); 
    };
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid mt-3 mb-3">
        <h2>Line Chart - Using Apexcharts in React</h2>
        <Chart
          type="line"
          width={1450}
          height={550}
          series={sData}
          options={{
            title: { text: "Product sell in 2021" },
            xaxis: {
              title: { text: "Product Sell in Months" },
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
            yaxis: {
              title: { text: "Product in K" },
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default Linechart;
