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
        "nav.mainNav": "Main navigation",
        "nav.openMenu": "Open menu",
        "nav.closeMenu": "Close menu",

        // Hero
        "hero.title": "Wedding photographer from Tarnowskie Góry",
        "hero.subtitle": "Capturing moments that matter – natural, emotional wedding photography in Silesia and across Poland.",
        "hero.viewGallery": "View Gallery",
        "hero.bookSession": "Book a Session",

        // Gallery
        "gallery.title": "Featured",
        "gallery.titleHighlight": "Sessions",

        // About
        "about.title": "About",
        "about.titleHighlight": "Me",
        "about.paragraph1":
            "Hi, I'm Paweł – a wedding photographer from Tarnowskie Góry. In photography I value naturalness above all: I don't stage artificial scenes, I discreetly observe and capture real emotions – parents in tears, laughter during the morning preparations, the first dance.",
        "about.paragraph2":
            "Wedding photography is, to me, the story of an entire day – from the preparations, through the ceremony, to the last dance. I work in Silesia: Tarnowskie Góry, Gliwice, Katowice, Bytom – but I'll happily follow you anywhere in Poland. If you're looking for someone who will capture your wedding with care and ease – get in touch.",

        // Contact
        "contact.title": "Get in",
        "contact.titleHighlight": "Touch",
        "contact.subtitle":
            "Ready to capture your special moments? Reach out to discuss your photography needs and book a session.",
        "contact.info": "Contact Information",
        "contact.studio": "Location",
        "contact.form.name": "Name",
        "contact.form.email": "Email",
        "contact.form.message": "Message",
        "contact.form.send": "Send Message",
        "contact.form.sending": "Sending...",
        "contact.form.success": "The message has been sent!",
        "contact.form.error": "Unfortunately, the message couldn't be sent. Please try again in a moment or send me an email!",
        "contact.form.namePlaceholder": "Your name",
        "contact.form.emailPlaceholder": "Your email",
        "contact.form.messagePlaceholder": "Your message",

        // Lightbox
        "lightbox.close": "Close",
        "lightbox.previous": "Previous image",
        "lightbox.next": "Next image",

        // Accessibility
        "a11y.skipToContent": "Skip to content",

        // Footer
        "footer.tagline": "Wedding photographer · Tarnowskie Góry · Silesia and all of Poland",
        "footer.quickLinks": "Quick Links",
        "footer.services": "Services",
        "footer.service.portrait": "Portrait Photography",
        "footer.service.wedding": "Wedding Photography",
        "footer.service.landscape": "Landscape Photography",
        "footer.service.commercial": "Commercial Photography",
        "footer.copyright": "© 2026 Paweł Rozbicki Photography. All rights reserved.",

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
        "nav.mainNav": "Nawigacja główna",
        "nav.openMenu": "Otwórz menu",
        "nav.closeMenu": "Zamknij menu",

        // Hero
        "hero.title": "Fotograf ślubny z Tarnowskich Gór",
        "hero.subtitle": "Uwieczniam chwile, które mają znaczenie – fotografia ślubna pełna emocji, na Śląsku i w całej Polsce.",
        "hero.viewGallery": "Zobacz galerię",
        "hero.bookSession": "Zarezerwuj sesję",

        // Gallery
        "gallery.title": "Wybrane",
        "gallery.titleHighlight": "Sesje",

        // About
        "about.title": "O",
        "about.titleHighlight": "Mnie",
        "about.paragraph1":
            "Cześć, jestem Paweł – fotograf ślubny z Tarnowskich Gór. W fotografii cenię przede wszystkim naturalność: nie ustawiam sztucznych scen, tylko dyskretnie obserwuję i utrwalam prawdziwe emocje – wzruszenie rodziców, śmiech podczas porannych przygotowań, pierwszy taniec.",
        "about.paragraph2":
            "Fotografia ślubna to dla mnie opowieść o całym dniu – od przygotowań, przez ceremonię, aż po ostatniego tańca. Pracuję na Śląsku: w Tarnowskich Górach, Gliwicach, Katowicach czy Bytomiu, ale chętnie pojadę za Wami w każdy zakątek Polski. Jeśli szukacie kogoś, kto z uwagą i swobodą uwieczni Wasz ślub – napiszcie do mnie.",

        // Contact
        "contact.title": "Skontaktuj się",
        "contact.titleHighlight": "Ze mną",
        "contact.subtitle":
            "Gotowy, aby uwiecznić swoje wyjątkowe chwile? Skontaktuj się, aby omówić swoje potrzeby fotograficzne i zarezerwować sesję.",
        "contact.info": "Informacje kontaktowe",
        "contact.studio": "Lokalizacja",
        "contact.form.name": "Imię",
        "contact.form.email": "Email",
        "contact.form.message": "Wiadomość",
        "contact.form.send": "Wyślij wiadomość",
        "contact.form.sending": "Wysyłanie...",
        "contact.form.success": "Wiadomość została wysłana!",
        "contact.form.error": "Niestety nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę albo napisz do mnie maila!",
        "contact.form.namePlaceholder": "Twoje imię",
        "contact.form.emailPlaceholder": "Twój email",
        "contact.form.messagePlaceholder": "Twoja wiadomość",

        // Lightbox
        "lightbox.close": "Zamknij",
        "lightbox.previous": "Poprzednie zdjęcie",
        "lightbox.next": "Następne zdjęcie",

        // Accessibility
        "a11y.skipToContent": "Przejdź do treści",

        // Footer
        "footer.tagline": "Fotograf ślubny · Tarnowskie Góry · Śląsk i cała Polska",
        "footer.quickLinks": "Szybkie linki",
        "footer.services": "Usługi",
        "footer.service.portrait": "Fotografia portretowa",
        "footer.service.wedding": "Fotografia ślubna",
        "footer.service.landscape": "Fotografia krajobrazowa",
        "footer.service.commercial": "Fotografia komercyjna",
        "footer.copyright": "© 2026 Paweł Rozbicki Photography. Wszelkie prawa zastrzeżone.",

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

    // Keep <html lang> in sync with the visible language for screen readers
    useEffect(() => {
        document.documentElement.lang = language
    }, [language])

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
