/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components'
import {useDispatch} from 'react-redux'
import {LoginFailure, LoginStart, LoginSuccess} from '../Redux/UserSlice'
import {auth,provider} from '../Firebase'
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: auto;
color: ${({ theme }) => theme.text};
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1.5px solid ${({ theme }) => theme.soft};
  padding: 10px 40px;
  gap: 10px;
`;
const Title = styled.h2`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 25px;
`;

const SignIn = () => {
  const navigate = useNavigate();
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const dispatch = useDispatch()


  const handleLogin = async(e)=>{
    e.preventDefault();
  dispatch(LoginStart())
    try {
      const res = await axios.post('http://localhost:6700/api/auth/signin',{name,password});
      dispatch(LoginSuccess(res.data))
      navigate("/")
    } catch (err) {
      dispatch(LoginFailure())
    }
  }
  const signInWithGoogle=async()=>{
   dispatch(LoginStart());
signInWithPopup(auth,provider).then((result)=>{
     axios.post('http://localhost:6700/api/auth/google',{
      name:result.user.displayName,
      email:result.user.email,
      img:result.user.photoUrl,
      
    }).then((res)=>{
      dispatch(LoginSuccess(res.data,result.user.accessToken))

    })
    })
    .catch((error)=>{
      dispatch(LoginFailure())
    })
  }
  return (
    <Container>
        <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to HarouneTube</SubTitle>
        <Input placeholder="username" onChange={e=>setName(e.target.value)}  />
        <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        
        <Title>or</Title>
        <Input placeholder="username" />
        <Input placeholder="email" onChange={e=>setEmail(e.target.value)} />
        <Input type="password" placeholder="password"onChange={e=>setPassword(e.target.value)}  />
        <Button>Sign up</Button>
        </Wrapper>
        <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  )
}

export default SignIn