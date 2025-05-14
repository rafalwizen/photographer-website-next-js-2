"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface LightboxProps {
    isOpen: boolean
    onClose: () => void
    photos: { id: number; src: string; size: string }[]
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

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                    onClick={onClose}
                >
                    {/* Close button */}
                    <button
                        className="absolute top-6 right-6 text-white z-10"
                        onClick={onClose}
                        aria-label="Close lightbox"
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
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="h-8 w-8" />
                        </button>

                        {/* Current image */}
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full h-full max-w-6xl max-h-screen px-4 py-12 flex items-center justify-center"
                        >
                            <Image
                                src={photos[currentIndex].src}
                                alt={`Photo ${photos[currentIndex].id}`}
                                fill
                                className="object-contain"
                            />
                        </motion.div>

                        {/* Right navigation button */}
                        <button
                            className="absolute right-4 md:right-8 z-10 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation()
                                onNext()
                            }}
                            aria-label="Next image"
                        >
                            <ChevronRight className="h-8 w-8" />
                        </button>

                        {/* Image counter */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white bg-black/30 px-4 py-2 rounded-full">
                            {currentIndex + 1} / {photos.length}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}