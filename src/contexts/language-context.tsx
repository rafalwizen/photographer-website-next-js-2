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
        "nav.book": "Book a Session",

        // Hero
        "hero.title": "Capturing moments that last forever",
        "hero.subtitle": "Professional photography that tells your unique story through a creative lens",
        "hero.viewGallery": "View Gallery",
        "hero.bookSession": "Book a Session",

        // Gallery
        "gallery.title": "Featured",
        "gallery.titleHighlight": "Work",
        "gallery.category.all": "All Work",
        "gallery.category.portrait": "Portrait",
        "gallery.category.landscape": "Landscape",
        "gallery.category.street": "Street",
        "gallery.category.wedding": "Wedding",
        "gallery.viewDetails": "View Details",

        // About
        "about.title": "About",
        "about.titleHighlight": "Me",
        "about.paragraph1":
            "Hello! I'm a passionate photographer with over 10 years of experience capturing life's most precious moments. My journey began when I picked up my first camera at the age of 16, and I've been in love with photography ever since.",
        "about.paragraph2":
            "I specialize in portrait, landscape, and wedding photography, bringing a unique perspective to each shoot. My style combines classic techniques with modern aesthetics to create timeless images that tell your story.",
        "about.learnMore": "Learn More",

        // Contact
        "contact.title": "Get in",
        "contact.titleHighlight": "Touch",
        "contact.subtitle":
            "Ready to capture your special moments? Reach out to discuss your photography needs and book a session.",
        "contact.info": "Contact Information",
        "contact.studio": "Studio Location",
        "contact.hours": "Working Hours",
        "contact.hoursDetail":
            "Monday - Friday: 9am - 6pm\nSaturday: 10am - 4pm\nSunday: Closed (Available for special events)",
        "contact.form.name": "Name",
        "contact.form.email": "Email",
        "contact.form.subject": "Subject",
        "contact.form.message": "Message",
        "contact.form.send": "Send Message",
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
        "footer.copyright": "© 2025 LensCraft Photography. All rights reserved.",

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
        "nav.book": "Zarezerwuj sesję",

        // Hero
        "hero.title": "Uwieczniamy chwile, które trwają wiecznie",
        "hero.subtitle": "Profesjonalna fotografia, która opowiada Twoją unikalną historię przez kreatywny obiektyw",
        "hero.viewGallery": "Zobacz galerię",
        "hero.bookSession": "Zarezerwuj sesję",

        // Gallery
        "gallery.title": "Wybrane",
        "gallery.titleHighlight": "Prace",
        "gallery.category.all": "Wszystkie prace",
        "gallery.category.portrait": "Portrety",
        "gallery.category.landscape": "Krajobrazy",
        "gallery.category.street": "Uliczne",
        "gallery.category.wedding": "Ślubne",
        "gallery.viewDetails": "Zobacz szczegóły",

        // About
        "about.title": "O",
        "about.titleHighlight": "Mnie",
        "about.paragraph1":
            "Cześć! Jestem pasjonatem fotografii z ponad 10-letnim doświadczeniem w uwiecznianiu najcenniejszych chwil życia. Moja podróż rozpoczęła się, gdy w wieku 16 lat wziąłem do ręki swój pierwszy aparat i od tego czasu zakochałem się w fotografii.",
        "about.paragraph2":
            "Specjalizuję się w fotografii portretowej, krajobrazowej i ślubnej, wnosząc unikalną perspektywę do każdej sesji. Mój styl łączy klasyczne techniki z nowoczesną estetyką, tworząc ponadczasowe obrazy, które opowiadają Twoją historię.",
        "about.learnMore": "Dowiedz się więcej",

        // Contact
        "contact.title": "Skontaktuj się",
        "contact.titleHighlight": "Ze mną",
        "contact.subtitle":
            "Gotowy, aby uwiecznić swoje wyjątkowe chwile? Skontaktuj się, aby omówić swoje potrzeby fotograficzne i zarezerwować sesję.",
        "contact.info": "Informacje kontaktowe",
        "contact.studio": "Lokalizacja studia",
        "contact.hours": "Godziny pracy",
        "contact.hoursDetail":
            "Poniedziałek - Piątek: 9:00 - 18:00\nSobota: 10:00 - 16:00\nNiedziela: Zamknięte (Dostępne dla specjalnych wydarzeń)",
        "contact.form.name": "Imię",
        "contact.form.email": "Email",
        "contact.form.subject": "Temat",
        "contact.form.message": "Wiadomość",
        "contact.form.send": "Wyślij wiadomość",
        "contact.form.namePlaceholder": "Twoje imię",
        "contact.form.emailPlaceholder": "Twój email",
        "contact.form.subjectPlaceholder": "Temat",
        "contact.form.messagePlaceholder": "Twoja wiadomość",

        // Footer
        "footer.tagline": "Uwieczniamy piękne chwile życia przez kreatywny obiektyw.",
        "footer.quickLinks": "Szybkie linki",
        "footer.services": "Usługi",
        "footer.service.portrait": "Fotografia portretowa",
        "footer.service.wedding": "Fotografia ślubna",
        "footer.service.landscape": "Fotografia krajobrazowa",
        "footer.service.commercial": "Fotografia komercyjna",
        "footer.copyright": "© 2025 LensCraft Photography. Wszelkie prawa zastrzeżone.",

        // Language
        language: "Język",
        "language.en": "Angielski",
        "language.pl": "Polski",
    },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    // Try to get the language from localStorage, default to 'en'
    const [language, setLanguageState] = useState<Language>("en")

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
