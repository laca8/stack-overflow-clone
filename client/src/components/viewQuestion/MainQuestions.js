import { Avatar, Link } from "@mui/material";
import React, { useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HistoryIcon from "@mui/icons-material/History";
import ReactQuill from "react-quill";
import ReactHtmlParser from "react-html-parser";
import "./index.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
const MainQuestions = () => {
  const user = useSelector(selectUser);
  const [show, setShow] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const [answer, setAnswer] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");
  const fetchQuestionById = async (id) => {
    try {
      const res = await axios.get(`/api/question/${id}`);
      console.log(res.data);
      setQuestionData(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchQuestionById(id);
  }, [id]);
  const handleAnswer = (value) => {
    setAnswer(value);
  };
  const handleSubmitAnswer = async (e) => {
    e.preventDefault();

    if (answer !== "") {
      setLoading(true);
      const newAnswer = {
        user,
        answer,
        question_id: id,
      };
      const config = {
        "Content-Type": "application/json",
      };
      await axios
        .post("/api/answer", newAnswer, config)
        .then((res) => {
          alert("added successfully");
          setAnswer("");
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };
  //add comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (comment !== "") {
      setLoading(true);
      const newComment = {
        user,
        question_id: id,
        comment,
      };
      const config = {
        "Content-Type": "application/json",
      };
      await axios
        .post(`/api/comment/${id}`, newComment, config)
        .then((res) => {
          alert("added successfully");
          setComment("");
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">{questionData?.title}</h2>
          <Link href="/add-question">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="main-desc">
          <div className="info">
            <p>{new Date(questionData?.created_at).toLocaleString()}</p>
            <p>
              Active <span>today</span>
            </p>
            <p>
              viewed <span>32 times</span>
            </p>
          </div>
        </div>
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="arrow">▲</p>

                <p className="arrow">0</p>

                <p className="arrow">▼</p>

                <BookmarkIcon />

                <HistoryIcon />
              </div>
            </div>
            <div className="question-answer">
              <p>{ReactHtmlParser(questionData?.body)}</p>
              <div className="author">
                <small>asked 'Timestamp'</small>
                <div className="author-details">
                  <Avatar src={questionData?.user?.photo} />
                  <p>
                    {questionData?.user?.displayName
                      ? questionData?.user?.displayName
                      : String(questionData?.user?.email).split("@")[0]}
                  </p>
                </div>
              </div>
              <div className="comments">
                {questionData?.comment?.map((c) => (
                  <div className="comment">
                    <p>
                      {c.comment}{" "}
                      <span>
                        {" "}
                        {c?.user?.displayName
                          ? c?.user?.displayName
                          : String(c?.user?.email).split("@")[0]}
                      </span>
                      <small>{new Date(c?.created_at).toLocaleString()}</small>
                    </p>
                  </div>
                ))}
                <p onClick={() => setShow(!show)}>Add a comment</p>
                {show && (
                  <div className="title">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Add your comment."
                      rows={5}
                      style={{
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0,0,0,0.2)",
                        borderRadius: "3px",
                        outline: "none",
                      }}
                    ></textarea>
                    <button
                      disabled={loading}
                      type="submit"
                      onClick={handleSubmitComment}
                      style={{ maxWidth: "fit-content" }}
                    >
                      {loading ? "Add comment...." : "Add your comment"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="all-questions" style={{ flexDirection: "column" }}>
          <p
            style={{
              marginBottom: "20px",
              fontSize: "1.3rem",
              fontWeight: "300",
            }}
          >
            {questionData?.answer?.length} Answers
          </p>
          {questionData?.answer?.map((a, index) => (
            <div
              className="all-questions-container"
              key={index}
              style={{ marginTop: "10px" }}
            >
              <div className="all-questions-left">
                <div className="all-options">
                  <p className="arrow">▲</p>

                  <p className="arrow">{++index}</p>

                  <p className="arrow">▼</p>

                  <BookmarkIcon />

                  <HistoryIcon />
                </div>
              </div>
              <div className="question-answer">
                <p>{ReactHtmlParser(a?.answer)}</p>
                <div className="author">
                  <small>
                    {" "}
                    <p>{new Date(a?.created_at).toLocaleString()}</p>
                  </small>
                  <div className="author-details">
                    <Avatar src={a?.user?.photo} />
                    <p>
                      {a?.user?.displayName
                        ? a?.user?.displayName
                        : String(a?.user?.email).split("@")[0]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="main-answer">
        <h3 style={{ fontSize: "22px", margin: "10px 0", fontWeight: "400" }}>
          Your Answer
        </h3>
        <ReactQuill
          value={answer}
          onChange={handleAnswer}
          className="react-quill"
          theme="snow"
          style={{ height: "200px" }}
        />
      </div>
      <button
        disabled={loading}
        type="submit"
        onClick={handleSubmitAnswer}
        style={{ marginTop: "100px", maxWidth: "fit-content" }}
      >
        {loading ? "  Post Answer...." : "  Post Your Answer"}
      </button>
    </div>
  );
};

export default MainQuestions;
