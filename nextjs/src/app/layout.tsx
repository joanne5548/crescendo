import type { Metadata } from "next";
import { Nunito, Red_Hat_Text } from "next/font/google";
import "./globals.css";

const redHatText = Red_Hat_Text({
    variable: "--font-red-hat-text",
    subsets: ["latin"],
});

const nunito = Nunito({
	variable: "--font-nunito",
	subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "Crescendo",
    description: "A classical music chatbot",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${redHatText.variable} ${nunito.variable} antialiased bg-slate-950`}>
                {children}
            </body>
        </html>
    );
}
