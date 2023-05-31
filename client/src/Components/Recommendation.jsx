/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components"
import Card from "./Card";


const Container = styled.div`
flex:2;
`
const Recommendation = ({tags,VideoId}) => {

        const [videos, setVideos] = useState([]);
      
        useEffect(() => {
          const fetchVideos = async () => {
            const res = await axios.get(`http://localhost:6700/api/videos/tags?tags=${tags}`);
            setVideos(res.data);
          };
          fetchVideos();
        }, [tags])
  return (
    <Container>
        {videos.map((video) => (
            VideoId !== video._id &&
       ( <Card type="sm" key={video._id} video={video} />)
      ))}
    </Container>
  )
}

export default Recommendation
