import React from "react";
import { FiSearch } from "react-icons/fi";

const Navbar = ({search,setSearch,setClicked}) => {
  

  return (
    <div className="nav">
      <div className="left_nav">
        <img src="./images/logo.png" alt="logo" />
        <img id="name" src="./images/name.png" alt="company name" />
      </div>
      <div className="right_nav">
        <div className="search">
            <div className="searchbar">
            <FiSearch />
            <input
                type="text"
                placeholder="Search for the book you want to read it now... sherlock Holmes,Harry Pot..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            </div>
            <button className="btn" onClick={()=>setClicked(true)} >Search</button>
        </div>
        <div className="icons">
            <img src="./images/book.png" alt="book" />
            <img src="./images/notify.png" alt="notify" />
            <img src="./images/diamond.png" alt="diamond" />
            <img className="myPic" src="./images/pic.jpg" alt="pic" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
