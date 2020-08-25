import React, { useState, useEffect } from "react";
import ChartView from "./Chart/ChartView/chartView";
import ChartController from "./Chart/ChartController/ChartController";
import axios from "axios";

export default function ChartArea() {
  const [url, setUrl] = useState(
    "http://localhost:4000/api/getChartData/?grade=10"
  );
  const [queryParams, setQueryParams] = useState({
    grade: "10",
    language: "DE",
  });
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [chartValues, setChartValues] = useState([]);
  const [chartCategories, setChartCategories] = useState([]);
  const [grades] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [languages] = useState(["DE", "ENG"]);

  useEffect(() => {
    async function fetchChartData() {
      const result = await axios.get(url);
      setChartData(result.data);
      setLoading(false);
    }
    (async () => await fetchChartData())();
  }, [url]);

  useEffect(() => {

    function buildQueryString() {
      return Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');
    }

    setUrl(
      `http://localhost:4000/api/getChartData/${buildQueryString()}`
    )
  }, [queryParams])
  //ttest

  useEffect(() => {
    setChartValues(
      chartData.map((element) => {
        return element.amount;
      })
    );

    setChartCategories(
      chartData.map((element) => {
        return element.name;
      })
    );
  }, [chartData]);

  function handleGradeDropDown(event) {
    setQueryParams({ ...queryParams, grade: event.target.value });
    console.log(event.target.value);
  }

  function handleLangDropDown(event) {
    setQueryParams({ ...queryParams, language: event.target.value });
    console.log(event.target.value);
  }

  return (
    <div className="chartArea">
      {loading ? (
        <p> Loading.... </p>
      ) : (
          <div>
            <ChartView
              chartValues={chartValues}
              chartCategories={chartCategories}
            />
            <ChartController
              grades={grades}
              handleGradeDropDown={handleGradeDropDown}
              languages={languages}
              handleLangDropDown={handleLangDropDown}
            />
          </div>
        )}
    </div>
  );
}
