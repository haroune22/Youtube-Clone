/* eslint-disable no-unused-vars */
import styled, { ThemeProvider } from 'styled-components'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Card from "../Components/Card";
import Comments from '../Components/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState,useEffect  } from 'react';
import axios from 'axios';
import { dislike, fetchFailure, fetchStart, fetchSuccess, like } from '../Redux/VideoSlice';
import {format } from 'timeago.js'
import { subscription } from '../Redux/UserSlice';
import Recommendation from '../Components/Recommendation';

const Container = styled.div`
display:flex;
gap:24px;
`
const Content = styled.div`
flex:4.3;
`
const VideoWrapper = styled.div`
`;
const Title = styled.h1`
font-size: 18px;
font-weight: 400;
margin-top: 20px;
margin-bottom: 10px;
color: ${({ theme }) => theme.text};
`
const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`
const Info = styled.span`
color: ${({ theme }) => theme.textSoft};

`
const Buttons = styled.div`
display: flex;
gap: 20px;
color: ${({ theme }) => theme.text};
`
const Button = styled.div`
display: flex;
align-items: center;
gap: 4px;
cursor: pointer;
`
const Hr = styled.hr`
margin: 15px 0px;
border: 0.5px solid ${({ theme }) => theme.soft};
`


const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;
const Subscribe = styled.button`
background-color: #cc1a00;
font-weight: 500;
color: white;
border: none;
border-radius: 4px;
height: max-content;
padding: 10px 20px;
cursor: pointer;
`;


const VideoFrame = styled.video`
  max-height: 580px;
  width: 100%;
  object-fit: cover;
`;



const Video = () => {
  const token = useSelector((state)=>state.user.currentUser?.token)
  const {currentUser} = useSelector((state)=>state.user)
  const {Video} = useSelector((state)=>state.video)
  const dispatch = useDispatch()
  const path  = useLocation().pathname.split("/")[2];

  const [channel,setChannel]= useState({})
 useEffect(()=>{
  const addview =async()=>{
    await axios.put(`http://localhost:6700/api/videos/view/${Video._id}`)
  }
  addview()
 },[Video._id])
  useEffect(()=>{
    
    const fetchData= async()=>{
      dispatch(fetchStart())
      try {
        const videoRes = await axios.get(`http://localhost:6700/api/videos/find/${path}`)
        const channelRes = await axios.get(`http://localhost:6700/api/users/find/${videoRes.data.userId}`)
        dispatch(fetchSuccess(videoRes.data))
        setChannel(channelRes.data)
      } catch (error) {
       dispatch(fetchFailure())
      }
    }
    fetchData()
    },[path,dispatch])

    const handleLike = async()=>{
    
      await axios.put(`http://localhost:6700/api/users/like/${Video._id}`,{},{ headers: {token}} )
      dispatch(like(currentUser._id))
      }
      const handleDislike = async()=>{
        await axios.put(`http://localhost:6700/api/users/dislike/${Video._id}`,{},{headers:{token}})
        dispatch(dislike(currentUser._id))
      }
      const handleSub = async()=>{
        currentUser.subscribedUsers.includes(channel._id) && currentUser._id ===channel._id ?
        await axios.put(`http://localhost:6700/api/users/unsub/${channel._id}`,{},{headers:{token}}) :
        await axios.put(`http://localhost:6700/api/users/sub/${channel._id}`,{},{headers:{token}})
        dispatch(subscription(channel._id))
      }
     
  return (
    <Container>
      <Content>
      <VideoWrapper>
       <VideoFrame controls src={Video?.videoUrl}/>
        </VideoWrapper>
        <Title>{Video?.title}</Title>
        <Details>
          <Info>
          {Video?.views} views •{format(Video?.createdAt)}
            </Info>  
            <Buttons>
            <Button onClick={handleLike}>
  {Video.likes?.includes(currentUser?._id) ? (
    <ThumbUpIcon color="primary" />
  ) : (
    <ThumbUpAltOutlinedIcon />
  )}{" "}
  {Video?.likes?.length}
</Button>
<Button onClick={handleDislike}>
  {Video.dislikes?.includes(currentUser?._id) ? (
    <ThumbDownIcon color="primary" />
  ) : (
    <ThumbDownOffAltOutlinedIcon />
  )}{" "}
  Dislike
</Button>
              <Button>
                <ReplyOutlinedIcon/> Share
              </Button>
              <Button>
                <AddTaskOutlinedIcon/> Save
              </Button>
              </Buttons>      
          </Details>
          <Hr/>
          <Channel>
            <ChannelInfo>
            <Image src={channel?.img} />
            <ChannelDetail>
              <ChannelName> {channel?.name}</ChannelName>
              <ChannelCounter>{channel?.subscribers} subscribers</ChannelCounter>
              <Description>
               {Video?.desc}
              </Description>
            </ChannelDetail>
            </ChannelInfo>
              <Subscribe onClick={handleSub}> {currentUser?.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
              </Subscribe>
          </Channel>
          <Hr/>
          <Comments videoId={Video._id}/>
        
      </Content>
      <Recommendation tags={Video.tags} VideoId={Video._id}/>
      
    </Container>
  )
}

export default Video