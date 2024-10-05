'use client'
import { useState, useEffect } from 'react';
import { user } from '@/state/store'
import SideBar from './SideBar';
import authenticate from '@/functions/authenticate';
import Loading from './Loading';
import { useRouter } from 'next/navigation';
export default function NewPostComponent() {

    const router = useRouter()
    const userState = user((state) => state.user);
    const loadedState = user((state) => state.loaded);
    
    
    
    useEffect(() => {

        if(!loadedState) {
            authenticate()
        }


    }, [])

    if(!loadedState) {
        return <Loading></Loading>
    }

    if(loadedState && !userState) {

        router.push("/login", {scroll: false})
    }
    return <SideBar loggedIn={userState ? true : false} active={"new"} user={userState}></SideBar>
}