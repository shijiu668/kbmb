import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const targetSize = Number(formData.get('targetSize')) || 500; // 默认500KB
    const unit = formData.get('unit') as string || 'kb';

    if (!file) {
      return NextResponse.json({ error: '请上传图片' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const image = sharp(buffer);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      return NextResponse.json({ error: '无效的图片格式' }, { status: 400 });
    }

    // 转换目标大小为字节
    const targetBytes = targetSize * (unit === 'mb' ? 1024 * 1024 : 1024);
    
    // 初始质量设置
    let quality = 80;
    let outputBuffer = await image
      .jpeg({ quality })
      .toBuffer();

    // 二分法查找最佳质量
    let minQuality = 1;
    let maxQuality = 100;
    while (minQuality < maxQuality - 1 && Math.abs(outputBuffer.length - targetBytes) > targetBytes * 0.1) {
      if (outputBuffer.length > targetBytes) {
        maxQuality = quality;
        quality = Math.floor((minQuality + quality) / 2);
      } else {
        minQuality = quality;
        quality = Math.floor((quality + maxQuality) / 2);
      }
      outputBuffer = await image
        .jpeg({ quality })
        .toBuffer();
    }

    // 返回处理后的图片
    return new NextResponse(outputBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Length': outputBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('图片处理错误:', error);
    return NextResponse.json(
      { error: '图片处理失败' },
      { status: 500 }
    );
  }
}