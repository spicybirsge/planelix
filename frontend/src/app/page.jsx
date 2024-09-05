'use client' 
import {user} from '@/state/store'
import { useEffect } from 'react';
export default function Home() {
  
const userState = user((state) => state.user);
const loadedState = user((state) => state.loaded);
  useEffect(() => {
    user.setState({loaded: true, user: {username: 'shaheer'}})
    console.log(loadedState)
  
  }, [])
  return (
   <><h1>Hello World</h1>
   <button>Hello</button>
   <h1>{userState.username}</h1>
   <h2>Loaded: {loadedState.toString()}</h2></>
  );
}
