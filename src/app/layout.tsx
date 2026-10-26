import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({ subsets: ["latin"], display: "swap" })

const SITE_URL = "https://rozbickipawel.pl"
const TITLE = "Fotograf ślubny Tarnowskie Góry, Śląsk | Paweł Rozbicki"
const DESCRIPTION =
    "Fotograf ślubny z Tarnowskich Gór. Fotografia ślubna pełna emocji – śluby na Śląsku i w całej Polsce. Zobacz portfolio i zapytaj o wolny termin."

// Structured data: local business + person, serialized once at build time.
const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": ["ProfessionalService", "LocalBusiness"],
            "@id": `${SITE_URL}/#business`,
            name: "Paweł Rozbicki – Fotograf ślubny",
            url: `${SITE_URL}/`,
            image: `${SITE_URL}/images/og-image.jpg`,
            email: "pawel.rozbicki@gmail.com",
            description: "Fotograf ślubny z Tarnowskich Gór. Fotografia ślubna na Śląsku i w całej Polsce.",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Tarnowskie Góry",
                addressRegion: "śląskie",
                addressCountry: "PL",
            },
            areaServed: [
                { "@type": "City", name: "Tarnowskie Góry" },
                { "@type": "AdministrativeArea", name: "Województwo śląskie" },
                { "@type": "Country", name: "Polska" },
            ],
            sameAs: [
                "https://www.instagram.com/p_rozbicki/",
                "https://www.facebook.com/p/Pawe%C5%82-Rozbicki-Photography-100063636543959",
                "https://mywed.com/pl/photographer/rozbicki/",
            ],
            founder: { "@id": `${SITE_URL}/#person` },
        },
        {
            "@type": "Person",
            "@id": `${SITE_URL}/#person`,
            name: "Paweł Rozbicki",
            jobTitle: "Fotograf ślubny",
            url: `${SITE_URL}/`,
            email: "pawel.rozbicki@gmail.com",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Tarnowskie Góry",
                addressCountry: "PL",
            },
            worksFor: { "@id": `${SITE_URL}/#business` },
            knowsAbout: ["Fotografia ślubna", "Fotografia reportażowa", "Fotografia portretowa"],
            sameAs: [
                "https://www.instagram.com/p_rozbicki/",
                "https://www.facebook.com/p/Pawe%C5%82-Rozbicki-Photography-100063636543959",
                "https://mywed.com/pl/photographer/rozbicki/",
            ],
        },
    ],
}

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: TITLE,
    description: DESCRIPTION,
    keywords: [
        "fotograf ślubny",
        "fotograf ślubny Tarnowskie Góry",
        "fotograf ślubny Śląsk",
        "fotografia ślubna",
        "fotograf Tarnowskie Góry",
    ],
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        url: "/",
        siteName: "Paweł Rozbicki – Fotograf ślubny",
        title: TITLE,
        description: DESCRIPTION,
        locale: "pl_PL",
        images: [
            {
                url: "/images/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Paweł Rozbicki – fotograf ślubny z Tarnowskich Gór",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        images: ["/images/og-image.jpg"],
    },
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="pl" suppressHydrationWarning>
        <head>
            <link rel="preload" as="image" href="/images/background-mobile.avif" type="image/avif" media="(max-width: 768px)" />
            <link rel="preload" as="image" href="/images/background.avif" type="image/avif" media="(min-width: 769px)" />
        </head>
        <body className={inter.className}>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}
