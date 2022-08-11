import React from "react";
import "./header.css";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Link } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigator = useNavigate();
  const user = useSelector(selectUser);
  const signOutHandler = () => {
    auth.signOut();
    navigator("/auth");
  };
  return (
    <header>
      <div className="header-container">
        <div className="header-left">
          <Link href="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/220px-Stack_Overflow_logo.svg.png"
              alt="logo"
            />
          </Link>

          <h3>Products</h3>
        </div>
        <div className="header-middle">
          <div className="header-search-container">
            <SearchIcon />
            <input type="text" placeholder="search..." />
          </div>
        </div>
        <div className="header-right">
          <div className="header-right-container">
            <span onClick={signOutHandler}>
              <Avatar src={user?.photo} />
            </span>

            <AllInboxIcon />
            <HelpIcon />
            <svg
              aria-hidden="true"
              className="svg-icon iconStackExchange"
              width="24"
              height="24"
              viewBox="0 0 18 18"
              fill="rgba(0,0,0,0.5)"
              style={{
                cursor: "pointer",
              }}
            >
              <path d="M15 1H3a2 2 0 00-2 2v2h16V3a2 2 0 00-2-2ZM1 13c0 1.1.9 2 2 2h8v3l3-3h1a2 2 0 002-2v-2H1v2Zm16-7H1v4h16V6Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
