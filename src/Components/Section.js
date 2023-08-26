import React, { useEffect, useState } from "react";
import axios from "axios";
import { RxDividerVertical } from 'react-icons/rx';

const Section = ({ title, clicked, setClicked }) => {
  const [books, setBooks] = useState([]);
  const [selectBook,setSelectBook]=useState("");
  const [banner,setBanner]=useState(false);

  useEffect(() => {
    const HarryPotter = async () => {
      try {
        let response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=harry+potter"
        );
        const harryPotterBooks = response.data.items;
        setBooks((prevData) => [...prevData, ...harryPotterBooks]);
      } catch (error) {
        console.error("Error fetching Harry Potter books:", error);
      }
    };

    const SherlockHolmes = async () => {
      try {
        let response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes"
        );
        const sherlockHolmesBooks = response.data.items;
        setBooks((prevData) => [...prevData, ...sherlockHolmesBooks]);
      } catch (error) {
        console.error("Error fetching Sherlock Holmes books:", error);
      }
    };

    SherlockHolmes();
    HarryPotter();
  }, []);

  const searchBooks = async (title) => {
    setClicked(false);
    try {
      let response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${title}`
      );
      const newBooks = response.data.items;
      setBooks(() => [...newBooks]);
    } catch (error) {
      console.error("Error fetching Sherlock Holmes books:", error);
    }
  };

  {
    clicked && searchBooks(title);
  }

  function bookClicked(element){
    setSelectBook(element);
    setBanner(true);
    console.log(element);
  }

  const handleReadNow = (readLink) => {
    window.open(readLink, "_blank");
  };

  const handleMoreInfo = (infoLink) => {
    window.open(infoLink, '_blank');
  };

  console.log(books);

  return (
    <div className="container">
      <div className={banner ? "banner_Section":"first_section"}>
      {
        banner===false ? (
               books && books.slice(0, 3).map((element) => (
                    <div className="main-card" key={element.id}>
                        <img src={element.volumeInfo.imageLinks.thumbnail} alt="" />
                        <div className="info">
                            <h3>{element.volumeInfo.title+"..."}</h3>
                            <span >
                            {element.volumeInfo.description+"..."}
                            </span>
                            <button
                            onClick={() => handleReadNow(element.volumeInfo.previewLink)}
                            >
                            Read Now!
                            </button>
                        </div>
                    </div>
                ))) : (
                        <div className="full_banner">
                            <div className="banner_image">
                              <img src={selectBook.volumeInfo.imageLinks.thumbnail} alt="" />
                            </div>
                            <div className="full_banner_section">
                                <div className="banner1">
                                    <div className="title">
                                        <p>{selectBook.volumeInfo.title}</p>
                                        <h4>{selectBook.volumeInfo.authors[0]}</h4>
                                    </div>
                                    <p>Published On : {selectBook.volumeInfo.publishedDate}</p>      
                                </div>
                                <div className="desc"><span>{selectBook.volumeInfo.description}</span></div>
                                <div className="details">
                                    <h3>Avg Rating : {selectBook.volumeInfo.averageRating}</h3>
                                    <RxDividerVertical className="stretch"/>
                                    <h3>Rating Count : {selectBook.volumeInfo.ratingsCount}</h3>
                                    <RxDividerVertical className="stretch"/>
                                    <h3>Publisher : {selectBook.volumeInfo.publisher}</h3>
                                    <RxDividerVertical className="stretch"/>
                                    <h3>Language : {selectBook.volumeInfo.language}</h3>
                                </div>
                                <div className="buttons">
                                    <button onClick={() => handleReadNow(selectBook.volumeInfo.previewLink)}> Read Now! </button>
                                    <button onClick={() => handleMoreInfo(selectBook.volumeInfo.infoLink)}> More Info ! </button>
                                </div>
                            </div>
                        </div>
               )
       }  
      </div>

      <h2>More Books</h2>
      <div className="second_section">
        {books &&
          books.slice(3).map((element, index) => (
            <div className="card" key={element.id}>
              <img src={element.volumeInfo.imageLinks.thumbnail} alt="" onClick={()=>bookClicked(element)}/>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Section;
