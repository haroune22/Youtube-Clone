/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled, { ThemeProvider } from 'styled-components'
import Comment from './Comment'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {
  useMutation,
  useQuery
} from '@tanstack/react-query'




const Container = styled.div``
const NewComment = styled.div`
display: flex;
  align-items: center;
  gap: 10px;
`
const Avatar = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`
const Input = styled.input`
border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`
const Button=styled.button`
width:70px;
color:${({ theme }) => theme.text};
height:80%;
border:1px solid ${({ theme }) => theme.soft};
background-color: transparent;

` 
const VideoComment = styled.div`
color:${({ theme }) => theme.text};
`




const Comments = ({videoId}) => { 
  const { currentUser } = useSelector((state) => state.user);
  const token = useSelector((state) => state.user?.currentUser?.token);
const [comments, setComments] = useState([]);
const [comment, setComment] = useState("");

useEffect(() => {
  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:6700/api/comments/${videoId}`);
    const sortedComments = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setComments(sortedComments);
  };

  fetchComments();
}, [videoId, comments]);

      const { mutate } = useMutation((comment) =>
      axios.post("http://localhost:6700/api/comments", comment, { headers: { token } })
    );
    
    const addComment = async (e) => {
      e.preventDefault();
      try {
        await mutate({ desc: comment, videoId: videoId });
      } catch (err) {
        console.log(err);
      }
    };
  return (
    <Container>
        <NewComment>
            <Avatar src={currentUser?.img}/>
            <Input placeholder='add a comment' onChange={(e)=>setComment(e.target.value)}/>
           {comment.length >1 && <Button onClick={addComment}>Send</Button> } 
        </NewComment>
       <VideoComment>
        <h3>{comments.length}  Commnets</h3>
        {Array.isArray(comments) && comments.map(comment => (
  <Comment key={comment._id} comment={comment} />
))}
       </VideoComment>
    </Container>
  )
}

export default Comments