import { NextResponse } from 'next/server';

export async function GET() {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    services: {
      email: {
        resend: !!process.env.RESEND_API_KEY,
        smtp: !!(process.env.SMTP_HOST || process.env.GMAIL_USER),
      },
    },
  };

  return NextResponse.json(healthData);
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}