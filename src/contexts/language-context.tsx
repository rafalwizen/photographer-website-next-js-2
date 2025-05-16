"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "pl"

type LanguageContextType = {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const translations = {
    en: {
        // Navigation
        "nav.home": "Home",
        "nav.gallery": "Gallery",
        "nav.about": "About",
        "nav.contact": "Contact",

        // Hero
        "hero.title": "Capturing moments that that matter",
        "hero.subtitle": "So, when will I see you in front of my camera?",
        "hero.viewGallery": "View Gallery",
        "hero.bookSession": "Book a Session",

        // Gallery
        "gallery.title": "Featured",
        "gallery.titleHighlight": "Sessions",

        // About
        "about.title": "About",
        "about.titleHighlight": "Me",
        "about.paragraph1":
            "Hi! I'm a photography enthusiast with many years of experience capturing life’s most meaningful moments. My journey began at a young age, and ever since, photography has been my true passion.",
        "about.paragraph2":
            "I specialize in portrait, landscape, and wedding photography, bringing a unique perspective to every session. My style blends classic techniques with a modern aesthetic, creating timeless images that tell your story.",

        // Contact
        "contact.title": "Get in",
        "contact.titleHighlight": "Touch",
        "contact.subtitle":
            "Ready to capture your special moments? Reach out to discuss your photography needs and book a session.",
        "contact.info": "Contact Information",
        "contact.studio": "Location",
        "contact.form.name": "Name",
        "contact.form.email": "Email",
        "contact.form.subject": "Subject",
        "contact.form.message": "Message",
        "contact.form.send": "Send Message",
        "contact.form.sending": "Sending...",
        "contact.form.namePlaceholder": "Your name",
        "contact.form.emailPlaceholder": "Your email",
        "contact.form.subjectPlaceholder": "Subject",
        "contact.form.messagePlaceholder": "Your message",

        // Footer
        "footer.tagline": "Capturing life's beautiful moments through a creative lens.",
        "footer.quickLinks": "Quick Links",
        "footer.services": "Services",
        "footer.service.portrait": "Portrait Photography",
        "footer.service.wedding": "Wedding Photography",
        "footer.service.landscape": "Landscape Photography",
        "footer.service.commercial": "Commercial Photography",
        "footer.copyright": "© 2025 PawełRozbicki Photography. All rights reserved.",

        // Language
        language: "Language",
        "language.en": "English",
        "language.pl": "Polish",
    },
    pl: {
        // Navigation
        "nav.home": "Strona główna",
        "nav.gallery": "Galeria",
        "nav.about": "O mnie",
        "nav.contact": "Kontakt",

        // Hero
        "hero.title": "Uwieczniam chwile, które mają znaczenie",
        "hero.subtitle": "A z Tobą kiedy widzę się na zdjęcia?",
        "hero.viewGallery": "Zobacz galerię",
        "hero.bookSession": "Zarezerwuj sesję",

        // Gallery
        "gallery.title": "Wybrane",
        "gallery.titleHighlight": "Sesje",

        // About
        "about.title": "O",
        "about.titleHighlight": "Mnie",
        "about.paragraph1":
            "Cześć! Jestem pasjonatem fotografii z wieloletnim doświadczeniem w uchwycaniu najważniejszych momentów życia. Moja przygoda z aparatem zaczęła się w młodym wieku i od tamtej pory fotografia stała się moją życiową pasją.",
        "about.paragraph2":
            "Specjalizuję się w fotografii portretowej, krajobrazowej oraz ślubnej, wnosząc indywidualne podejście do każdej sesji. Mój styl to połączenie klasycznych technik z nowoczesnym spojrzeniem, dzięki czemu powstają ponadczasowe zdjęcia, które opowiadają Twoją historię.",

        // Contact
        "contact.title": "Skontaktuj się",
        "contact.titleHighlight": "Ze mną",
        "contact.subtitle":
            "Gotowy, aby uwiecznić swoje wyjątkowe chwile? Skontaktuj się, aby omówić swoje potrzeby fotograficzne i zarezerwować sesję.",
        "contact.info": "Informacje kontaktowe",
        "contact.studio": "Lokalizacja",
        "contact.form.name": "Imię",
        "contact.form.email": "Email",
        "contact.form.subject": "Temat",
        "contact.form.message": "Wiadomość",
        "contact.form.send": "Wyślij wiadomość",
        "contact.form.sending": "Wysyłanie...",
        "contact.form.namePlaceholder": "Twoje imię",
        "contact.form.emailPlaceholder": "Twój email",
        "contact.form.subjectPlaceholder": "Temat",
        "contact.form.messagePlaceholder": "Twoja wiadomość",

        // Footer
        "footer.tagline": "Uwieczniam piękne chwile życia przez kreatywny obiektyw.",
        "footer.quickLinks": "Szybkie linki",
        "footer.services": "Usługi",
        "footer.service.portrait": "Fotografia portretowa",
        "footer.service.wedding": "Fotografia ślubna",
        "footer.service.landscape": "Fotografia krajobrazowa",
        "footer.service.commercial": "Fotografia komercyjna",
        "footer.copyright": "© 2025 PawełRozbicki Photography. Wszelkie prawa zastrzeżone.",

        // Language
        language: "Język",
        "language.en": "Angielski",
        "language.pl": "Polski",
    },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    // Try to get the language from localStorage, default to 'pl'
    const [language, setLanguageState] = useState<Language>("pl")

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language") as Language
        if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pl")) {
            setLanguageState(savedLanguage)
        }
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem("language", lang)
    }

    const t = (key: string): string => {
        return translations[language][key as keyof (typeof translations)[typeof language]] || key
    }

    return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
