import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ViewportMeta } from '@/components/viewport-meta'

export const metadata: Metadata = {
  title: 'Design System Demo',
  description: 'Демонстрация компонентов дизайн-системы',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <ViewportMeta />
        {children}
      </body>
    </html>
  )
}
