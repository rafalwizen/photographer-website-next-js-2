"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, Instagram, Twitter, Facebook, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function Home() {
  const { t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
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
  const scrollToSection = (elementRef: React.RefObject<HTMLElement>) => {
    setIsMenuOpen(false) // Close mobile menu if open
    if (elementRef.current) {
      elementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const categories = [
    { id: "all", name: t("gallery.category.all") },
    { id: "portrait", name: t("gallery.category.portrait") },
    { id: "landscape", name: t("gallery.category.landscape") },
    { id: "street", name: t("gallery.category.street") },
    { id: "wedding", name: t("gallery.category.wedding") },
  ]

  const photos = [
    { id: 1, src: "/placeholder.svg?height=800&width=600", category: "portrait", size: "large" },
    { id: 2, src: "/placeholder.svg?height=600&width=800", category: "landscape", size: "medium" },
    { id: 3, src: "/placeholder.svg?height=800&width=600", category: "street", size: "small" },
    { id: 4, src: "/placeholder.svg?height=600&width=800", category: "wedding", size: "medium" },
    { id: 5, src: "/placeholder.svg?height=800&width=600", category: "portrait", size: "small" },
    { id: 6, src: "/placeholder.svg?height=600&width=800", category: "landscape", size: "large" },
    { id: 7, src: "/placeholder.svg?height=800&width=600", category: "street", size: "medium" },
    { id: 8, src: "/placeholder.svg?height=600&width=800", category: "wedding", size: "small" },
  ]

  const filteredPhotos = activeCategory === "all" ? photos : photos.filter((photo) => photo.category === activeCategory)

  return (
      <div className="min-h-screen bg-background">
        {/* Innovative floating header that changes opacity on scroll */}
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrollY > 50 ? "bg-background/80 backdrop-blur-md py-3" : "bg-transparent py-6",
            )}
        >
          <div className="container flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              LENS<span className="text-primary">CRAFT</span>
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
              <button
                  onClick={() => scrollToSection(contactRef)}
                  className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t("nav.contact")}
              </button>
              <Button>{t("nav.book")}</Button>
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
                <button onClick={() => scrollToSection(contactRef)} className="text-2xl font-medium">
                  {t("nav.contact")}
                </button>
                <Button size="lg" className="mt-4">
                  {t("nav.book")}
                </Button>
              </div>
            </motion.div>
        )}

        {/* Hero section with parallax effect */}
        <section ref={homeRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `translateY(${scrollY * 0.5}px)`,
              }}
          />
          <div className="absolute inset-0 bg-black/40 z-10" />

          <div className="container relative z-20 text-white">
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
                <Button size="lg" variant="outline" className="text-base text-white border-white hover:bg-white/10">
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

        {/* Innovative gallery with dynamic grid */}
        <section ref={galleryRef} id="gallery" className="py-20 bg-background">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              {t("gallery.title")} <span className="text-primary">{t("gallery.titleHighlight")}</span>
            </h2>

            <div className="flex overflow-x-auto pb-4 mb-8 justify-center gap-4 hide-scrollbar">
              {categories.map((category) => (
                  <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      onClick={() => setActiveCategory(category.id)}
                      className="min-w-max"
                  >
                    {category.name}
                  </Button>
              ))}
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo) => (
                  <motion.div
                      key={photo.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={cn(
                          "relative group cursor-pointer overflow-hidden rounded-lg",
                          photo.size === "large" && "md:col-span-2 md:row-span-2",
                          photo.size === "medium" && "lg:col-span-1 lg:row-span-2",
                      )}
                  >
                    <Image
                        src={photo.src || "/placeholder.svg"}
                        alt={`Photo ${photo.id}`}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center p-4">
                        <div className="text-sm uppercase tracking-wider mb-2">
                          {t(`gallery.category.${photo.category}`)}
                        </div>
                        <h3 className="text-xl font-bold">Photo Title {photo.id}</h3>
                        <Button variant="outline" className="mt-4 text-white border-white hover:bg-white/10">
                          {t("gallery.viewDetails")}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About section with split layout */}
        <section ref={aboutRef} id="about" className="py-20 bg-muted/50">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-primary rounded-tl-3xl" />
                <Image
                    src="/placeholder.svg?height=800&width=600"
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
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Instagram className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Facebook className="h-6 w-6" />
                  </Link>
                </div>
                <Button>{t("about.learnMore")}</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section ref={contactRef} id="contact" className="py-20 bg-background">
          <div className="container">
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
                    <span>contact@lenscraft.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Instagram className="h-5 w-5 text-primary" />
                    <span>@lenscraft</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Twitter className="h-5 w-5 text-primary" />
                    <span>@lenscraft_photo</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-medium mb-2">{t("contact.studio")}</h4>
                  <p className="text-muted-foreground">
                    123 Photography Lane
                    <br />
                    Creative District
                    <br />
                    New York, NY 10001
                  </p>
                </div>

                <div className="mt-8">
                  <h4 className="font-medium mb-2">{t("contact.hours")}</h4>
                  <p className="text-muted-foreground whitespace-pre-line">{t("contact.hoursDetail")}</p>
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
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <Link href="/" className="text-2xl font-bold tracking-tight mb-4 inline-block">
                  LENS<span className="text-primary">CRAFT</span>
                </Link>
                <p className="text-muted-foreground mt-2 mb-4">{t("footer.tagline")}</p>
                <div className="flex gap-4">
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Facebook className="h-5 w-5" />
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
      </div>
  )
}
