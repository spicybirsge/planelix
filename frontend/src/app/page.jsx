'use client' 
import {user} from '@/state/store'
import { useEffect } from 'react';
import SideBar from '@/components/SideBar';
export default function Home() {
  
const userState = user((state) => state.user);
const loadedState = user((state) => state.loaded);
  useEffect(() => {
    user.setState({loaded: true, user: {username: 'shaheer'}})
    console.log(loadedState)
  
  }, [])

  let my_user = {
    //dummy object for now
    username: 'shaheer',
    name: 'shaheer ahamed',
    email: 'shaheer@example.com'
  }
  return (
   <><SideBar loggedIn={true} user={my_user} active={"home"}></SideBar></>
  
  );
}
