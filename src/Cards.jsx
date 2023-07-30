import { useState, useEffect } from "react";
import { Row } from "antd";
import MediaCard from "./MediaCard";

export default function Cards({ search }) {
  const [data, setData] = useState([]);
  const basePath = "https://api.themoviedb.org/3";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDA5MzViOTkyM2M5MGRjNzBkMTBlNGFlNmFmZDFiNSIsInN1YiI6IjY0YjliZWNjNGQyM2RkMDBjODE0MjMwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YJ3hq9ouwBqdPSGowrWy6OSh__Clwjbr00CnSBtLlk0",
    },
  };

  const fecthData = () => {
    if (!search) {
      fetch(`${basePath}/trending/all/week`, options)
        .then((response) => response.json())
        .then((response) => {
          setData(response.results);
        })
        .catch((err) => console.error(err));
    } 
    else {
      fetch(`${basePath}/search/multi?query=${search}`, options)
      .then((response) => response.json())
      .then((response) => {
        setData(response.results);
      })
      .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fecthData();
  }, [search]);

  return (
    <>
      <div style={{ background: "#fff", padding: "24px 0" }}>
        <Row gutter={[16, 16]} justify="center">
          {data.map((media) => (
            <MediaCard media={media} mediaType={media.media_type} />
          ))}
        </Row>
      </div>
    </>
  );
}
