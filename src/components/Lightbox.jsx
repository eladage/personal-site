import { useEffect } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';

// Full-size preview for static image imports. `photos` is a list of
// `{ image, name }`; `index` is the open one, or null when closed. With more
// than one photo, arrow keys and the prev/next buttons page through them.
export function Lightbox({ photos, index, onClose, onIndexChange }) {
  let isOpen = index !== null;
  let photo = isOpen ? photos[index] : null;
  let isGallery = photos.length > 1;

  function step(delta) {
    onIndexChange((index + delta + photos.length) % photos.length);
  }

  useEffect(() => {
    if (!isOpen || !isGallery) return;
    function onKeyDown(event) {
      if (event.key === 'ArrowLeft') step(-1);
      if (event.key === 'ArrowRight') step(1);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  let buttonClassName =
    'text-muted transition-colors hover:text-accent focus-visible:text-accent';

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[70]">
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-bg/90 backdrop-blur-sm"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-8">
        {photo && (
          <Dialog.Panel className="flex max-h-full max-w-full flex-col border border-line bg-panel">
            <div className="flex items-center justify-between gap-4 border-b border-line px-3 py-1.5 text-xs">
              <Dialog.Title className="truncate text-muted">
                {photo.name}
                {isGallery && (
                  <span className="text-faint">
                    {' '}
                    [{index + 1}/{photos.length}]
                  </span>
                )}
              </Dialog.Title>
              <button
                type="button"
                onClick={onClose}
                className={buttonClassName}
              >
                [ esc ]
              </button>
            </div>
            <Image
              src={photo.image}
              alt=""
              placeholder="blur"
              sizes="100vw"
              className="h-auto max-h-[calc(100dvh-7rem)] w-auto max-w-full object-contain"
            />
            {isGallery && (
              <div className="flex justify-between border-t border-line px-3 py-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className={buttonClassName}
                >
                  ← prev
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className={buttonClassName}
                >
                  next →
                </button>
              </div>
            )}
          </Dialog.Panel>
        )}
      </div>
    </Dialog>
  );
}
