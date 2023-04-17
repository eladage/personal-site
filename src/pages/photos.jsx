import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { SimpleLayout } from '@/components/SimpleLayout'

import { fetchRandomImages } from '../api/fetchRandomImages'

export default function Photos() {
  const [images, setImages] = useState([])
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

  return (
    <>
      <Head>
        <title>Photos - Eric Ladage</title>
        <meta name="description" content="Photos taken by me" />
      </Head>
      <SimpleLayout title={'Photos'} description={'Photos taken by me'}>
        <h1 className="mb-8 text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
          🚧 Random unsplash images for now until I get my photo server up 🚧
        </h1>
        {isLoading && (
          <div role="status">
            <svg
              aria-hidden="true"
              class="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        )}
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
            <li key={image.urls.small} className="relative">
              <div className="aspect-h-7 aspect-w-10 group block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <Image
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
              <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                {image.description}
              </p>
              <p className="pointer-events-none block text-sm font-medium text-gray-500">
                {image.alt_description}
              </p>
            </li>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}
