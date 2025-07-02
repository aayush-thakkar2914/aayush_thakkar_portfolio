import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  console.log('Resume download API called');
  
  try {
    // Define possible resume file paths
    const possiblePaths = [
      path.join(process.cwd(), 'public', 'assets', 'Aayush_Thakkar_Resume.pdf'),
      path.join(process.cwd(), 'public', 'Aayush_Thakkar_Resume.pdf'),
      path.join(process.cwd(), 'public', 'assets', 'resume.pdf'),
      path.join(process.cwd(), 'public', 'resume.pdf'),
    ];
    
    let resumePath: string | null = null;
    let fileBuffer: Buffer;
    
    // Try to find the resume file
    for (const filePath of possiblePaths) {
      try {
        console.log('Checking path:', filePath);
        await fs.access(filePath);
        resumePath = filePath;
        console.log('Found resume at:', filePath);
        break;
      } catch {
        console.log('File not found at:', filePath);
        continue;
      }
    }
    
    if (!resumePath) {
      console.log('Resume file not found in any expected location');
      return NextResponse.json(
        { 
          error: 'Resume not found',
          message: 'Please add your resume PDF to public/assets/Aayush_Thakkar_Resume.pdf',
          checkedPaths: possiblePaths
        },
        { status: 404 }
      );
    }

    // Read the file
    fileBuffer = await fs.readFile(resumePath);
    console.log('Resume file read successfully, size:', fileBuffer.length, 'bytes');
    
    // Log download attempt
    console.log('Resume download initiated at:', new Date().toISOString());

    // Return file with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Aayush_Thakkar_Resume.pdf"',
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    });
    
  } catch (error) {
    console.error('Resume download error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to download resume',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}