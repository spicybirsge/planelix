import NewPostComponent from "@/components/NewPostComponent";

export const metadata = {
    title: 'Planelix - New Post',
    description: 'Create a new aviation post on planelix',
    keywords: ['planelix', 'planelix post', 'planelix new post', 'planelix upload', 'planelix video upload' ],
    icons: {
      icon: '/assets/logo.png',
  
    },
    openGraph: {
      title: 'Create a new aviation post on planelix',
      description: 'Create a new aviation post on planelix, the place where you explore the world of aviation',
      site_name: 'planelix',
      images: [
        {
          url: '/assets/logo.png',
        },
      ],
    },
  
  };




export default function Page() {
    return <><NewPostComponent></NewPostComponent></>
}