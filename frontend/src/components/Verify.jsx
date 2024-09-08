'use client'

import { useSearchParams } from 'next/navigation'
import NextLink from "next/link"
import { Card, CardBody, Text, Container, Link, Button, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import vars from '@/vars/vars'


export default function Verify() {
    const toast = useToast()
    const searchParams = useSearchParams()

    const token = searchParams.get('token')

    const [isLoggingIn, setIsLoggingIn] = useState(false)


    async function SubmitVerificationToken() {
        setIsLoggingIn(true)

        const url = vars.BACKEND_URL + "/api/v1/auth/verify-login"
        const request = await fetch(url,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: token
                })
            })

        const response = await request.json()
        if (!response.success) {
            setIsLoggingIn(false)
            return toast({
                status: 'error',
                position: 'top',
                description: response.message || 'Unknown error occured'
            })
        } else {
            setIsLoggingIn(false)
            window.localStorage.setItem('token', response.token);
            return window.location.href = '/'
        }
    }

    return <><div style={{ marginTop: '25vh' }}>
        <Container maxW={"900px"}><Card bgColor={"gray.100"}>
            <CardBody>
                <Text as={"b"} fontSize={"3xl"} color={"black"}>Almost there!</Text>
                <Text as={"p"} color={"black"}>To login please click the "login" button below. By doing this you agree to our <Link as={NextLink} href='/terms' style={{ textDecoration: 'underline' }}>terms of service</Link>, <Link as={NextLink} href='/privacy' style={{ textDecoration: 'underline' }}>privacy policy</Link>, and <Link as={NextLink} href='/rules' style={{ textDecoration: 'underline' }}>posting guidlines</Link>. Enjoy exploring aviation via planelix ✈️✈️.</Text>
                <Button colorScheme={"orange"} size={"md"} style={{ marginTop: '8px' }} isLoading={isLoggingIn} onClick={SubmitVerificationToken}>Login</Button>
            </CardBody>
        </Card></Container></div></>

}