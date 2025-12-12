import "./globals.css";

export const metadata = {
  title: "Blackjack",
  description: "Multiplayer Blackjack Game"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
