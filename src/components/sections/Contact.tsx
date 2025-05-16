"use client"

import Link from "next/link"
import {Mail, Instagram, Facebook} from "lucide-react"
import MyWedIcon from "@/components/icons/MyWedIcon"
import {useLanguage} from "@/contexts/language-context"
import {Button} from "@/components/ui/button"
import type React from "react";

interface ContactProps {
    contactRef: React.RefObject<HTMLElement | null>
}

export default function Contact({contactRef}: ContactProps) {
    const {t} = useLanguage()

    return (
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
                                <Mail className="h-5 w-5 text-primary"/>
                                <span>pawel.rozbicki@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link href="https://www.instagram.com/p_rozbicki/"
                                      className="text-muted-foreground hover:text-primary transition-colors">
                                    <Instagram className="h-5 w-5 text-primary"/>
                                </Link>
                                <span>@p_rozbicki</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link href="https://www.facebook.com/p/Pawe%C5%82-Rozbicki-Photography-100063636543959"
                                      className="text-muted-foreground hover:text-primary transition-colors">
                                    <Facebook className="h-5 w-5 text-primary"/>
                                </Link>
                                <span>Paweł Rozbicki Photography</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link href="https://mywed.com/pl/photographer/rozbicki/"
                                      className="text-muted-foreground hover:text-primary transition-colors">
                                    <MyWedIcon className="h-5 w-5 text-primary"/>
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
    )
}
