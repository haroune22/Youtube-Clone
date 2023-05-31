/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components'
import {format} from 'timeago.js'



const Container = styled.div`
width:  ${(props) => props.type !== "sm"  && "300px"};
margin-bottom: ${(props) => props.type === "sm" ? "10px" : "45px"};
cursor:pointer;
display: ${(props) => props.type === "sm" && "flex"};
gap: 10px;
`
const Img = styled.img`
width: ${(props) => props.type === "sm" ? "70%" : "99%"};;
height: ${(props) => (props.type === "sm" ? "140px" : "202px")};
background-color:#999;
margin-top:  ${(props) => props.type === "sm" && "5px"};
flex:1;
`
const Details= styled.div`
display: flex;
margin-top:${(props) => props.type === "sm" ? "0px" :"16px"};
margin-bottom:${(props) => props.type === "sm" ? "10px" :"16px"};
gap: 12px;
flex: 1;
`
const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;
const Texts = styled.div``;

const Title = styled.h1`
  font-size:${(props) => props.type === "sm" ? "16px" : "14px"};
  height:${(props) => props.type === "sm" && "10px"};
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color:${({ theme }) => theme.textSoft};
  margin: 4px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`

// eslint-disable-next-line react/prop-types
const Card = ({type,video}) => {

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`http://localhost:6700/api/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
    <Container type={type}>
        <Img type={type} src={video.imgUrl}/>
        <Details type={type}>
            <ChannelImage  type={type}
      src={channel.img}/>
            <Texts>
                <Title>
                   {video.title}
                </Title>
                <ChannelName>
                {channel.name}
                    </ChannelName>
                    <Info> {video.views} • {format(video.createdAt)}</Info>
            </Texts>
        </Details>
    </Container>
    </Link>
  )
}

export default Card