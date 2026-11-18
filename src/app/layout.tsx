import type { Metadata, Viewport } from 'next';
import { BUSINESS_INFO, INSTAGRAM_URL, SETMORE_BOOK_URL, SETMORE_URL } from '@/data/invictus';
import './invictus.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B0B0B',
};

const IS_PRODUCTION = process.env.VERCEL_ENV === 'production';
const PRODUCTION_URL = 'https://invictus-barbearia-sacavem.vercel.app';
const PRODUCTION_OG_IMAGE = `${PRODUCTION_URL}/assets/invictus/og-preview.png`;
const PREVIEW_URL = 'https://invictus-sacavem-preview.vercel.app';
const PREVIEW_OG_IMAGE = `${PREVIEW_URL}/assets/invictus/og-preview.png`;

export const metadata: Metadata = IS_PRODUCTION
  ? {
      metadataBase: new URL(PRODUCTION_URL),
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
        canonical: PRODUCTION_URL,
      },
      openGraph: {
        title: 'INVICTUS BARBEARIA — Sacavém | Mais Que Uma Barbearia',
        description: 'Cortes, barba e marcações online em Sacavém.',
        url: PRODUCTION_URL,
        siteName: 'Invictus Barbearia — Sacavém',
        locale: 'pt_PT',
        type: 'website',
        images: [
          {
            url: PRODUCTION_OG_IMAGE,
            width: 1200,
            height: 630,
            alt: 'Logótipo da Invictus Barbearia',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'INVICTUS BARBEARIA — Sacavém | Mais Que Uma Barbearia',
        description: 'Cortes, barba e marcações online em Sacavém.',
        images: [PRODUCTION_OG_IMAGE],
      },
    }
  : {
      metadataBase: new URL(PREVIEW_URL),
      title: 'Invictus Barbearia — Pré-visualização',
      description: 'Cortes, barba e marcações online em Sacavém.',
      alternates: {
        canonical: PREVIEW_URL,
      },
      openGraph: {
        title: 'Invictus Barbearia — Pré-visualização',
        description: 'Cortes, barba e marcações online em Sacavém.',
        url: PREVIEW_URL,
        siteName: 'Invictus Barbearia — Sacavém',
        locale: 'pt_PT',
        type: 'website',
        images: [
          {
            url: PREVIEW_OG_IMAGE,
            width: 1200,
            height: 630,
            alt: 'Logótipo da Invictus Barbearia',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Invictus Barbearia — Pré-visualização',
        description: 'Cortes, barba e marcações online em Sacavém.',
        images: [PREVIEW_OG_IMAGE],
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
          href="/assets/invictus/hero-sequence/opt-desktop/frame-000.webp"
          media="(min-width: 769px)"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/invictus/hero-sequence/opt-mobile/frame-000.webp"
          media="(max-width: 768px)"
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
