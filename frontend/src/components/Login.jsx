'use client'
import { user } from '@/state/store'
import { useEffect } from 'react';
import authenticate from '@/functions/authenticate';
import Loading from '@/components/Loading';
import { useRouter } from "next/navigation";
import { Button, Center } from '@chakra-ui/react';
import { Input, Text, Container } from '@chakra-ui/react'
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
    return <><div style={{marginTop: '25vh'}}> <Container maxW='md'>
        <Center><Text fontSize='3xl' as={"b"}>Login to Planelix</Text></Center>
        <Text>Email</Text>
        <Input placeholder='example@example.com' style={{marginBottom: "6px"}}></Input>
        <Button colorScheme={"red"}>Login</Button>
        </Container></div></>
}