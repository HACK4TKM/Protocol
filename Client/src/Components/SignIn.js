import React,{useState,useContext} from "react"
import {Link,useNavigate} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
const SignIn = ()=>{
    
    const {state,dispatch} =useContext(UserContext)


    const history=useNavigate()
    
    const [password,setPassword]= useState("")
    const [email,setEmail]= useState("")
    const PostData=()=>{
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {  M.toast({html:"invalid email", classes:"#c62828 red darken-3"})
            return
    }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
                
            },
            body:JSON.stringify({
                
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Signed In successfully", classes:"#43a047 green darken-1"})
                history('/')

            }
        }).catch(err=>{
            console.log(err)
        })
    
    }
    return(
       <div className="mycard">
        <div className="card auth-card">
        <a href="https://ibb.co/PGFLc4v"><img src="https://i.ibb.co/TMYf4Rx/pa-2.jpg" alt="pa-2" style={{width:"350px"}} /></a>
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button className="btn waves-effect"
            onClick={()=>PostData()}
            >Login</button>
            <h5>
                <Link to="/signup">Create account</Link>
            </h5>
        </div>
        </div>
    )
}


export default SignIn