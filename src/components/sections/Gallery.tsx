"use client"

import Image from "next/image"
import {photos} from "@/data/photos"
import {useLanguage} from "@/contexts/language-context"
import {motion} from "framer-motion";
import {cn} from "@/lib/utils";
import React, {useEffect, useState} from "react";
import Lightbox from "@/components/lightbox";

interface GalleryProps {
    galleryRef: React.RefObject<HTMLElement | null>,
}

export default function Gallery({galleryRef}: GalleryProps) {
    const {t} = useLanguage()
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

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
        <>
            <section ref={galleryRef} id="gallery" className="py-20 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                        {t("gallery.title")} <span className="text-primary">{t("gallery.titleHighlight")}</span>
                    </h2>

                    {/* Mobile layout (< 768px) - aspect ratio based on photo orientation */}
                    <div className="block md:hidden space-y-6">
                        {photos.map((photo, index) => (
                            <motion.div
                                key={photo.id}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                className={cn(
                                    "relative group cursor-pointer overflow-hidden rounded-lg mx-auto w-full max-w-md",
                                    // Medium (pionowe): 1.5:1 - szerokość pełna, wysokość 1.5x szerokości
                                    photo.size === "medium" && "aspect-[2/3]",
                                    // Large i small (poziome): 1:1.5 - szerokość pełna, wysokość 0.67x szerokości
                                    photo.size !== "medium" && "aspect-[3/2]"
                                )}
                                onClick={() => openLightbox(index)}
                            >
                                <Image
                                    src={photo.src || "/images/placeholder.png"}
                                    alt={`Photo ${photo.id}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
                    </div>

                    {/* Tablet and desktop layout (>= 768px) - original masonry grid */}
                    <motion.div
                        layout
                        className="hidden md:grid grid-cols-2 lg:grid-cols-3 auto-rows-[350px] gap-6"
                    >
                        {photos.map((photo, index) => (
                            <motion.div
                                key={photo.id}
                                layout
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                className={cn(
                                    "relative group cursor-pointer overflow-hidden rounded-lg",
                                    // Na tabletach upraszczamy rozmiary aby uniknąć problemów
                                    "md:col-span-1 md:row-span-1",
                                    // Na dużych ekranach przywracamy oryginalne rozmiary
                                    photo.size === "large" && "lg:col-span-2 lg:row-span-2",
                                    photo.size === "medium" && "lg:col-span-1 lg:row-span-2",
                                    photo.size === "small" && "lg:col-span-1 lg:row-span-1"
                                )}
                                onClick={() => openLightbox(index)}
                            >
                                <Image
                                    src={photo.src || "/images/placeholder.png"}
                                    alt={`Photo ${photo.id}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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

            <Lightbox
                isOpen={lightboxOpen}
                onClose={closeLightbox}
                photos={photos}
                currentIndex={currentPhotoIndex}
                onPrevious={goToPrevPhoto}
                onNext={goToNextPhoto}
            />
        </>
    )
}