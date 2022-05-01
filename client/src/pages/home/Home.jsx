import React, { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Footer from "../../components/footer/Footer";
import { axiosInstance } from "../../utils/axiosInstance";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRandomLists = async () => {
      setIsLoading(true);
      if (genre) {
        setIsLoading(false);
      }
      if (!type) {
        setGenre(null);
        setIsLoading(true);
      }
      try {
        const result = await axiosInstance.get(
          `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`
        );
        setLists(result.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <Featured type={type} setGenre={setGenre} />
          <div className="listContainerMid">
            {lists.map((list, key) => (
              <List list={list} key={key} />
            ))}
          </div>
          <div className={lists.length === 0 ? "lists_null" : ""}>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
