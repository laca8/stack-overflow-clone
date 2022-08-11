import React from "react";
import Sidebar from "../stackOverflow/Sidebar";
import MainQuestions from "./MainQuestions";
import "../stackOverflow/css/stackOverflow.css";
const StackOverflow = () => {
  return (
    <div className="stack-index">
      <div className="stack-index-content">
        <Sidebar />
        <MainQuestions />
      </div>
    </div>
  );
};

export default StackOverflow;
