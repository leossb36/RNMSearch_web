import { Geist, Geist_Mono } from 'next/font/google'

import './style/globals.css'
import { Metadata } from 'next'
import { Toaster } from './components/ui/sonner'

export const metadata: Metadata = {
  title: 'Rick and Morty Serie',
  description: 'Rick and Morty Serie Aplication',
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <Toaster position="bottom-right" richColors />
        {children}
      </body>
    </html>
  )
}
