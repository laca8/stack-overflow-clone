import React from "react";
import PublicIcon from "@mui/icons-material/Public";
import StarsIcon from "@mui/icons-material/Stars";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import "./css/sidebar.css";
import { Link } from "@mui/material";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-options">
          <div className="sidebar-option">
            <Link href="/">Home</Link>

            {/* <a href="/">Home</a> */}
          </div>
          <div className="sidebar-option">
            <p>PUBLIC</p>
            <div className="link">
              <div className="link-tag">
                <PublicIcon />
                <Link href="/">Question</Link>

                {/* <a href="/">Question</a> */}
              </div>

              <div className="tags">
                <p>Tags</p>
                <p>Users</p>
              </div>
            </div>
          </div>
          <div className="sidebar-option">
            <p>COLLECTIVES</p>
            <div className="link">
              <div className="link-tag">
                <StarsIcon />
                <Link href="/">Explore Collectives</Link>

                {/* <a href="/">Explore Collectives</a> */}
              </div>
            </div>
          </div>
          <div className="sidebar-option">
            <p>FIND A JOB</p>
            <div className="link">
              <Link
                style={{
                  margin: "10px 20px",
                }}
                href="/"
              >
                Jobs
              </Link>
              {/* <a
              style={{
                margin: "10px 20px",
              }}
              href="/"
            >
              Jobs
            </a> */}
              {/* <a
              style={{
                marginLeft: "20px",
              }}
              href="/"
            >
              Companies
            </a> */}
              <Link
                style={{
                  marginLeft: "20px",
                }}
                href="/"
              >
                Companies
              </Link>
            </div>
          </div>
          <div className="sidebar-option">
            <p>TEAMS</p>
            <div className="link-tag">
              <AssuredWorkloadIcon />
              <Link href="/">Companies</Link>
              {/* <a href="/">Companies</a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
