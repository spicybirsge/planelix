'use client'
import { user } from '@/state/store'
import { useEffect, useState, useRef } from 'react';
import authenticate from '@/functions/authenticate';
import Loading from '@/components/Loading';
import { useRouter } from "next/navigation";
import { Button, Center, InputGroup, InputLeftElement, useToast } from '@chakra-ui/react';
import { Input, Text, Container } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons';
import validator from 'validator';
import vars from '@/vars/vars';
import ReCAPTCHA from "react-google-recaptcha";
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';
import { Alert, AlertIcon, AlertDescription, AlertTitle } from '@chakra-ui/react';

export default function Login() {
    const reCaptchaRef = useRef(null)
    const toast = useToast()
    const router = useRouter()
    const userState = user((state) => state.user);
    const loadedState = user((state) => state.loaded);
    const [emailSent, setEmailSent] = useState(false)
    const [submitting, setSubmitting] = useState(false);

    const [email, setEmail] = useState(null)


    useEffect(() => {
        if (!loadedState) {
            authenticate()
        }

    }, [])

    if (!loadedState) {
        return <Loading />
    }

    if (loadedState && userState) {
        return router.push('/', { scroll: false })
    }

    async function SubmitLoginDetails() {
        setSubmitting(true)
        const captcha_token = reCaptchaRef.current.getValue();
        if (!captcha_token) {
            setSubmitting(false)

            return toast({ description: 'Please confirm that you are not a robot', status: 'error', position: 'top' })
        }
        if (!email || email.length < 1) {
            setSubmitting(false)
            reCaptchaRef.current.reset()

            return toast({ description: 'Please enter an email', status: 'error', position: 'top' })
        }

        const isEmailValid = validator.isEmail(email)

        if (!isEmailValid) {
            reCaptchaRef.current.reset()
            setSubmitting(false)
            return toast({ description: 'Invalid email', status: 'error', position: 'top' })
        }

        const URL = vars.BACKEND_URL + "/api/v1/auth/login?r_key=" + captcha_token;
        const request = await fetch(URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
        })

        const response = await request.json();
        if (response.success) {
            setEmailSent(true);
            setSubmitting(false)
            reCaptchaRef.current.reset()
            return toast({ description: 'Check your email for a login link', status: 'success', position: 'top' })
        } else {
            setSubmitting(false)
            reCaptchaRef.current.reset();
            return toast({ description: response.message || 'An unknown error occured', status: 'error', position: 'top' })
        }


    }
    return <><div style={{ marginTop: '25vh' }}>{emailSent ? <> <><Center><Text color={"green"} fontSize='3xl' as={"b"}>You've got mail!</Text><br></br></Center><Center>

        <Alert
            status='success'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
            width={"900px"}

            borderRadius={"8px"}
        >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
                We sent you an email!
            </AlertTitle>
            <AlertDescription >
                We sent you an email with a link to login to your inbox at <Text as={"b"}>{email}</Text>. Please click on the link we sent you to login. You may close this page.
            </AlertDescription>
        </Alert></Center></>
    </> : <> <Container maxW='md'>
        <Center><Text fontSize='3xl' as={"b"}>Login to Planelix</Text></Center>
        <Text as={"p"}>Email</Text>
        <InputGroup>
            <InputLeftElement>
                <EmailIcon boxSize={5}></EmailIcon></InputLeftElement>
            <Input placeholder='you@example.com' style={{ marginBottom: "6px" }} value={email} onChange={(e) => { setEmail(e.target.value) }} focusBorderColor='gray.400'></Input></InputGroup>
        <ReCAPTCHA sitekey={vars.RECAPTCHA_SITE_KEY} style={{ marginBottom: '5px' }} ref={reCaptchaRef}></ReCAPTCHA>
        <Button colorScheme={"orange"} isLoading={submitting} size={"md"} onClick={SubmitLoginDetails} style={{ width: "100%", marginBottom: '6px' }}>Login</Button>
        <Text as={"p"} style={{ textAlign: 'center' }} color={"gray"}>Don't have an account? <Link as={NextLink} href='/register' style={{ textDecoration: 'underline' }}>Create one!</Link></Text></Container>
    </>
    }

    </div></>
}