import React, { useState } from 'react'
import LoginCmp from '../Components/LoginCmp';
import SignUpCmp from '../Components/SignUpCmp';

function Account() {
    const[login, setlogin] = useState("signUp");
    
    if (login) {
        console.log("User Already Login in ... ")
    }
    return (
        <>
        <div className='text-center'>
            <button className={`p-2 border text-white rounded min-w-[20%] m-4 font-bold hover:cursor-pointer ${login===false ? "bg-green-700":"bg-blue-700"}`} onClick={()=>{setlogin("signUp")}}>Sign Up</button>
            <button className={`bg-blue-700 text-white p-2 border rounded min-w-[20%] m-4 font-bold hover:cursor-pointer ${login===false ? "bg-blue-700":"bg-green-700"}`} onClick={()=>setlogin("login")}>Login </button>
        </div>
        {/* Conditional Rendering */}
        {login==="login" && <LoginCmp></LoginCmp>}
        {login==="signUp" && <SignUpCmp></SignUpCmp>}
        
        </>
    )
}

export default Account
