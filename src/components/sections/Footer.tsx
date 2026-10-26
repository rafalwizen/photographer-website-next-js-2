"use client"

import Link from "next/link"
import InstagramIcon from "@/components/icons/InstagramIcon"
import FacebookIcon from "@/components/icons/FacebookIcon"
import MyWedIcon from "@/components/icons/MyWedIcon"
import {useLanguage} from "@/contexts/language-context"
import type React from "react";

interface FooterProps {
    scrollToSection: (ref: React.RefObject<HTMLElement | null>) => void,
    homeRef: React.RefObject<HTMLElement | null>,
    galleryRef: React.RefObject<HTMLElement | null>,
    aboutRef: React.RefObject<HTMLElement | null>,
    contactRef: React.RefObject<HTMLElement | null>,
}

export default function Footer({scrollToSection, homeRef, galleryRef, aboutRef, contactRef}: FooterProps) {
    const {t} = useLanguage()

    return (
        <footer className="bg-muted py-12 content-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <Link href="/" className="text-2xl font-bold tracking-tight mb-4 inline-block">
                            PAWEŁ<span className="text-primary">ROZBICKI</span>
                        </Link>
                        <p className="text-muted-foreground mt-2 mb-4">{t("footer.tagline")}</p>
                        <div className="flex gap-4">
                            <Link href="https://www.instagram.com/p_rozbicki/" aria-label="Instagram – Paweł Rozbicki"
                                  className="text-muted-foreground hover:text-primary transition-colors">
                                <InstagramIcon className="h-5 w-5"/>
                            </Link>
                            <Link href="https://www.facebook.com/p/Pawe%C5%82-Rozbicki-Photography-100063636543959"
                                  aria-label="Facebook – Paweł Rozbicki Photography"
                                  className="text-muted-foreground hover:text-primary transition-colors">
                                <FacebookIcon className="h-5 w-5"/>
                            </Link>
                            <Link
                                href="https://mywed.com/pl/photographer/rozbicki/"
                                aria-label="MyWed – Paweł Rozbicki"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <MyWedIcon className="h-6 w-6"/>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">{t("footer.quickLinks")}</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#home"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        scrollToSection(homeRef)
                                    }}
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {t("nav.home")}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#gallery"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        scrollToSection(galleryRef)
                                    }}
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {t("nav.gallery")}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        scrollToSection(aboutRef)
                                    }}
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {t("nav.about")}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        scrollToSection(contactRef)
                                    }}
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {t("nav.contact")}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">{t("footer.services")}</h3>
                        <ul className="space-y-2">
                            <li>
                                <span className="text-muted-foreground">
                                    {t("footer.service.portrait")}
                                </span>
                            </li>
                            <li>
                                <span className="text-muted-foreground">
                                    {t("footer.service.wedding")}
                                </span>
                            </li>
                            <li>
                                <span className="text-muted-foreground">
                                    {t("footer.service.landscape")}
                                </span>
                            </li>
                            <li>
                                <span className="text-muted-foreground">
                                    {t("footer.service.commercial")}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border mt-12 pt-6 text-center text-sm text-muted-foreground">
                    <p>{t("footer.copyright")}</p>
                </div>
            </div>
        </footer>
    )
}