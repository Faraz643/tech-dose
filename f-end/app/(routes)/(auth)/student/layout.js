import "../../../styles/globals.css";

export const metadata = {
  title: 'Tech Dose student sign in',
  description: 'Sign in to your Tech Dose student account',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
