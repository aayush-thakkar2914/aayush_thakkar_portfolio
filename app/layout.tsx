import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aayush Thakkar - Portfolio',
  description: 'Created by Aayush Thakkar',
  generator: 'Aayush Thakkar',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
