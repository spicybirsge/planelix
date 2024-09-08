import Logout from "@/components/Logout";
export const metadata = {
    title: 'logout',
    description: '',
    robots: "noindex",
    keywords: [],
    icons: {
        icon: '/assets/logo.png',

    },
    openGraph: {
        title: '',
        description: '',
        site_name: '',
        images: [
            {
                url: '',
            },
        ],
    },

};


export default function VerifyPage() {
    return <Logout></Logout>
}