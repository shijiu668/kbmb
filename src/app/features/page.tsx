'use client';

import Link from 'next/link';

export default function Features() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Powerful Image Compression
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Explore the unique advantages and core features of our image compression tool
          </p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <section className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Smart Compression Algorithm</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Our compression algorithm uses advanced image processing technology to significantly reduce file size while maintaining visual quality. Whether it&apos;s photos, charts, or artwork, you&apos;ll get the best compression results.
            </p>
          </section>

          <section className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Precise Size Control</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Supports precise control in KB and MB units, allowing you to set target file sizes according to specific needs. Whether it&apos;s website optimization or email attachments, you can easily meet size limit requirements.
            </p>
          </section>

          <section className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">User-Friendly Experience</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Clean and intuitive user interface with drag-and-drop upload, one-click compression, and instant preview makes image compression easy and simple. Supports batch processing to improve work efficiency.
            </p>
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