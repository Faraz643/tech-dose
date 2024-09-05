import "../../../styles/globals.css";

export const metadata = {
  title: "Tech Dose admin login",
  description: "Login to your Tech Dose admin dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
