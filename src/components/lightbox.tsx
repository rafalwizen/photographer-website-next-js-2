"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { Photo } from "@/data/photos"
import { getFullSrc } from "@/data/photos"
import { useLanguage } from "@/contexts/language-context"

interface LightboxProps {
    isOpen: boolean
    onClose: () => void
    photos: Photo[]
    currentIndex: number
    onPrevious: () => void
    onNext: () => void
}

export default function Lightbox({
                                     isOpen,
                                     onClose,
                                     photos,
                                     currentIndex,
                                     onPrevious,
                                     onNext
                                 }: LightboxProps) {

    const { t } = useLanguage()

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return

            if (e.key === 'Escape') {
                onClose()
            } else if (e.key === 'ArrowLeft') {
                onPrevious()
            } else if (e.key === 'ArrowRight') {
                onNext()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, currentIndex, onClose, onPrevious, onNext])

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center animate-fade-in"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                className="absolute top-6 right-6 text-white z-10"
                onClick={onClose}
                aria-label={t("lightbox.close")}
            >
                <X className="h-8 w-8" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center"
                 onClick={(e) => e.stopPropagation()}>
                {/* Left navigation button */}
                <button
                    className="absolute left-4 md:left-8 z-10 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation()
                        onPrevious()
                    }}
                    aria-label={t("lightbox.previous")}
                >
                    <ChevronLeft className="h-8 w-8" />
                </button>

                {/* Current image */}
                <div
                    key={currentIndex}
                    className="relative w-full h-full max-w-6xl max-h-screen px-4 py-12 flex items-center justify-center animate-fade-in"
                >
                    <Image
                        src={getFullSrc(photos[currentIndex])}
                        alt={photos[currentIndex].alt}
                        fill
                        className="object-contain"
                        loading="lazy"
                    />
                </div>

                {/* Right navigation button */}
                <button
                    className="absolute right-4 md:right-8 z-10 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation()
                        onNext()
                    }}
                    aria-label={t("lightbox.next")}
                >
                    <ChevronRight className="h-8 w-8" />
                </button>

                {/* Image counter */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white bg-black/30 px-4 py-2 rounded-full">
                    {currentIndex + 1} / {photos.length}
                </div>
            </div>
        </div>
    )
}