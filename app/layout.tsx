import './globals.css';
import type { Metadata } from 'next';

interface AppMetadata {
  title: string;
  description: string;
  keywords: string;
  creator: string;
  robots: string;
  viewport: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
}
import { Inter } from 'next/font/google';
import { clsx, type ClassValue } from "clsx";
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

/**
 * Metadata object containing critical SEO information about the Bijak ASB application.
 * 
 * @property {string} title - The title of the application, "Bijak ASB". 
 * This concise, keyword-rich title is critical for search engine optimization (SEO).
 * @property {string} description - A detailed and SEO-friendly description of the Bijak ASB application. 
 * This description incorporates relevant keywords to improve visibility and ranking on search engines. 
 * Bijak ASB is an all-in-one platform designed to empower users with powerful tools for tracking, analyzing, 
 * and optimizing their financial assets and investments, ensuring smarter decision-making.
 */
export const metadata: AppMetadata = {
  title: 'Bijak ASB | Financial Asset and Investment Management Tools',
  description: 'Bijak ASB is an intuitive and comprehensive application offering insightful analytics, financial asset management, and investment tracking tools. Manage your investments efficiently and make informed decisions with Bijak ASB.',
  keywords: 'Bijak ASB, financial asset management, investment tracking, investment analytics, financial tools, manage investments, smart financial decisions, personal finance, investment platform',
  creator: 'Sayyid Syamil',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  ogTitle: 'Bijak ASB | Empowering You with Smarter Financial Tools',
  ogDescription: 'Discover Bijak ASB, a user-friendly financial tool designed for asset management, investment analytics, and decision-making. Maximize your financial potential with powerful investment strategies and insights.',

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="creator" content={metadata.creator} />
        <meta property="og:title" content={metadata.ogTitle} />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta name="robots" content={metadata.robots} />
      </head>
      <body className={clsx(inter.className, 'sm:mx-[10%]')}>
        {children}
      </body>
    </html>
  );
}
