import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Affiliate Postback System',
    description: 'Complete affiliate postback system MVP with PostgreSQL',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen bg-gray-50 flex flex-col">
                    {/* Header Section */}
                    <header className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 text-white shadow-md">
                        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                            <div className="flex justify-between items-center py-6">
                                <div className="flex items-center space-x-4">
                                    <h1 className="text-3xl font-bold tracking-tight">
                                        Affiliate Postback System
                                    </h1>
                                </div>
                                <div className="hidden sm:block text-sm font-medium">
                                    <p className="text-gray-200">
                                        MVP - Server-to-Server Tracking
                                    </p>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Main Content Section */}
                    <main className="flex-1 bg-white py-8 sm:px-8 lg:px-12">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                                <div className="text-xl font-semibold text-gray-800 mb-6">
                                    <p className="text-lg text-gray-500 mb-2">
                                        Welcome to the Affiliate Postback System
                                    </p>
                                    <p className="text-base text-gray-600">
                                        This platform is designed to manage your affiliate postback system with server-to-server tracking capabilities. 
                                        Enjoy seamless integrations with PostgreSQL.
                                    </p>
                                </div>
                                {/* Main Content */}
                                {children}
                            </div>
                        </div>
                    </main>

                    {/* Footer Section (optional) */}
                    <footer className="bg-gray-800 text-white py-4">
                        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
                            <p className="text-sm">&copy; 2025 Affiliate Postback System. All Rights Reserved.</p>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    )
}