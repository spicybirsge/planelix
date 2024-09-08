import Login from "@/components/Login";

export const metadata = {
  title: 'Planelix - Login',
  description: 'Login to planelix, the place where you explore aviation',
  keywords: ['planelix', 'planelix login', 'planelix account'],
  icons: {
    icon: '/assets/logo.png',

  },
  openGraph: {
    title: 'Login to planelix',
    description: 'Login to planelix, the place where you explore aviation',
    site_name: 'planelix',
    images: [
      {
        url: '/assets/logo.png',
      },
    ],
  },

};


export default function Page() {
  return <Login></Login>
}
