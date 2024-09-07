import { user } from "@/state/store"
import vars from '@/vars/vars'



export default async function authenticate() {
    

    const url = vars.BACKEND_URL+"/api/v1/auth/getuser"

   
    const token = window.localStorage.getItem("token");

    if(!token) {
        return user.setState({loaded: true, user: null});

    }

    const request = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })


    const response = await request.json();

    if(response.success) {
        return user.setState({loaded: true, user: response.data})
    } else {
        return user.setState({loaded: true, user: null})
    }
}