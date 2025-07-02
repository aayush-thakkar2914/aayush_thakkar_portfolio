import { Resend } from 'resend';
import nodemailer from 'nodemailer';

// Option 1: Using Resend (Recommended)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Option 2: Using Nodemailer (Gmail or custom SMTP)
const createTransporter = () => {
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    // Gmail configuration
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
      },
    });
  } else if (process.env.SMTP_HOST) {
    // Custom SMTP configuration
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
  return null;
};

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  id?: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<EmailResponse> {
  const { name, email, message } = data;
  const contactEmail = process.env.CONTACT_EMAIL || 'aayusht2004@gmail.com';

  // Email content
  const subject = `New Portfolio Contact: ${name}`;
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
          New Portfolio Contact Submission
        </h2>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #555; margin-bottom: 10px;">Contact Details:</h3>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #555; margin-bottom: 10px;">Message:</h3>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #777; font-size: 12px;">
          <p>This email was sent from your portfolio contact form.</p>
          <p>Time: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  `;

  const textContent = `
New Portfolio Contact Submission

Name: ${name}
Email: ${email}

Message:
${message}

Time: ${new Date().toLocaleString()}
  `;

  try {
    // Try Resend first
    if (resend) {
      const result = await resend.emails.send({
        from: 'Portfolio <noreply@yourdomain.com>', // Replace with your domain
        to: [contactEmail],
        subject,
        html: htmlContent,
        text: textContent,
        replyTo: email,
      });

      if (result.data) {
        return {
          success: true,
          message: 'Email sent successfully via Resend',
          id: result.data.id,
        };
      }
    }

    // Fallback to Nodemailer
    const transporter = createTransporter();
    if (transporter) {
      const result = await transporter.sendMail({
        from: process.env.SMTP_USER || process.env.GMAIL_USER,
        to: contactEmail,
        subject,
        html: htmlContent,
        text: textContent,
        replyTo: email,
      });

      return {
        success: true,
        message: 'Email sent successfully via SMTP',
        id: result.messageId,
      };
    }

    throw new Error('No email service configured');
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}

// Auto-reply email to user
export async function sendAutoReply(userEmail: string, userName: string): Promise<EmailResponse> {
  const subject = "Thank you for contacting Aayush Thakkar";
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-bottom: 20px;">Thank You for Your Message!</h2>
        
        <p>Hi ${userName},</p>
        
        <p>Thank you for reaching out through my portfolio website. I've received your message and will get back to you as soon as possible, typically within 24-48 hours.</p>
        
        <p>In the meantime, feel free to:</p>
        <ul style="color: #555;">
          <li>Check out my recent projects on <a href="https://github.com/aayush-thakkar2914" style="color: #3b82f6;">GitHub</a></li>
          <li>Connect with me on <a href="https://www.linkedin.com/in/aayush-thakkar-b7a80225a/" style="color: #3b82f6;">LinkedIn</a></li>
          <li>Download my resume from the portfolio</li>
        </ul>
        
        <p>Best regards,<br><strong>Aayush Thakkar</strong><br>Python Developer | AI/ML Engineer</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #777; font-size: 12px;">
          <p>This is an automated response. Please do not reply to this email.</p>
        </div>
      </div>
    </div>
  `;

  try {
    if (resend) {
      const result = await resend.emails.send({
        from: 'Aayush Thakkar <noreply@yourdomain.com>',
        to: [userEmail],
        subject,
        html: htmlContent,
      });

      return {
        success: true,
        message: 'Auto-reply sent successfully',
        id: result.data?.id,
      };
    }

    const transporter = createTransporter();
    if (transporter) {
      await transporter.sendMail({
        from: process.env.SMTP_USER || process.env.GMAIL_USER,
        to: userEmail,
        subject,
        html: htmlContent,
      });

      return {
        success: true,
        message: 'Auto-reply sent successfully',
      };
    }

    return { success: false, message: 'No email service configured for auto-reply' };
  } catch (error) {
    console.error('Auto-reply failed:', error);
    return {
      success: false,
      message: 'Failed to send auto-reply',
    };
  }
}