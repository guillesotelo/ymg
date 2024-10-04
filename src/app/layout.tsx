// src/app/layout.tsx

import '../styles/globals.css'
import '../styles/scss/app.scss'
import { AppProvider } from './context/AppContext'
import WithHeaderAndFooter from './layouts/HeaderAndFooter'
import { Toaster } from 'react-hot-toast'
import GoogleAnalytics from '../components/GoogleAnalytics/GoogleAnalytics'
import { Metadata } from 'next'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://ymg.vercel.app' : 'http://localhost:3000'),
    title: 'YMG',
    description: 'Consultancy & Networking',
    openGraph: {
        title: 'YMG',
        description: 'Consultancy & Networking',
        images: ['/logo_515x515.png'],
        url: 'https://www.ymg.vercel.app',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'YMG',
        description: 'Consultancy & Networking',
        images: ['https://www.tastefrance.com/sites/tastefrance.com/files/2021-09/GettyImages-1081422898.jpg'],
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            </head>
            <body>
                <AppProvider>
                    <WithHeaderAndFooter>
                        <GoogleAnalytics />
                        <Toaster />
                        {children}
                    </WithHeaderAndFooter>
                </AppProvider>
            </body>
        </html>
    )
}