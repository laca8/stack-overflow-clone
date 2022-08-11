import React from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import "./css/stackOverflow.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const StackOverflow = () => {
  const [questions, setQuestions] = useState([]);
  const fetchQuestions = async () => {
    try {
      const res = await axios.get("/api/question");
      console.log(res);
      setQuestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);
  return (
    <div className="stack-index">
      <div className="stack-index-content">
        <Sidebar />
        <Main questions={questions} />
      </div>
    </div>
  );
};

export default StackOverflow;
