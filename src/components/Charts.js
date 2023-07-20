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
      <div className="container-fluid mt-3 mb-5 ">
        <h2 class="flex flex-col justify-center items-center pb-8 mt-10 ">
          Line Chart
        </h2>
        <Chart
          class="flex flex-col justify-center items-center bg-blue-50 mr-20 ml-20"
          type="line"
          width={900}
          height={450}
          series={sData}
          options={{
            title: { text: "Products" },
            xaxis: {
              title: { text: "Product Sold in Months" },
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
