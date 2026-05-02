import type { Metadata } from 'next'
import MainLayout from './components/MainLayout'

export const metadata: Metadata = {
  title: 'AgentClinic',
  description: 'A wellness platform for AI agents',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
