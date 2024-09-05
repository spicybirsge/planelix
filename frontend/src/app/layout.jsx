import { Providers } from "@/providers/provider";

export const metadata = {
  title: "Planelix",
  description: "Welcome to planelix the place where you can explore and share aviation content",
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
