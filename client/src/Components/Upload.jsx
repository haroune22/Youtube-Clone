/* eslint-disable no-unused-vars */
import { useEffect,useState  } from "react";

import styled from "styled-components";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
  import app from "../Firebase";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
  

const Container = styled.div`
  width: 100%;
  height: 120%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 560px; 
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index:999;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h2`
  text-align: center;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;
// eslint-disable-next-line react/prop-types
const Upload = ({ setOpen }) => {

    const token = useSelector((state)=>state.user.currentUser?.token)

    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const navigate = useNavigate()
    const [imgPerc, setImgPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);

    const handleTags = (e) => {
        setTags(e.target.value.split(","));
      };
      const handleChange = (e) => {
        setInputs((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
      };

        const uploadFile = (file,urlType)=>{
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                    default:
                      break;
                  }
                },
                (error) => {},
                () => {
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => {
                      return { ...prev, [urlType]: downloadURL };
                    });
                  });
                }
              );
            };


            
            useEffect(()=>{
                
                video && uploadFile(video,"videoUrl")
            },[video])
            useEffect(()=>{
                
                img && uploadFile(img,"imgUrl")
            },[img])

        const handleUpload = async(e)=>{
            e.preventDefault()
            const res = await axios.post('http://localhost:6700/api/videos',{...inputs,tags},{headers:{token}})
setOpen(false)
res.status === 200 && navigate(`/video/${res.data._id}`)
        }

  return (
    <Container>
        <Wrapper>
            <Close onClick={()=>setOpen(false)}>X</Close>
            <Title>Upload a New Video</Title>
            <Label>Video:</Label>
            { videoPerc>0 ? ("Uploading:" + videoPerc +"%") : (<Input type="file" accept="video/*" onChange={(e)=>setVideo(e.target.files[0])}/>)}
            <Input type="text" placeholder="Title" name="title" onChange={handleChange}/>
            <Desc name="desc" rows={7} onChange={handleChange}/>
            <Input type="text" placeholder="Separate the tags with comas"onChange={handleTags}/>
            <Label>Image:</Label>
            { imgPerc>0 ? ("Uploading:" + imgPerc +"%") :(<Input type="file" accespt='image/*'onChange={(e)=>setImg(e.target.files[0])}/>)}
            <Button onClick={handleUpload}>Upload</Button>
        </Wrapper>
    </Container>
  )
}

export default Upload