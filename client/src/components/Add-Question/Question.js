import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; //quill`s css information
import "./question.css";
import { TagsInput } from "react-tag-input-component";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import axios from "axios";
const Question = () => {
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const navigator = useNavigate();
  const handleQuill = (value) => {
    setBody(value);
  };
  const handleTags = (value) => {
    setTags(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title !== "" && body !== "") {
      setLoading(true);
      const newQuestion = {
        user,
        title,
        body,
        tags: JSON.stringify(tags),
      };
      await axios
        .post("/api/question", newQuestion)
        .then((res) => {
          alert("added successfully");
          setLoading(false);
          navigator("/");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };
  return (
    <div className="add-question">
      <div className="add-question-container">
        <div className="head-title">
          <h1>Ask a public question</h1>
        </div>
        <div className="question-container">
          <div className="question-options">
            <div className="question-option">
              <div className="title">
                <h3>Title</h3>
                <small>
                  Be specific and imaging you are asking a question to another
                  person
                </small>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="add the question title"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Body</h3>
                <small>
                  include all the information someone would need to answer your
                  question
                </small>
                <ReactQuill
                  value={body}
                  onChange={handleQuill}
                  className="react-quill"
                  theme="snow"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Tags</h3>
                <small>
                  Add up to 5 tags to describe what your question is about
                </small>
                <TagsInput
                  value={tags}
                  onChange={handleTags}
                  name="tags"
                  placeHolder="press enter to add new tag"
                  className="tagInput"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          disabled={loading}
          className="button"
          type="submit"
          onClick={handleSubmit}
        >
          {loading ? " Add question..." : " Add your question"}
        </button>
      </div>
    </div>
  );
};

export default Question;
