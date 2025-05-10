"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
    const { language, setLanguage, t } = useLanguage()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">{t("language")}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-muted" : ""}>
                    {t("language.en")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("pl")} className={language === "pl" ? "bg-muted" : ""}>
                    {t("language.pl")}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
