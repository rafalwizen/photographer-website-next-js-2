"use client"

import React from "react"
import Link from "next/link"
import {Menu} from "lucide-react"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"
import {LanguageSwitcher} from "@/components/language-switcher"
import {useLanguage} from "@/contexts/language-context";

interface HeaderProps {
    scrollY: number
    scrollToSection: (ref: React.RefObject<HTMLElement | null>) => void
    homeRef: React.RefObject<HTMLElement | null>
    galleryRef: React.RefObject<HTMLElement | null>
    aboutRef: React.RefObject<HTMLElement | null>
    contactRef: React.RefObject<HTMLElement | null>
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({
                                   scrollY,
                                   scrollToSection,
                                   homeRef,
                                   galleryRef,
                                   aboutRef,
                                   contactRef,
                                   setIsMenuOpen,
                               }: HeaderProps) {

    const {t} = useLanguage()

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrollY > 50 ? "bg-background/80 backdrop-blur-md py-3" : "bg-transparent py-6",
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold tracking-tight">
                    PAWEŁ<span className="text-primary">ROZBICKI</span>
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <button
                        onClick={() => scrollToSection(homeRef)}
                        className="text-sm font-medium hover:text-primary transition-colors"
                    >
                        {t("nav.home")}
                    </button>
                    <button
                        onClick={() => scrollToSection(galleryRef)}
                        className="text-sm font-medium hover:text-primary transition-colors"
                    >
                        {t("nav.gallery")}
                    </button>
                    <button
                        onClick={() => scrollToSection(aboutRef)}
                        className="text-sm font-medium hover:text-primary transition-colors"
                    >
                        {t("nav.about")}
                    </button>
                    <Button
                        onClick={() => scrollToSection(contactRef)}
                        className="text-sm font-medium hover:text-primary transition-colors"
                    >
                        {t("nav.contact")}
                    </Button>
                    <LanguageSwitcher/>
                </div>

                <div className="md:hidden flex items-center gap-2">
                    <LanguageSwitcher/>
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
                        <Menu className="h-6 w-6"/>
                    </Button>
                </div>
            </div>
        </header>
    )
}
