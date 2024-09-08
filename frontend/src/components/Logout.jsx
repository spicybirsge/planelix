'use client'
import { useEffect } from "react"
export default function Logout() {

    useEffect(() => {

        window.localStorage.removeItem("token");
        window.location.href = '/';

    }, [])

    return <></>
}