import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Paweł Rozbicki - Fotograf ślubny Tarnowskie Góry i cała Polska",
    description: "Fotograf ślubny w Tarnowskich Górach, na Śląsku, w Toskanii i gdzie tylko potrzeba! Uchwycę najpiękniejsze momenty Waszego życia.",
    keywords: "fotograf ślubny, Tarnowskie Góry, sesja ślubna, fotografia ślubna, ślub, wesele, fotografia, Polska",
    robots: "index, follow",
    alternates: {
        canonical: "https://rozbickipawel.pl/",
        languages: {
            "en": "https://rozbickipawel.pl/en",
            "pl": "https://rozbickipawel.pl/pl",
        },
    },
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
