'use client';

import Link from 'next/link';

export default function Guide() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Image Compression Guide
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Learn in detail how to use our tool to optimize your images
          </p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <section className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Start</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">1. Upload Image</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Drag and drop images to the upload area, or click to select files. Supports common formats like JPG, PNG, WebP, with a maximum file size of 10MB.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">2. Set Target Size</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Enter your desired file size and choose the unit (KB or MB). The system will automatically calculate the optimal compression parameters.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">3. Start Compression</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Click the &quot;Start Processing&quot; button and wait for completion. Compression speed depends on image size and network conditions, typically taking just a few seconds.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">4. Download Result</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  After compression, you can preview the before and after comparison and download the compressed image. The system will display the compression ratio and space saved.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Advanced Features</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Batch Processing</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Upload multiple images at once (up to 100), and the system will automatically process them one by one and provide batch download functionality. Perfect for scenarios requiring bulk image processing.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Custom Settings</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Advanced users can adjust compression quality, sharpening parameters, metadata retention, and other options for more precise control and better results.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Format Conversion</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  During compression, you can choose to convert images to other formats, such as JPG to PNG, PNG to WebP, etc., to meet different usage requirements.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Usage Tips</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Choose the Right Format</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  For photos and complex images, JPG format is recommended; for images requiring transparent backgrounds, use PNG format; for modern websites and applications, WebP format provides the best compression results.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Balance Quality and Size</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Set different compression levels for different purposes: medium compression for social media sharing; high compression for website background images; low compression for important images like product displays.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Preparation Before Compression</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Before compression, crop unnecessary parts and adjust the image size to actual needs for better compression results.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">FAQ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Will Compression Affect Image Quality?</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We use smart compression algorithms, and in most cases, the compressed images are almost indistinguishable from the originals. However, high compression rates may lead to detail loss, and you can use the preview feature to find the best balance point.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">What Image Formats Are Supported?</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Currently supports compression and conversion of common formats including JPG, PNG, WebP, GIF, BMP, TIFF. We continuously update to support more formats.
                </p>
              </div>
            </div>
          </section>

          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Try Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}