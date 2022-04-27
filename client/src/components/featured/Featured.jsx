import { InfoOutlined, PlayArrowRounded } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./featured.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { configHeaderToken } from "./../../assets/js/configHeaderToken";
import { capitalizeFirstLetter } from "./../../assets/js/capitalizeFirstLetter";

function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(
          `movies/random${type ? "?type=" + type : ""}`,
          configHeaderToken
        );
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{capitalizeFirstLetter(type)}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genres</option>
            <option value="adventure">Adventure</option>
            <option value="action">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="drama">Drama</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <div className="linear"></div>
      <img width="100%" src={content.img} alt="" />
      <div className="info">
        <div className="title">{content.title}</div>
        <div className="desc">{content.desc}</div>
        <div className="buttons">
          <button className="play">
            <PlayArrowRounded className="icon" />
            <Link to={{ pathname: "/watch" }} state={{ movie: content }}>
              <span>Play</span>
            </Link>
          </button>
          <button className="more">
            <InfoOutlined className="icon" />
            <span>More Info</span>
          </button>
        </div>
      </div>
      <div className="fadeBottom"></div>
    </div>
  );
}

export default Featured;