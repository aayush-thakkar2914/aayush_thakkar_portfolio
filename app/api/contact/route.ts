import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

// Simple rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;

  const current = rateLimitMap.get(ip);
  
  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
}

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  message: z.string().min(10).max(2000),
});

// Create email transporter
function createTransporter() {
  console.log('Creating email transporter...');
  
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    console.log('Using Gmail configuration');
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }
  
  if (process.env.SMTP_HOST) {
    console.log('Using SMTP configuration');
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  
  console.log('No email configuration found');
  return null;
}

async function sendEmail(data: { name: string; email: string; message: string }) {
  const transporter = createTransporter();
  
  if (!transporter) {
    throw new Error('No email configuration available');
  }

  const contactEmail = process.env.CONTACT_EMAIL || 'aayusht2004@gmail.com';
  
  const mailOptions = {
    from: process.env.SMTP_USER || process.env.GMAIL_USER,
    to: contactEmail,
    subject: `New Portfolio Contact: ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Sent from portfolio contact form at ${new Date().toLocaleString()}</small></p>
    `,
    replyTo: data.email,
  };

  console.log('Sending email to:', contactEmail);
  const result = await transporter.sendMail(mailOptions);
  console.log('Email sent successfully:', result.messageId);
  
  return result;
}

export async function POST(request: NextRequest) {
  console.log('Contact API called');
  
  try {
    // Get IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'localhost';
    
    console.log('Request from IP:', ip);

    // Rate limiting
    if (!rateLimit(ip)) {
      console.log('Rate limit exceeded for IP:', ip);
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    console.log('Request body received:', { name: body.name, email: body.email, messageLength: body.message?.length });

    // Validate data
    const validatedData = contactSchema.parse(body);
    console.log('Data validation passed');

    // Send email
    await sendEmail(validatedData);
    
    console.log('Email sent successfully');
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
    });
    
  } catch (error) {
    console.error('Contact API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid form data',
          errors: error.errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to send message'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Contact API is working. Use POST to send messages.' });
}