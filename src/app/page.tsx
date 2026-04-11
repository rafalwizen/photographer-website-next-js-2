"use client"

import type React from "react"

import {useState, useEffect, useRef} from "react"
import dynamic from "next/dynamic"
import Header from "@/components/sections/Header"
import Hero from "@/components/sections/Hero"

const MobileMenu = dynamic(() => import("@/components/sections/MobileMenu"))
const Gallery = dynamic(() => import("@/components/sections/Gallery"), {
    loading: () => <div className="min-h-screen" />
})
const About = dynamic(() => import("@/components/sections/About"))
const Contact = dynamic(() => import("@/components/sections/Contact"))
const Footer = dynamic(() => import("@/components/sections/Footer"))

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrollY, setScrollY] = useState(0)

    // Refs for sections to scroll to
    const homeRef = useRef<HTMLElement>(null)
    const galleryRef = useRef<HTMLElement>(null)
    const aboutRef = useRef<HTMLElement>(null)
    const contactRef = useRef<HTMLElement>(null)

    useEffect(() => {
        let ticking = false
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrollY(window.scrollY)
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Smooth scroll function
    const scrollToSection = (elementRef: React.RefObject<HTMLElement | null>) => {
        setIsMenuOpen(false) // Close mobile menu if open
        if (elementRef && elementRef.current) {
            elementRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <Header scrollY={scrollY} scrollToSection={scrollToSection} homeRef={homeRef} galleryRef={galleryRef}
                    aboutRef={aboutRef} contactRef={contactRef} setIsMenuOpen={setIsMenuOpen}/>
            {isMenuOpen && <MobileMenu scrollToSection={scrollToSection} homeRef={homeRef} galleryRef={galleryRef}
                                       aboutRef={aboutRef} contactRef={contactRef} setIsMenuOpen={setIsMenuOpen}/>}
            <Hero scrollToSection={scrollToSection} homeRef={homeRef} galleryRef={galleryRef} contactRef={contactRef}/>
            <Gallery galleryRef={galleryRef}/>
            <About aboutRef={aboutRef}/>
            <Contact contactRef={contactRef}/>
            <Footer scrollToSection={scrollToSection} homeRef={homeRef} galleryRef={galleryRef} aboutRef={aboutRef}
                    contactRef={contactRef}/>
        </div>
    )
}
