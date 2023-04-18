import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { SimpleLayout } from '@/components/SimpleLayout'

import { fetchRandomImages } from '../api/fetchRandomImages'
import LoadSpinner from '@/components/LoadSpinner'
import PhotoDetailModal from '@/components/PhotoDetailModal'

export default function Photos() {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        setImages(await fetchRandomImages())
      } catch (error) {
        setError(error)
        console.error('Error fetching random images:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleImageClick = (image) => {
    setSelectedImage(image)
    setIsModalOpen(true)
  }

  return (
    <>
      <Head>
        <title>Photos - Eric Ladage</title>
        <meta name="description" content="Photos taken by me" />
      </Head>
      <SimpleLayout title={'Photos'} description={'Photos taken by me'}>
        <h1 className="mb-8 text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
          🚧 Random unsplash images for now 🚧
        </h1>
        {isLoading && <LoadSpinner size={16} />}
        {error && (
          <p className="text-2xl font-bold tracking-tight text-red-500 dark:text-red-300 sm:text-3xl">
            Error: {error.message}
          </p>
        )}
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {images.map((image) => (
            <li key={image.id} className="relative">
              <div
                onClick={() => handleImageClick(image)}
                className="aspect-h-7 aspect-w-10 group block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
              >
                <Image
                  key={image.id}
                  className="pointer-events-none object-cover group-hover:opacity-75"
                  src={image.urls.small}
                  alt={image.description || 'Random Unsplash Image'}
                  width={400}
                  height={Math.round((400 * image.height) / image.width)}
                />

                <button
                  type="button"
                  className="absolute inset-0 focus:outline-none"
                >
                  <span className="sr-only">
                    View details for {image.description}
                  </span>
                </button>
              </div>
              <p className="pointer-events-none mt-2 block truncate text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                {image.description}
              </p>
              <p className="pointer-events-none block text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {image.alt_description}
              </p>
            </li>
          ))}
        </ul>
      </SimpleLayout>
      <PhotoDetailModal
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedImage(null)
        }}
      />
    </>
  )
}
