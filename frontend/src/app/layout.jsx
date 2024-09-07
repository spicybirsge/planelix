import { Providers } from "@/providers/provider";

export const metadata = {
  title: 'Planelix - Home',
  description: 'Welcome to planelix, the place where you explore aviation',
  keywords: ['aviation', 'boeing', 'airbus', 'plane', 'airplane', 'fighterjet', 'sky'],
  icons: {
    icon: '/assets/logo.png',
   
  },
  openGraph: {
    title: 'Planelix',
    description: 'Welcome to planelix, the place where you explore aviation',
    site_name: 'planelix',
    images: [
      {
        url: '/assets/logo.png',
      },
    ],
  },

};

export default function RootLayout({
  children,
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
