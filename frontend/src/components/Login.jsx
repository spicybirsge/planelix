'use client'
import { user } from '@/state/store'
import { useEffect } from 'react';
import authenticate from '@/functions/authenticate';
import Loading from '@/components/Loading';
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter()
    const userState = user((state) => state.user);
    const loadedState = user((state) => state.loaded);
    
    
    useEffect(() => {
        if (!loadedState) {
            authenticate()
        }

    }, [])

    if (!loadedState) {
        return <Loading />
    }

    if(loadedState && userState) {
        return router.push('/', { scroll: false })
    }
    return <h>Hello World</h>
}