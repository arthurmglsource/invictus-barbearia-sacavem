import type { Metadata, Viewport } from 'next';
import { BUSINESS_INFO, INSTAGRAM_URL, SETMORE_BOOK_URL, SETMORE_URL } from '@/data/invictus';
import './invictus.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B0B0B',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://invictusbarbeariasacavem.setmore.com'),
  title: 'INVICTUS BARBEARIA — Sacavém | Mais Que Uma Barbearia',
  description:
    'Barbearia em Sacavém (Av. São José, 26A). Cortes masculinos de precisão, degradê, barbaterapia com vaporizador e toalha quente, e tratamento facial Máscara Black. Marca já online.',
  keywords: [
    'Invictus Barbearia',
    'Barbearia Sacavém',
    'Barbeiro Sacavém',
    'Corte Masculino Sacavém',
    'Barbaterapia Sacavém',
    'Degradê Sacavém',
    'Av. São José 26A Sacavém',
  ],
  alternates: {
    canonical: SETMORE_URL,
  },
  openGraph: {
    title: 'INVICTUS BARBEARIA — Sacavém, Portugal',
    description:
      'Precisão. Estilo. Identidade. Cortes masculinos, barbaterapia completa e cuidado facial na Av. São José, 26A em Sacavém. Classificação 4.9★.',
    url: SETMORE_URL,
    siteName: 'Invictus Barbearia — Sacavém',
    locale: 'pt_PT',
    type: 'website',
    images: [
      {
        url: '/assets/invictus/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Invictus Barbearia — Sacavém, Portugal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INVICTUS BARBEARIA — Sacavém | Mais Que Uma Barbearia',
    description:
      'Precisão. Estilo. Identidade. Marca o teu corte ou barbaterapia na Invictus Barbearia em Sacavém (Av. São José, 26A).',
    images: ['/assets/invictus/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BarberShop',
    name: 'Invictus Barbearia - Sacavém',
    image: '/assets/invictus/05-fachada-sacavem.jpg',
    logo: '/assets/invictus/logo-original.png',
    url: SETMORE_URL,
    telephone: '+351966028801',
    email: BUSINESS_INFO.email,
    priceRange: '€5 - €50',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. São José, 26A',
      addressLocality: 'Sacavém',
      addressRegion: 'Lisboa',
      postalCode: '2685-108',
      addressCountry: 'PT',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '20:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '96',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [INSTAGRAM_URL, SETMORE_URL, SETMORE_BOOK_URL],
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: SETMORE_BOOK_URL,
      },
      result: {
        '@type': 'Reservation',
        name: 'Marcação na Invictus Barbearia Sacavém',
      },
    },
  };

  return (
    <html lang="pt-PT">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,700..900&family=Barlow+Condensed:wght@600;700;800&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/invictus/hero-classico-desktop.webp"
          media="(min-width: 768px)"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/invictus/hero-classico-mobile.webp"
          media="(max-width: 767px)"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
