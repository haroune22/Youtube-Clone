/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import  Card  from "../Components/Card"
import styled from 'styled-components'
import axios from 'axios'
import { useSelector } from "react-redux"
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`
// eslint-disable-next-line react/prop-types
const Home = ({type}) => {

  const [videos,setVideos]=useState([])
const token = useSelector((state)=>state.user.currentUser?.token)
useEffect(() => {
  const fetchVideos = async () => {
    try {
      const config = type === "sub" ? { headers: { token } } : {};
      const res = await axios.get(`http://localhost:6700/api/videos/${type}`, config);
      setVideos(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchVideos();
}, [type, token]);
  return (
    <Container>
    {videos.map((video)=>(
      <Card key={video._id} video={video}/>         
    ))}
    </Container>
  )
}

export default Home