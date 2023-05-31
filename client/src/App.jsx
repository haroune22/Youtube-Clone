/* eslint-disable no-unused-vars */
import styled, { ThemeProvider } from 'styled-components'
import Menu from './Components/Menu'
import Navbar from './Components/Navbar'
import { darkTheme, lightTheme } from './utils/theme'
import { useState } from 'react'
import {
 BrowserRouter,
 Route,
 Router,
 Routes
} from "react-router-dom";
import Home from './Pages/Home'
import Video from './Pages/Video'
import SignIn from './Pages/SignIn'
import Search from './Pages/Search'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const Container = styled.div`
display:flex;

`
const Main = styled.div`
background-color:${({theme})=>theme.bg};
flex:7;
`
const Wrapper = styled.div`
padding:22px 27px;
`
function App() {
  const queryClient = new QueryClient()
// eslint-disable-next-line no-unused-vars
const [darkMode,setDarkMode]=useState(true)
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
        <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
        <Main>
          <Navbar/>
          <Wrapper>
          <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="sub" element={<Home type="sub" />} />
                  <Route path="search" element={<Search/>} />
                
                  <Route
                    path="signin"
                    element={<SignIn />}
                  />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
          </Wrapper>
        </Main>
        </BrowserRouter>
      </Container>
      </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
