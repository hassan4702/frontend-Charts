import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function Linechart({ values }) {
  const [sData, setSdata] = useState([]);

  useEffect(() => {
    setSdata(values);
    fetchData(); // Fetch data when the component mounts
  }, [values]);

  const fetchData = async () => {
    const newValues = [];
    const reqData = await fetch(
      "https://backend-charts-production-4886.up.railway.app/api/get"
    );
    const resData = await reqData.json();

    for (let i = 0; i < resData.length; i++) {
      newValues.push({ name: resData[i].task, data: resData[i].values });
    }

    setSdata(newValues);
  };
  //

  //
  return (
    <React.Fragment>
      <div className="container-fluid mt-3 mb-5 flex flex-col justify-center items-center">
        <h2 className="flex flex-col justify-center items-center pb-8 mt-10">
          Line Chart
        </h2>
        <Chart
          className=" bg-blue-50 absolute rounded-lg "
          type="line"
          width={850}
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
