'use client';

import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            About Us
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Committed to providing the best image compression service
          </p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <section className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              In the digital age, images have become crucial carriers of information. Our mission is to provide users with simple, efficient, and reliable image compression solutions, helping individuals and businesses better manage and optimize their image resources.
            </p>
          </section>

          <section className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Technical Advantages</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              We employ industry-leading image processing technology, ensuring maximum compression while maintaining image quality through continuous innovation and optimization. Our algorithms can intelligently analyze image content and select the most suitable compression strategy.
            </p>
          </section>

          <section className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">User-Centric</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              User needs and experience drive our continuous improvement. We are committed to providing an intuitive interface, fast processing speed, and stable service quality, enabling every user to easily achieve their image optimization goals.
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