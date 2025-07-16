import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Exhibition Registration',
  description: 'Register Your Startup',
  generator: 'shivajee.dev',
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
