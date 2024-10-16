'use client'
import { useState, useEffect } from 'react';
import { user } from '@/state/store'
import SideBar from './SideBar';
import authenticate from '@/functions/authenticate';
import Loading from './Loading';
import { useRouter } from 'next/navigation';
import { Input, InputGroup, Text, Center, Container, Card, CardBody, CardHeader, Button, Textarea, Divider, Select } from '@chakra-ui/react'
export default function NewPostComponent() {

    const [aircraftModel, setAircraftModel] = useState(null)

    const [caption, setCaption]= useState(null)
    const [category, setCategory] = useState('take-off')
    const [file, setFile] = useState(null)
    const router = useRouter()
    const userState = user((state) => state.user);
    const loadedState = user((state) => state.loaded);



    useEffect(() => {

        if (!loadedState) {
            authenticate()
        }


    }, [])

    if (!loadedState) {
        return <Loading></Loading>
    }

    if (loadedState && !userState) {

        router.push("/login", { scroll: false })
    }



    const element = <Container ><Card>
        <CardBody>

            <Center><Text fontSize='3xl' as={"b"} style={{ marginBottom: '15px' }}>Create a new Post</Text></Center>


            <Text as={"p"}>Aircraft Model</Text>
            <InputGroup >
                <Input type="text" placeholder={"Aircraft model name in your post attachment (optional)"} style={{ marginBottom: '10px' }} value={aircraftModel} onChange={(e) => {setAircraftModel(e.target.value)}}></Input>
            </InputGroup>
            <Text as={"p"}>Caption</Text>
            <InputGroup >
                <Textarea value={caption} onChange={(e) => {setCaption(e.target.value)}} type="text" placeholder={"Your posts caption (optional)"} style={{ marginBottom: '10px' }}></Textarea>
            </InputGroup>
            <Text as={"p"}>Category</Text>
            <InputGroup >
                <Select value={category} onChange={(e) => {setCategory(e.target.value)}}>
                    <option value='take-off'>take off</option>
                    <option value='in-sky'>in sky</option>
                    <option value='landing'>landing</option>
                    <option value='other'>other</option>
                </Select>
            </InputGroup>

            <Text as={"p"} >Post attachment</Text>
            <InputGroup >

                <input type="file" accept="image/jpeg, image/png, image/jpg, image/gif, video/mp4, video/webm, video/ogg" multiple onChange={(e) => {setFile(e.target.files)}}></input>
            </InputGroup>
            <Button colorScheme={"orange"} style={{ marginTop: '15px', width: '100%' }}>Create Post</Button>
        </CardBody>
    </Card></Container>
    return <SideBar loggedIn={userState ? true : false} active={"new"} user={userState}

        element={element}></SideBar>
}