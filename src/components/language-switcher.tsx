"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
    const { language, setLanguage, t } = useLanguage()
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [open])

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="h-9 w-9 rounded-full inline-flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label={t("language")}
            >
                <Globe className="h-5 w-5" />
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-1 min-w-[80px] rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-fade-in z-50">
                    <button
                        onClick={() => { setLanguage("en"); setOpen(false) }}
                        className={`w-full px-3 py-1.5 text-left text-sm rounded-sm hover:bg-accent transition-colors ${language === "en" ? "bg-muted" : ""}`}
                    >
                        {t("language.en")}
                    </button>
                    <button
                        onClick={() => { setLanguage("pl"); setOpen(false) }}
                        className={`w-full px-3 py-1.5 text-left text-sm rounded-sm hover:bg-accent transition-colors ${language === "pl" ? "bg-muted" : ""}`}
                    >
                        {t("language.pl")}
                    </button>
                </div>
            )}
        </div>
    )
}
