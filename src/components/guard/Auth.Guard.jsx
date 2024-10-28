import React from 'react'
import { useEffect } from 'react';
import { useProfileQuery } from '../../store/service/endpoints/auth.endpoint';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/Loading';

const AuthGuard = ({check, tokenEmail, children}) => {
  // console.log(check);
  // console.log(tokenEmail);
  
  useEffect(() => {
    if(check){
      localStorage.setItem("token_email",JSON.stringify(tokenEmail))
    }
  },[check]);

  // const nav = useNavigate();
  // console.log(check);
  // console.log(tokenEmail);
  // const {data, isError, isLoading} = useProfileQuery();
  // console.log("Auth Guard",data,isError);
  // useEffect(() => {
  //   if(check){
  //     localStorage.setItem("token_email",JSON.stringify(tokenEmail))
  //   }else if(isError){
  //     nav("/");
  //   }else if(data){
  //     nav("/home")
  //   }
  // },[check, isError, data])
  return (
    // <>{isLoading ? <Loading/> : <>{children}</>}</>
    <>{children}</>
  )
}

export default AuthGuard