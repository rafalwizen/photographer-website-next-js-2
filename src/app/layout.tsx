import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Paweł Rozbicki",
    description: "Fotograf ślubny w Tarnowskich Górach, na Śląsku, w Toskanii i gdzie tylko potrzeba!",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}
