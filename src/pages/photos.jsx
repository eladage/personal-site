import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { SimpleLayout } from '@/components/SimpleLayout';

import { fetchRandomImages } from '../api/fetchRandomImages';
import LoadSpinner from '@/components/LoadSpinner';
import PhotoDetailModal from '@/components/PhotoDetailModal';

export default function Photos() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        setImages(await fetchRandomImages());
      } catch (error) {
        setError(error);
        console.error('Error fetching random images:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  return (
    <>
      <Head>
        <title>Photos - Eric Ladage</title>
        <meta name="description" content="Photos taken by me" />
      </Head>
      <SimpleLayout command="ls ~/photos" title="photos" intro="Photos taken by me">
        <p className="mb-8 text-sm text-warn">
          [WIP] 🚧 Random unsplash images for now 🚧
        </p>
        {isLoading && <LoadSpinner size={16} />}
        {error && (
          <p className="text-sm text-accent">
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
                className="crt aspect-h-7 aspect-w-10 group block w-full focus-within:ring-1 focus-within:ring-accent"
              >
                <Image
                  key={image.id}
                  className="pointer-events-none object-cover"
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
              <p className="pointer-events-none mt-2 block truncate text-xs font-bold text-fg">
                {image.description}
              </p>
              <p className="pointer-events-none block truncate text-xs text-muted">
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
          setIsModalOpen(false);
          setSelectedImage(null);
        }}
      />
    </>
  );
}
