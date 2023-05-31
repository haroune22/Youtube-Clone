/* eslint-disable no-unused-vars */
import styled, { ThemeProvider } from 'styled-components'
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/UserSlice';
import { useState } from 'react';
import Upload from './Upload';



const Container = styled.div`
position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`
const Wrapper = styled.div`
display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;


`
const Search = styled.div`
width: 40%;
position: absolute;
left: 0px;
right: 110px;
margin: auto;
display: flex;
align-items: center;
justify-content: space-between;
padding: 5px;
border: 1px solid #ccc;
border-radius: 3px;
color: ${({ theme }) => theme.text};
`
const Input = styled.input`
border: none;
background-color: transparent;
outline: none;
color: ${({ theme }) => theme.text};
`
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;
const Navbar = () => {
  const {currentUser}=useSelector((state)=>state.user)
  const [open,setOpen]=useState(false)
  const [q,setQ]=useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = (e)=>{

  dispatch(logout())
  
  }
  return (
  <>
    <Container>
      <Wrapper>
    <Search>
    <Input onChange={(e)=>setQ(e.target.value)} placeholder='Serach'/>
    <SearchOutlinedIcon onClick={()=>navigate(`/search?q=${q}`)}/>
    </Search>
  {currentUser ? (
      <User>
        <VideoCallOutlinedIcon  onClick={()=>setOpen(true)}/>
      <Avatar src={currentUser.img} />
      {currentUser.name}
    </User>
  ):(<Link to={"signin"} style={{textDecoration:'none'}}>
        <Button>
          <AccountCircleOutlinedIcon/>
          SIGN IN
        </Button>
        </Link>)}

        {currentUser && <Button onClick={handleLogout}>Logout</Button>}
      </Wrapper>
    </Container>
   { open && <Upload  setOpen={setOpen}/>}
    
    </>
  )
}

export default Navbar