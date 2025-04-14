'use client';

import { useState, useRef } from 'react';
import { ArrowUpTrayIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { RadioGroup } from '@headlessui/react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [targetSize, setTargetSize] = useState<number | string>(500);
  const [unit, setUnit] = useState<'kb' | 'mb'>('kb');
  const [loading, setLoading] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageInfo, setImageInfo] = useState<{ size: string; dimensions: string } | null>(null);
  const [processedImageInfo, setProcessedImageInfo] = useState<{ size: string; dimensions: string } | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    else return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getImageDimensions = (src: string): Promise<{width: number, height: number}> => {
    return new Promise((resolve) => {
      const img = document.createElement('img');
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height
        });
      };
      img.src = src;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUrl = reader.result as string;
        setPreview(dataUrl);
        
        // 计算文件大小
        const fileSize = formatFileSize(file.size);
        
        // 获取图片尺寸
        const dimensions = await getImageDimensions(dataUrl);
        setImageInfo({
          size: fileSize,
          dimensions: `${dimensions.width} × ${dimensions.height}`
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUrl = reader.result as string;
        setPreview(dataUrl);
        
        // 计算文件大小
        const fileSize = formatFileSize(file.size);
        
        // 获取图片尺寸
        const dimensions = await getImageDimensions(dataUrl);
        setImageInfo({
          size: fileSize,
          dimensions: `${dimensions.width} × ${dimensions.height}`
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleProcess = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('targetSize', targetSize.toString());
      formData.append('unit', unit);

      const response = await fetch('/api/resize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('处理失败');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setProcessedImageUrl(url);
      
      // 获取处理后图片信息
      const dimensions = await getImageDimensions(url);
      setProcessedImageInfo({
        size: formatFileSize(blob.size),
        dimensions: `${dimensions.width} × ${dimensions.height}`
      });
    } catch (error) {
      console.error('处理出错:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            MB to KB Image Resizer
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Upload Image, Set Target Size, and We Will Generate the Best Quality Compressed Image for You.
          </p>
        </div>

        <div className="mt-16 flex flex-col items-center">
          <div
            className="w-full max-w-3xl p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg backdrop-blur-lg backdrop-filter"
            style={{ background: 'rgba(255, 255, 255, 0.8)' }}
          >
            <div
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-150 ease-in-out cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Drag and Drop Image Here or Click to Upload
              </p>
            </div>

            {preview && (
              <div className="mt-8 space-y-2">
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-lg"
                    unoptimized
                  />
                </div>
                {imageInfo && (
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 px-2">
                    <span>大小: {imageInfo.size}</span>
                    <span>尺寸: {imageInfo.dimensions}</span>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Target Size
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    value={targetSize}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTargetSize(value === '' ? '' : Number(value));
                    }}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Unit
                </label>
                <div className="mt-1">
                  <RadioGroup value={unit} onChange={setUnit} className="flex space-x-4">
                    <RadioGroup.Option value="kb">
                      {({ checked }) => (
                        <div className={`${checked ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900'} relative px-4 py-2 cursor-pointer rounded-lg flex items-center justify-center text-sm font-medium hover:bg-indigo-500 hover:text-white transition-colors`}>
                          KB
                        </div>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="mb">
                      {({ checked }) => (
                        <div className={`${checked ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900'} relative px-4 py-2 cursor-pointer rounded-lg flex items-center justify-center text-sm font-medium hover:bg-indigo-500 hover:text-white transition-colors`}>
                          MB
                        </div>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleProcess}
                disabled={!file || loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${(!file || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Start Processing
                  </>
                )}
              </button>
            </div>

            {processedImageUrl && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">处理结果</h3>
                <div className="mt-4 space-y-2">
                  <div className="relative rounded-lg overflow-hidden">
                    <Image
                      src={processedImageUrl}
                      alt="Processed"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      unoptimized
                    />
                  </div>
                  {processedImageInfo && (
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 px-2">
                      <span>大小: {processedImageInfo.size}</span>
                      <span>尺寸: {processedImageInfo.dimensions}</span>
                    </div>
                  )}
                </div>
                <a
                  href={processedImageUrl}
                  download="processed-image.jpg"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Download Image
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto px-4">
          <section className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">Compressor</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our advanced image compression technology utilizes smart algorithms to reduce file size while maintaining optimal visual quality. Whether you need to compress images from MB to KB or achieve specific size targets, our tool ensures the perfect balance between size and quality.
            </p>
          </section>

          <section className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">How to Use</h2>
            <div className="space-y-8">
              <div className="group">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-indigo-600 transition-colors">Upload Your Image</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Simply drag and drop your image into the upload area or click to select a file from your device. We support various image formats for maximum compatibility.</p>
              </div>
              <div className="group">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-indigo-600 transition-colors">Set Your Target Size</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Choose your desired output size in KB or MB. Our intelligent resizer will automatically adjust the compression level to meet your size requirements while preserving image quality.</p>
              </div>
              <div className="group">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-indigo-600 transition-colors">Download Compressed Image</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Once processing is complete, preview your compressed image and download it instantly. Compare the before and after sizes to see the optimization results.</p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">Frequently Asked Questions</h2>
            <div className="space-y-8">
              <div className="group">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-indigo-600 transition-colors">What Image Formats Are Supported?</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Our image resizer supports all common image formats including JPG, PNG, WebP, and GIF. The tool maintains format compatibility while optimizing file size.</p>
              </div>
              <div className="group">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-indigo-600 transition-colors">Will Image Quality Be Affected?</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Our compression algorithm is designed to maintain the highest possible image quality while meeting your size requirements. The visual difference is minimal to imperceptible in most cases.</p>
              </div>
              <div className="group">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-indigo-600 transition-colors">Is There a File Size Limit?</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">You can upload images up to 10MB in size. For larger files, we recommend splitting them into smaller parts or contacting our support for assistance.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}