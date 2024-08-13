import "../../../styles/globals.css";

export const metadata = {
  title: "Tech Dose Admin Login",
  description: "Login to Tech Dose Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
