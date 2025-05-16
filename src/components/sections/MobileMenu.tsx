"use client"

import React from "react"
import {motion} from "framer-motion"
import {Button} from "@/components/ui/button"
import {X} from "lucide-react"
import {useLanguage} from "@/contexts/language-context";

interface MobileMenuProps {
    scrollToSection: (ref: React.RefObject<HTMLElement | null>) => void
    homeRef: React.RefObject<HTMLElement | null>
    galleryRef: React.RefObject<HTMLElement | null>
    aboutRef: React.RefObject<HTMLElement | null>
    contactRef: React.RefObject<HTMLElement | null>
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MobileMenu({
                                       scrollToSection,
                                       homeRef,
                                       galleryRef,
                                       aboutRef,
                                       contactRef,
                                       setIsMenuOpen
                                   }: MobileMenuProps) {

    const {t} = useLanguage()

    return (
        <motion.div
            initial={{opacity: 0, x: "100%"}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: "100%"}}
            className="fixed inset-0 bg-background z-50 flex flex-col p-6"
        >
            <div className="flex justify-end">
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-6 w-6"/>
                </Button>
            </div>

            <div className="flex flex-col items-center justify-center space-y-8 flex-1">
                <button onClick={() => scrollToSection(homeRef)} className="text-2xl font-medium">
                    {t("nav.home")}
                </button>
                <button onClick={() => scrollToSection(galleryRef)} className="text-2xl font-medium">
                    {t("nav.gallery")}
                </button>
                <button onClick={() => scrollToSection(aboutRef)} className="text-2xl font-medium">
                    {t("nav.about")}
                </button>
                <Button size="lg"
                        className="mt-4"
                        onClick={() => scrollToSection(contactRef)}
                >
                    {t("nav.contact")}
                </Button>
            </div>
        </motion.div>
    )
}
