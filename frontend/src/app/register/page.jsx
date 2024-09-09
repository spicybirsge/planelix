import Register from "@/components/Register";

export const metadata = {
  title: 'Planelix - Register',
  description: 'Create your planelix account, the place where you explore aviation',
  keywords: ['planelix', 'planelix login', 'planelix account signup', 'planelix signup', 'planelix register' ],
  icons: {
    icon: '/assets/logo.png',

  },
  openGraph: {
    title: 'Register a new planelix account',
    description: 'Create your planelix account, the place where you explore aviation',
    site_name: 'planelix',
    images: [
      {
        url: '/assets/logo.png',
      },
    ],
  },

};


export default function Page() {
    return <Register></Register>
}