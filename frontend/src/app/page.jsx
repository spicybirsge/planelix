'use client' 
import {user} from '@/state/store'
import { useEffect } from 'react';
import SideBar from '@/components/SideBar';
import authenticate from '@/functions/authenticate';
import Loading from '@/components/Loading';


export default function Home() {
  
const userState = user((state) => state.user);
const loadedState = user((state) => state.loaded);
  useEffect(() => {
  if(!loadedState) {
    authenticate()
  }
  
  }, [])

  if(!loadedState) {
    return <Loading/>
     }
   
 
  return (
   <><SideBar loggedIn={userState ? true : false} user={userState} active={"home"} element={<><p>Hi</p></>}></SideBar></>
  
  );
}
