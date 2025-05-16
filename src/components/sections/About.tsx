"use client"

import Image from "next/image"
import Link from "next/link"
import {Instagram, Facebook} from "lucide-react"
import MyWedIcon from "@/components/icons/MyWedIcon"
import {useLanguage} from "@/contexts/language-context"
import type React from "react";

interface AboutProps {
    aboutRef: React.RefObject<HTMLElement | null>
}

export default function About({aboutRef}: AboutProps) {

    const {t} = useLanguage()

    return (
        <section ref={aboutRef} id="about" className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-primary rounded-tl-3xl"/>
                        <Image
                            src="/images/profile_picture.jpg?height=800&width=600"
                            alt="Photographer"
                            width={600}
                            height={800}
                            className="rounded-lg relative z-10 w-full"
                        />
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-primary rounded-br-3xl"/>
                    </div>

                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            {t("about.title")} <span className="text-primary">{t("about.titleHighlight")}</span>
                        </h2>
                        <p className="text-muted-foreground mb-6">{t("about.paragraph1")}</p>
                        <p className="text-muted-foreground mb-6">{t("about.paragraph2")}</p>
                        <div className="flex gap-4 mb-8">
                            <Link href="https://www.instagram.com/p_rozbicki/"
                                  className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="h-6 w-6"/>
                            </Link>
                            <Link href="https://www.facebook.com/p/Pawe%C5%82-Rozbicki-Photography-100063636543959"
                                  className="text-muted-foreground hover:text-primary transition-colors">
                                <Facebook className="h-6 w-6"/>
                            </Link>
                            <Link
                                href="https://mywed.com/pl/photographer/rozbicki/"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <MyWedIcon className="h-6 w-6"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
