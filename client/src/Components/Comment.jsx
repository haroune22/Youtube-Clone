/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components'
import { useMutation } from '@tanstack/react-query';


const Container = styled.div`
display: flex;
  gap: 10px;
  margin: 30px 0px;
`
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Details = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
color: ${({ theme }) => theme.text}
`
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;
const Comment = ({comment}) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`http://localhost:6700/api/users/find/${comment.userId}`);
      setChannel(res.data)
    };
    fetchComment();
  }, [comment.userId]);

  return (
    <Container>
        <Avatar src={channel.img} />
        <Details>
            <Name>{channel.name}
                <Date>
                    1 day ago
                </Date>
                </Name>
                <Text>
                   {comment.desc}
                </Text>
        </Details>
    </Container>
  )
}

export default Comment