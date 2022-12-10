import React,{useEffect,createContext,useReducer,useContext} from "react";
import Navbar from "./components/Navbar"
import "./App.css"


import {BrowserRouter,Route, Routes,  useNavigate} from 'react-router-dom'

import Signin from "./components/screens/SignIn"

import Signup from "./components/screens/Signup"



export const UserContext = createContext()

const Routing= ()=>{
  const history = useNavigate()
  const {state,dispatch} =useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      //history('/')
    }
    else{
        history('/signin')
    }
  },[])
 
  
  return (
    
    <Routes>
    <Route path="/" element={<Home/>}/>
   
    <Route path="/create" element={<CreatePost/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route exact path="/profile" element={<Profile/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/profile/:userid" element={<UserProfile/>}/>
     </Routes>
     
  )

}

function App() {
  const [state,dispatch] =useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
   <BrowserRouter>
   
    </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
