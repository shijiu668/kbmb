'use client';

import { useState, useRef } from 'react';
import { ArrowUpTrayIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { RadioGroup } from '@headlessui/react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [targetSize, setTargetSize] = useState<number>(500);
  const [unit, setUnit] = useState<'kb' | 'mb'>('kb');
  const [loading, setLoading] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
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
            图片尺寸调整器
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            上传图片，设置目标大小，我们将为您生成最佳质量的压缩图片
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
                拖拽图片到此处或点击上传
              </p>
            </div>

            {preview && (
              <div className="mt-8 relative rounded-lg overflow-hidden">
                <Image
                  src={preview}
                  alt="Preview"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg"
                  unoptimized
                />
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  目标大小
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    value={targetSize}
                    onChange={(e) => setTargetSize(Number(e.target.value))}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  单位
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
                    开始处理
                  </>
                )}
              </button>
            </div>

            {processedImageUrl && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">处理结果</h3>
                <div className="mt-4 relative rounded-lg overflow-hidden">
                  <Image
                    src={processedImageUrl}
                    alt="Processed"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-lg"
                    unoptimized
                  />
                </div>
                <a
                  href={processedImageUrl}
                  download="processed-image.jpg"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  下载图片
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
