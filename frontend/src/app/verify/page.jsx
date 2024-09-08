import Verify from "@/components/Verify";


export const metadata = {
  title: 'Verify your planelix account',
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
  return <Verify></Verify>
}