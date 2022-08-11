import React from "react";
import "./css/main.css";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Link } from "@mui/material";
import AllQuestions from "./AllQuestions";
const Main = ({ questions }) => {
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2>All Questions</h2>
          <Link href="/add-question">
            <button>Ask Question</button>
          </Link>

          {/* <a href="/add-question"> */}

          {/* </a> */}
        </div>
        <div className="main-desc">
          <p>{questions && questions.length} Questions</p>
          <div className="main-filter">
            <div className="main-tabs">
              <div className="main-tab">
                {/* <a href="/">Newest</a> */}
                <Link href="/">Newest</Link>
              </div>
              <div className="main-tab">
                <Link href="/">Active</Link>

                {/* <a href="/">Active</a> */}
              </div>
              <div className="main-tab">
                {/* <a href="/">More</a> */}
                <Link href="/">More</Link>
              </div>
            </div>
            <div className="main-filter-item">
              <FilterListIcon />
              <p>Filter</p>
            </div>
          </div>
        </div>
        <div className="questions">
          {questions &&
            questions?.map((q, index) => (
              <div className="question" key={q._id}>
                <AllQuestions q={q} index={index} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
