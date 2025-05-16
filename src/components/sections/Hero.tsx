"use client"

import {useLanguage} from "@/contexts/language-context"
import {motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import type React from "react";

interface HeroProps {
    scrollToSection: (ref: React.RefObject<HTMLElement | null>) => void,
    homeRef: React.RefObject<HTMLElement | null>,
    galleryRef: React.RefObject<HTMLElement | null>,
    contactRef: React.RefObject<HTMLElement | null>,
}

export default function Hero({scrollToSection, homeRef, galleryRef, contactRef}: HeroProps) {
    const {t} = useLanguage()

    return (
        <section ref={homeRef} className="relative h-screen flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/images/background.jpg?height=1080&width=1920')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed"
                }}
            />
            <div className="absolute inset-0 bg-black/40 z-10"/>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-white">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2}}
                    className="max-w-3xl"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">{t("hero.title")}</h1>
                    <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl">{t("hero.subtitle")}</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="text-base" onClick={() => scrollToSection(galleryRef)}>
                            {t("hero.viewGallery")}
                        </Button>
                        <Button size="lg" variant="outline"
                                className="text-base text-black border-white hover:bg-white/10"
                                onClick={() => scrollToSection(contactRef)}
                        >
                            {t("hero.bookSession")}
                        </Button>
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
                <motion.div
                    animate={{y: [0, 10, 0]}}
                    transition={{repeat: Number.POSITIVE_INFINITY, duration: 2}}
                    onClick={() => scrollToSection(galleryRef)}
                    className="cursor-pointer"
                >
                    <ArrowRight className="h-10 w-10 text-white rotate-90"/>
                </motion.div>
            </div>
        </section>
    )
}
