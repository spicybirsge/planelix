import { Spinner } from "@chakra-ui/react";


export default function Loading() {

    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}><Spinner size={"xl"} color='#1a202c' speed='0.65s' thickness='4px' emptyColor='gray.200'></Spinner></div>
}