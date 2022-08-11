import React from "react";
import ReactHtmlParser from "react-html-parser";
import { Link } from "@mui/material";
import { Avatar } from "@mui/material";
import "./css/allQuestions.css";
const AllQuestions = ({ q }) => {
  //console.log(q?.tags[0]);
  const tags = JSON.parse(q.tags);
  //console.log(tags);
  return (
    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            <div className="all-option">
              <p>0</p>
              <span>votes</span>
            </div>
            <div className="all-option">
              <p>{q?.answer?.length}</p>
              <span>answers</span>
            </div>
            <div className="all-option">
              <small>0 views</small>
            </div>
          </div>
        </div>

        <div className="question-answer">
          <Link href={`/question?q=${q?._id}`}>{q?.title}</Link>
          <div style={{ width: "90%" }}>
            <div>{ReactHtmlParser(q?.body)}</div>
          </div>
          <div style={{ display: "flex" }}>
            {tags.map((tag) => (
              <span className="question-tags">{tag}</span>
            ))}
          </div>
          <div className="author">
            <small>{new Date(q?.created_at).toLocaleString()}</small>
            <div className="author-details">
              <Avatar src={q?.user?.photo} />
              <p>
                {q?.user?.displayName
                  ? q?.user?.displayName
                  : String(q?.user?.email).split("@")[0]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllQuestions;
