'use client'
import {useState, useEffect} from 'react';
import {user} from '@/state/store'
import SideBar from './SideBar';

export default function NewPostComponent() {

    return <SideBar loggedIn={true} active={"new"} user={{username: 'hello', name: 'j'}}></SideBar>
}