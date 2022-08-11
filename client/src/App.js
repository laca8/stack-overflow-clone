import "./App.css";
import React, { useEffect } from "react";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StackOverflow from "./components/stackOverflow/StackOverflow";
import Question from "./components/Add-Question/Question";
import ViewQuestions from "./components/viewQuestion/ViewQuestions";
import Auth from "./components/Auth/Index";
import { auth } from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
function App() {
  const user = useSelector(selectUser);
  //console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<StackOverflow />} />
          <Route
            exact
            path={"/add-question"}
            element={user ? <Question /> : <Auth />}
          />
          <Route
            path={"/question"}
            element={user ? <ViewQuestions /> : <Auth />}
          />
          <Route path="/auth" element={user ? <StackOverflow /> : <Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
