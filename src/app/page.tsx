"use client"

import type React from "react"

import {useState, useEffect, useRef} from "react"
import Header from "@/components/sections/Header"
import MobileMenu from "@/components/sections/MobileMenu"
import About from "@/components/sections/About"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/sections/Footer"
import Hero from "@/components/sections/Hero"
import Gallery from "@/components/sections/Gallery";

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrollY, setScrollY] = useState(0)

    // Refs for sections to scroll to
    const homeRef = useRef<HTMLElement>(null)
    const galleryRef = useRef<HTMLElement>(null)
    const aboutRef = useRef<HTMLElement>(null)
    const contactRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        window.addEventListener("scroll", handleScroll)
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