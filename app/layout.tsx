import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Design System Demo',
  description: 'Демонстрация компонентов дизайн-системы',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
