"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, Instagram, Facebook, Mail, ArrowRight } from "lucide-react"
import MyWedIcon from "@/components/icons/MyWedIcon"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import Lightbox from "@/components/lightbox"

export default function Home() {
  const { t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

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

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [lightboxOpen])

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

  const photos = [
    {id: 1, src: "/images/gallery/1-1.jpg", size: "medium"},
    {id: 2, src: "/images/gallery/1-4.jpg", size: "large"},
    {id: 3, src: "/images/gallery/1-3.jpg", size: "small"},
    {id: 4, src: "/images/gallery/1-4a.jpg", size: "small"},
    {id: 5, src: "/images/gallery/1-6.jpg", size: "small"},
    {id: 6, src: "/images/gallery/3-4.jpg", size: "large"},
    {id: 7, src: "/images/gallery/3-2.jpg", size: "medium"},
    {id: 8, src: "/images/gallery/3-1.jpg", size: "small"},
    {id: 9, src: "/images/gallery/4-3.jpg", size: "large"},
    {id: 10, src: "/images/gallery/4-1.jpg", size: "medium"},
    {id: 11, src: "/images/gallery/4-2.jpg", size: "small"},
    {id: 12, src: "/images/gallery/4-0.jpg", size: "small"},
    {id: 13, src: "/images/gallery/4-7.jpg", size: "large"},
    {id: 14, src: "/images/gallery/4-4.jpg", size: "medium"},
    {id: 15, src: "/images/gallery/5-2.jpg", size: "medium"},
    {id: 16, src: "/images/gallery/5-1.jpg", size: "large"},
    {id: 17, src: "/images/gallery/6-1.jpg", size: "small"},
    {id: 18, src: "/images/gallery/6-2.jpg", size: "small"},
    {id: 19, src: "/images/gallery/6-3.jpg", size: "small"},
    {id: 20, src: "/images/gallery/6-4.jpg", size: "medium"},
    {id: 21, src: "/images/gallery/6-5.jpg", size: "large"},
    {id: 22, src: "/images/gallery/7-1.jpg", size: "large"},
    {id: 23, src: "/images/gallery/7-2.jpg", size: "small"},
    {id: 24, src: "/images/gallery/7-3.jpg", size: "small"},
    {id: 25, src: "/images/gallery/7-4.jpg", size: "small"},
    {id: 26, src: "/images/gallery/7-5.jpg", size: "small"},
    {id: 27, src: "/images/gallery/8-1.jpg", size: "medium"},
    {id: 28, src: "/images/gallery/8-2.jpg", size: "small"},
    {id: 29, src: "/images/gallery/9-1.jpg", size: "small"},
    {id: 30, src: "/images/gallery/9-2.jpg", size: "medium"},
    {id: 31, src: "/images/gallery/9-4.jpg", size: "large"},
    {id: 32, src: "/images/gallery/9-3.jpg", size: "medium"},
    {id: 33, src: "/images/gallery/9-6.jpg", size: "small"},
    {id: 34, src: "/images/gallery/9-7.jpg", size: "medium"},
    {id: 35, src: "/images/gallery/9-8.jpg", size: "small"},
    {id: 36, src: "/images/gallery/9-9.jpg", size: "large"},
    {id: 37, src: "/images/gallery/9-10.jpg", size: "medium"},
    {id: 38, src: "/images/gallery/9-10a.jpg", size: "small"},
    {id: 39, src: "/images/gallery/9-11.jpg", size: "large"},
    {id: 40, src: "/images/gallery/9-12.jpg", size: "medium"},
    {id: 41, src: "/images/gallery/9-13.jpg", size: "large"},
    {id: 42, src: "/images/gallery/9-14.jpg", size: "medium"},
    {id: 43, src: "/images/gallery/9-15.jpg", size: "small"},
    {id: 44, src: "/images/gallery/9-15a.jpg", size: "small"},
    {id: 45, src: "/images/gallery/10-1.jpg", size: "small"},
    {id: 46, src: "/images/gallery/10-3.jpg", size: "large"},
    {id: 47, src: "/images/gallery/10-5.jpg", size: "small"},
    {id: 48, src: "/images/gallery/10-4.jpg", size: "large"},
    {id: 49, src: "/images/gallery/10-5a.jpg", size: "small"},
    {id: 50, src: "/images/gallery/10-8.jpg", size: "small"},
    {id: 51, src: "/images/gallery/10-7.jpg", size: "small"},
    {id: 52, src: "/images/gallery/10-6.jpg", size: "large"},
    {id: 53, src: "/images/gallery/10-10.jpg", size: "small"},
  ]

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goToNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length)
  }

  const goToPrevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
  }

  return (
      <div className="min-h-screen bg-background">
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
              <LanguageSwitcher />
            </div>

            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </header>

        {/* Mobile menu */}
        {isMenuOpen && (
            <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                className="fixed inset-0 bg-background z-50 flex flex-col p-6"
            >
              <div className="flex justify-end">
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                  <X className="h-6 w-6" />
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
        )}

        {/* Hero section */}
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
          <div className="absolute inset-0 bg-black/40 z-10" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">{t("hero.title")}</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl">{t("hero.subtitle")}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-base" onClick={() => scrollToSection(galleryRef)}>
                  {t("hero.viewGallery")}
                </Button>
                <Button size="lg" variant="outline" className="text-base text-black border-white hover:bg-white/10"
                        onClick={() => scrollToSection(contactRef)}
                >
                  {t("hero.bookSession")}
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                onClick={() => scrollToSection(galleryRef)}
                className="cursor-pointer"
            >
              <ArrowRight className="h-10 w-10 text-white rotate-90" />
            </motion.div>
          </div>
        </section>

        {/* Gallery section with clickable images */}
        <section ref={galleryRef} id="gallery" className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              {t("gallery.title")} <span className="text-primary">{t("gallery.titleHighlight")}</span>
            </h2>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[350px] gap-6"
            >
              {photos.map((photo, index) => (
                  <motion.div
                      key={photo.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={cn(
                          "relative group cursor-pointer overflow-hidden rounded-lg",
                          photo.size === "large" && "col-span-2 row-span-2",
                          photo.size === "medium" && "col-span-1 row-span-2",
                          photo.size === "small" && "col-span-1 row-span-1"
                      )}
                      onClick={() => openLightbox(index)}
                  >
                    <Image
                        src={photo.src || "/images/placeholder.png"}
                        alt={`Photo ${photo.id}`}
                        width={1920}
                        height={1080}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-3">
                        <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </motion.div>
              ))}
            </motion.div>
          </div>
        </section>


        {/* About section */}
        <section ref={aboutRef} id="about" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-primary rounded-tl-3xl" />
                <Image
                    src="/images/profile_picture.jpg?height=800&width=600"
                    alt="Photographer"
                    width={600}
                    height={800}
                    className="rounded-lg relative z-10 w-full"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-primary rounded-br-3xl" />
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {t("about.title")} <span className="text-primary">{t("about.titleHighlight")}</span>
                </h2>
                <p className="text-muted-foreground mb-6">{t("about.paragraph1")}</p>
                <p className="text-muted-foreground mb-6">{t("about.paragraph2")}</p>
                <div className="flex gap-4 mb-8">
                  <Link href="https://www.instagram.com/p_rozbicki/" className="text-muted-foreground hover:text-primary transition-colors">
                    <Instagram className="h-6 w-6" />
                  </Link>
                  <Link href="https://www.facebook.com/p/Pawe%C5%82-Rozbicki-Photography-100063636543959" className="text-muted-foreground hover:text-primary transition-colors">
                    <Facebook className="h-6 w-6" />
                  </Link>
                  <Link
                      href="https://mywed.com/pl/photographer/rozbicki/"
                      className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MyWedIcon className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section ref={contactRef} id="contact" className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("contact.title")} <span className="text-primary">{t("contact.titleHighlight")}</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">{t("contact.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-muted/30 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{t("contact.info")}</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>pawel.rozbicki@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link href="https://www.instagram.com/p_rozbicki/" className="text-muted-foreground hover:text-primary transition-colors">
                      <Instagram className="h-5 w-5 text-primary" />
                    </Link>
                    <span>@p_rozbicki</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link href="https://www.facebook.com/p/Pawe%C5%82-Rozbicki-Photography-100063636543959" className="text-muted-foreground hover:text-primary transition-colors">
                      <Facebook className="h-5 w-5 text-primary" />
                    </Link>
                    <span>Paweł Rozbicki Photography</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link href="https://mywed.com/pl/photographer/rozbicki/" className="text-muted-foreground hover:text-primary transition-colors">
                      <MyWedIcon className="h-5 w-5 text-primary" />
                    </Link>
                    <span>MyWed</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-medium mb-2">{t("contact.studio")}</h4>
                  <p className="text-muted-foreground">
                    Tarnowskie Góry
                  </p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {t("contact.form.name")}
                    </label>
                    <input
                        id="name"
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder={t("contact.form.namePlaceholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {t("contact.form.email")}
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder={t("contact.form.emailPlaceholder")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    {t("contact.form.subject")}
                  </label>
                  <input
                      id="subject"
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder={t("contact.form.subjectPlaceholder")}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                      id="message"
                      rows={5}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder={t("contact.form.messagePlaceholder")}
                  />
                </div>

                <Button type="submit" className="w-full">
                  {t("contact.form.send")}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-muted py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <Link href="/" className="text-2xl font-bold tracking-tight mb-4 inline-block">
                  PAWEŁ<span className="text-primary">ROZBICKI</span>
                </Link>
                <p className="text-muted-foreground mt-2 mb-4">{t("footer.tagline")}</p>
                <div className="flex gap-4">
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link href="https://www.facebook.com/p/Pawe%C5%82-Rozbicki-Photography-100063636543959" className="text-muted-foreground hover:text-primary transition-colors">
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link
                      href="https://mywed.com/pl/photographer/rozbicki/"
                      className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MyWedIcon className="h-6 w-6" />
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">{t("footer.quickLinks")}</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                        onClick={() => scrollToSection(homeRef)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t("nav.home")}
                    </button>
                  </li>
                  <li>
                    <button
                        onClick={() => scrollToSection(galleryRef)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t("nav.gallery")}
                    </button>
                  </li>
                  <li>
                    <button
                        onClick={() => scrollToSection(aboutRef)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t("nav.about")}
                    </button>
                  </li>
                  <li>
                    <button
                        onClick={() => scrollToSection(contactRef)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t("nav.contact")}
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">{t("footer.services")}</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      {t("footer.service.portrait")}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      {t("footer.service.wedding")}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      {t("footer.service.landscape")}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      {t("footer.service.commercial")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border mt-12 pt-6 text-center text-sm text-muted-foreground">
              <p>{t("footer.copyright")}</p>
            </div>
          </div>
        </footer>

        {/* Lightbox component */}
        <Lightbox
            isOpen={lightboxOpen}
            onClose={closeLightbox}
            photos={photos}
            currentIndex={currentPhotoIndex}
            onPrevious={goToPrevPhoto}
            onNext={goToNextPhoto}
        />
      </div>
  )
}