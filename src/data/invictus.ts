export interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  price: string;
  description?: string;
  badge?: string;
  bookingUrl: string;
}

export interface ServiceCategory {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface PortfolioWork {
  id: string;
  index: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  image: string;
  imageJpg: string;
  aspect: 'square' | 'tall' | 'portrait';
  serviceName: string;
  servicePrice: string;
  bookingUrl: string;
}

export interface VerifiedReview {
  id: string;
  author: string;
  source: string;
  rating: number;
  quote: string;
}

export const SETMORE_URL = 'https://invictusbarbeariasacavem.setmore.com/';
export const SETMORE_BOOK_URL = 'https://invictusbarbeariasacavem.setmore.com/book';
export const SETMORE_REVIEWS_URL = 'https://invictusbarbeariasacavem.setmore.com/reviews?sortBy=highestRated';
export const INSTAGRAM_URL = 'https://www.instagram.com/invictus.barbeariapt/';
export const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Av.+S%C3%A3o+Jos%C3%A9+26A,+2685-108+Sacav%C3%A9m,+Portugal';

export const BUSINESS_INFO = {
  name: 'Invictus Barbearia',
  unit: 'Sacavém, Portugal',
  tagline: 'MAIS QUE UMA BARBEARIA.',
  subheadline: 'PRECISÃO. ESTILO. IDENTIDADE.',
  addressLine1: 'Av. São José, 26A',
  addressLine2: '2685-108 Sacavém · Lisboa, Portugal',
  fullAddress: 'Av. São José, 26A, 2685-108 Sacavém, Portugal',
  phoneDisplay: '+351 966 028 801',
  phoneShort: '966 028 801',
  phoneHref: 'tel:+351966028801',
  email: 'invictusbarberiasacavem@gmail.com',
  instagramHandle: '@invictus.barbeariapt',
  instagramUrl: INSTAGRAM_URL,
  bookingUrl: SETMORE_BOOK_URL,
  reviewsUrl: SETMORE_REVIEWS_URL,
  mapsUrl: GOOGLE_MAPS_URL,
  ratingScore: '4.9',
  ratingCount: 96,
  ratingBreakdown: {
    fiveStar: 92,
    fourStar: 2,
    threeStar: 0,
    twoStar: 0,
    oneStar: 2,
  },
  verificationNote: 'Dados comerciais e avaliações sincronizados via Setmore / Google (Invictus Barbearia — Sacavém).',
  bookingPolicy:
    'Cancelamentos ou reagendamentos devem ser efetuados com pelo menos 24 horas de antecedência. A não comparência implica o pagamento de 50% do valor do serviço.',
  hours: [
    { days: 'Segunda-feira', hours: '10:00 — 20:00', open: true },
    { days: 'Terça-feira', hours: '10:00 — 20:00', open: true },
    { days: 'Quarta-feira', hours: '10:00 — 20:00', open: true },
    { days: 'Quinta-feira', hours: '10:00 — 20:00', open: true },
    { days: 'Sexta-feira', hours: '10:00 — 20:00', open: true },
    { days: 'Sábado', hours: '10:00 — 20:00', open: true },
    { days: 'Domingo', hours: 'Encerrado', open: false },
  ],
};

export const HERO_FRAMES = [
  {
    id: 'classico',
    code: '01',
    label: 'CLÁSSICO & BARBA',
    caption: 'Corte clássico · Fade limpo · Acabamento à navalha',
    desktopWebp: '/assets/invictus/hero-classico-desktop.webp',
    desktopJpg: '/assets/invictus/hero-classico-desktop.jpg',
    mobileWebp: '/assets/invictus/hero-classico-mobile.webp',
    mobileJpg: '/assets/invictus/hero-classico-mobile.jpg',
    alt: 'Cliente real da Invictus Barbearia Sacavém com corte clássico, fade limpo e barba aparada',
  },
  {
    id: 'fade',
    code: '02',
    label: 'FADE CRESPO',
    caption: 'Taper fade de alta precisão · Textura natural & contorno geométrico',
    desktopWebp: '/assets/invictus/hero-fade-desktop.webp',
    desktopJpg: '/assets/invictus/hero-fade-desktop.jpg',
    mobileWebp: '/assets/invictus/hero-fade-mobile.webp',
    mobileJpg: '/assets/invictus/hero-fade-mobile.jpg',
    alt: 'Detalhe de corte fade crespo em perfil executado na Invictus Barbearia em Sacavém',
  },
  {
    id: 'mascara',
    code: '03',
    label: 'RITUAL BLACK',
    caption: 'Esfoliação facial · Máscara Black purificante · Cuidado de pele',
    desktopWebp: '/assets/invictus/hero-mascara-desktop.webp',
    desktopJpg: '/assets/invictus/hero-mascara-desktop.jpg',
    mobileWebp: '/assets/invictus/hero-mascara-mobile.webp',
    mobileJpg: '/assets/invictus/hero-mascara-mobile.jpg',
    alt: 'Tratamento facial com Máscara Black na cadeira da Invictus Barbearia Sacavém',
  },
] as const;

export const PORTFOLIO_WORKS: PortfolioWork[] = [
  {
    id: 'fade-crespo',
    index: '01',
    title: 'FADE CRESPO & CONTORNO',
    category: 'DEGRADÊ DE PRECISÃO',
    subtitle: 'Transição limpa ao zero · Definição de têmpora à navalha',
    description:
      'Equilíbrio entre volume texturizado no topo e um degradê lateral progressivo sem marcas, finalizado com contorno geométrico rigoroso.',
    image: '/assets/invictus/01-fade-crespo.webp',
    imageJpg: '/assets/invictus/01-fade-crespo.jpg',
    aspect: 'square',
    serviceName: 'Corte Masculino',
    servicePrice: '12 €',
    bookingUrl:
      'https://invictusbarbeariasacavem.setmore.com/book?step=staff&products=1f5f765b-ffb9-45cd-a4f7-0390a4d61e43&type=service',
  },
  {
    id: 'desenho-nuca',
    index: '02',
    title: 'TRAÇO ARTÍSTICO NA NUCA',
    category: 'FREESTYLE & STREETWEAR',
    subtitle: 'Desenho à mão livre · Assinatura urbana em frente à loja em Sacavém',
    description:
      'Trabalho de lâmina de alta precisão na nuca com simetria orgânica e sombreamento em degradê, refletindo a cultura urbana da Invictus.',
    image: '/assets/invictus/02-desenho-nuca.webp',
    imageJpg: '/assets/invictus/02-desenho-nuca.jpg',
    aspect: 'tall',
    serviceName: 'Desenho Artístico',
    servicePrice: 'Desde 5 €',
    bookingUrl:
      'https://invictusbarbeariasacavem.setmore.com/book?step=staff&products=d6077a49-c14c-4cd1-9b0d-e51d1538dd6b&type=service',
  },
  {
    id: 'corte-classico-barba',
    index: '03',
    title: 'CLÁSSICO CONTEMPORÂNEO',
    category: 'CORTE & BARBA',
    subtitle: 'Volume estruturado à tesoura · Taper lateral & barba alinhada',
    description:
      'Corte masculino clássico com estrutura natural no topo, transição suave nas laterais e acabamento de bigode e cavanhaque à navalha.',
    image: '/assets/invictus/03-corte-classico.webp',
    imageJpg: '/assets/invictus/03-corte-classico.jpg',
    aspect: 'portrait',
    serviceName: 'Corte + Barba',
    servicePrice: '18 €',
    bookingUrl:
      'https://invictusbarbeariasacavem.setmore.com/book?step=staff&products=5569707f-e9e4-4729-b1e1-f2736a6ef888%7Cb3e79b92-9535-451d-942e-aaeb99b2d6ab&type=service',
  },
  {
    id: 'corte-crianca',
    index: '04',
    title: 'CORTE CLÁSSICO INFANTIL',
    category: 'NOVA GERAÇÃO',
    subtitle: 'Tesoura & acabamento suave · Atendimento paciente e atento',
    description:
      'Linhas limpas, caimento natural e conforto total para os mais novos, mantendo o rigor estético da barbearia tradicional.',
    image: '/assets/invictus/06-corte-crianca.webp',
    imageJpg: '/assets/invictus/06-corte-crianca.jpg',
    aspect: 'portrait',
    serviceName: 'Corte Criança',
    servicePrice: '12 €',
    bookingUrl:
      'https://invictusbarbeariasacavem.setmore.com/book?step=staff&products=58e18bd8-40f5-4369-ae85-fa55824363dc&type=service',
  },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'cortes',
    index: '01',
    title: 'CORTES',
    subtitle: 'Tesoura, máquina e navalha com leitura anatómica e acabamento limpo.',
    items: [
      {
        id: 'corte-masculino',
        name: 'Corte Masculino',
        duration: '35 min',
        price: '12 €',
        description: 'Corte personalizado (clássico, degradê ou moderno) com acabamento à navalha.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=1f5f765b-ffb9-45cd-a4f7-0390a4d61e43&step=staff&type=service',
      },
      {
        id: 'corte-sobrancelha',
        name: 'Corte + Sobrancelha',
        duration: '40 min',
        price: '15 €',
        description: 'Corte masculino completo acompanhado de alinhamento e limpeza de sobrancelha.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=c908ee47-21d1-47c3-b112-ef690ad25c56&step=staff&type=service',
      },
      {
        id: 'corte-crianca',
        name: 'Corte Criança',
        duration: '40 min',
        price: '12 €',
        description: 'Corte infantil clássico ou degradê executado com cuidado e atenção ao detalhe.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=58e18bd8-40f5-4369-ae85-fa55824363dc&step=staff&type=service',
      },
      {
        id: 'acabamento',
        name: 'Acabamento',
        duration: '10 min',
        price: '5 €',
        description: 'Manutenção rápida dos contornos laterais, frontal e nuca entre cortes.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=6e237cee-021b-4a2f-8a3c-85f76e1267e0&step=staff&type=service',
      },
      {
        id: 'desenho',
        name: 'Desenho (Atenção na Descrição)',
        duration: '10 min',
        price: 'Desde 5 €',
        description: 'Traço artístico à navalha. Valor desde 5 €, consoante a complexidade do desenho.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=d6077a49-c14c-4cd1-9b0d-e51d1538dd6b&step=staff&type=service',
      },
    ],
  },
  {
    id: 'barba',
    index: '02',
    title: 'BARBA & TRATAMENTO',
    subtitle: 'Geometria facial, ritual de toalha quente, vapor de ozono e hidratação.',
    items: [
      {
        id: 'barbaterapia',
        name: 'Barbaterapia',
        duration: '35 min',
        price: '15 €',
        badge: 'RITUAL',
        description:
          'Inclui esfoliação, vaporizador facial, toalha quente, after shave e finalização com massajador.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=e07f4cca-4c9c-4529-ac03-9cad44bc5834&step=staff&type=service',
      },
      {
        id: 'barba-simples',
        name: 'Barba',
        duration: '30 min',
        price: '7 €',
        description: 'Alinhamento de volume, simetria e definição de linhas com navalha.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=01d188a1-a297-415b-af75-34579f4d2567&step=staff&type=service',
      },
      {
        id: 'barba-pigmentacao',
        name: 'Barba + Pigmentação',
        duration: '1 h',
        price: '15 €',
        description: 'Desenhar e aparar a barba com aplicação de pigmentação para densidade uniforme.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=b66364d1-a50b-4b83-9425-98fe79faa497&step=staff&type=service',
      },
      {
        id: 'sobrancelha',
        name: 'Sobrancelha',
        duration: '5 min',
        price: '3 €',
        description: 'Alinhamento limpo e natural das sobrancelhas à lâmina.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=6329657a-592c-433b-95ec-071e2e351c19&step=staff&type=service',
      },
    ],
  },
  {
    id: 'combos',
    index: '03',
    title: 'COMBOS',
    subtitle: 'Sessões integradas para renovação completa de imagem em Sacavém.',
    items: [
      {
        id: 'combo-invictus',
        name: 'Combo Invictus (Corte + Barbaterapia + Sobrancelha)',
        duration: '1 h 30 min',
        price: '30 €',
        badge: 'ASSINATURA INVICTUS',
        description:
          'O protocolo mais completo da Invictus: corte de precisão, barbaterapia completa com toalha quente e vaporizador, mais sobrancelha.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=9ab61c4d-dc7e-42c9-9b02-f615e3fe1b31%7Cb3e79b92-9535-451d-942e-aaeb99b2d6ab&step=staff&type=service',
      },
      {
        id: 'corte-barbaterapia',
        name: 'Corte + Barbaterapia',
        duration: '1 h 20 min',
        price: '27 €',
        description:
          'Corte masculino aliado ao ritual de barbaterapia (esfoliação, vaporizador facial, toalha quente, after shave e massajador).',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=93dcef9d-34c0-436d-af9a-a6b5c09cc34a%7Cb3e79b92-9535-451d-942e-aaeb99b2d6ab&step=staff&type=service',
      },
      {
        id: 'corte-mascara-black',
        name: 'Corte + Esfoliante + Máscara Black',
        duration: '1 h',
        price: '22 €',
        badge: 'INCLUI LAVAGEM',
        description:
          'Corte com hidratação e purificação de pele (Esfoliante + Máscara Black). Oferta de lavagem de cabelo.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=d8fb3ed2-4a52-49bc-9343-8ebe1bbfa8fa&step=staff&type=service',
      },
      {
        id: 'corte-vip',
        name: 'Corte VIP (Corte + Barba + Sobrancelha)',
        duration: '1 h 05 min',
        price: '20 €',
        badge: 'POPULAR',
        description: 'Corte personalizado, alinhamento de barba e design de sobrancelha numa única sessão.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=9f73e2f3-1299-4b03-9979-ed2bb3e7df83&step=staff&type=service',
      },
      {
        id: 'corte-barba',
        name: 'Corte + Barba',
        duration: '1 h 10 min',
        price: '18 €',
        description: 'Harmonia completa entre o corte de cabelo e a estrutura da barba.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=5569707f-e9e4-4729-b1e1-f2736a6ef888%7Cb3e79b92-9535-451d-942e-aaeb99b2d6ab&step=staff&type=service',
      },
      {
        id: 'corte-pigmentacao',
        name: 'Corte + Pigmentação',
        duration: '1 h',
        price: '22 €',
        description: 'Corte de cabelo com aplicação de pigmentação para realce de contornos e densidade.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=37c04bcd-b7a8-406b-abb7-62a33964a7ff&step=staff&type=service',
      },
      {
        id: 'corte-desfrise',
        name: 'Corte + Desfrise',
        duration: '50 min',
        price: '25 €',
        description: 'Corte masculino conjugado com relaxamento capilar.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=e2872a49-3d57-444e-8cb9-2bdf63272545&step=staff&type=service',
      },
      {
        id: 'corte-selagem',
        name: 'Corte + Selagem',
        duration: '1 h 30 min',
        price: '40 €',
        description: 'Corte completo e selagem capilar disciplinante.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=5eb1e24b-b3af-4555-944f-08ebf150807e&step=staff&type=service',
      },
      {
        id: 'corte-madeixas',
        name: 'Corte + Madeixas',
        duration: '2 h',
        price: '40 €',
        description: 'Corte masculino e trabalho técnico de madeixas.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=901bde95-10a0-442e-9ff5-a0c69e98b2b9&step=staff&type=service',
      },
      {
        id: 'corte-platinado',
        name: 'Corte + Platinado',
        duration: '3 h',
        price: 'Desde 50 €',
        description:
          'Descoloração global e corte (desde 50 €, variável consoante o número de passagens necessárias).',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=e9bc913c-3fb9-47a3-9335-6eb435ad50b1&step=staff&type=service',
      },
    ],
  },
  {
    id: 'tratamentos',
    index: '04',
    title: 'TRATAMENTOS',
    subtitle: 'Cuidado dérmico, pigmentação corretiva e transformação técnica.',
    items: [
      {
        id: 'esfoliante-mascara-preta',
        name: 'Esfoliante + Máscara Preta',
        duration: '15 min',
        price: '10 €',
        badge: 'SKINCARE',
        description: 'Esfoliação preparatória e aplicação de Máscara Black para remoção de pontos negros.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=ac47145a-a8ed-4186-9f8b-44350afeda0f&step=staff&type=service',
      },
      {
        id: 'pigmentacao-cabelo',
        name: 'Pigmentação de Cabelo',
        duration: '20 min',
        price: '10 €',
        description: 'Acabamento cromático para definição de contornos e preenchimento visual.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=246390d2-069c-447d-a6dc-36c85d99be23&step=staff&type=service',
      },
      {
        id: 'pigmentacao-barba',
        name: 'Pigmentação de Barba',
        duration: '20 min',
        price: '8 €',
        description: 'Uniformização de tom e reforço das linhas da barba.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=f8315e15-3ad0-4f71-a2ec-d4624e50417d&step=staff&type=service',
      },
      {
        id: 'desfrise',
        name: 'Desfrise',
        duration: '15 min',
        price: '15 €',
        description: 'Redução de volume e alinhamento rápido dos fios.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=8df95076-bbee-4b71-9aca-bf91a7dc2e5a&step=staff&type=service',
      },
      {
        id: 'madeixas',
        name: 'Madeixas',
        duration: '1 h',
        price: '30 €',
        description: 'Iluminação seletiva dos fios para destaque da textura do corte.',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=c63ee412-590d-4678-a0f9-c8159a01dd5f&step=staff&type=service',
      },
      {
        id: 'platinado',
        name: 'Platinado',
        duration: '2 h',
        price: 'Desde 40 €',
        description: 'Descoloração global (desde 40 €, variável consoante o número de aplicações necessárias).',
        bookingUrl:
          'https://invictusbarbeariasacavem.setmore.com/book?products=b6347fe9-5e65-4e15-ab3c-0c9d37e561e7&step=staff&type=service',
      },
    ],
  },
];

export const VERIFIED_REVIEWS: VerifiedReview[] = [
  {
    id: 'sen-riusuu',
    author: 'Sen Riusuu',
    source: 'Avaliação Google · Publicada no Setmore',
    rating: 5,
    quote: 'Serviço impecável. Atitude e serviço extremamente profissionais.',
  },
  {
    id: 'guilherme-silva',
    author: 'Guilherme Silva',
    source: 'Avaliação Google · Publicada no Setmore',
    rating: 5,
    quote: 'Atendimento impecável! Victor é um excelente profissional! Voltarei mais vezes!',
  },
  {
    id: 'marcos-silva',
    author: 'marcos silva silva',
    source: 'Avaliação Google · Publicada no Setmore',
    rating: 5,
    quote: 'Fui muito bem atendido, trabalho profissional, fiz corte e barba e pigmentação de cabelos barba.',
  },
  {
    id: 'charles-antunes',
    author: 'Charles Antunes',
    source: 'Avaliação Google · Publicada no Setmore',
    rating: 5,
    quote: 'Top.',
  },
];

export const EXPERIENCE_PILLARS = [
  {
    index: '01',
    title: 'PRECISÃO DE LÂMINA',
    description:
      'Degradês limpos, contornos geométricos e desenhos à mão livre executados com rigor técnico.',
  },
  {
    index: '02',
    title: 'RITUAL DE PELE & BARBA',
    description:
      'Esfoliação, Máscara Black purificante, vaporizador de ozono, toalha quente e finalização com massajador.',
  },
  {
    index: '03',
    title: 'AMBIENTE & CULTURA',
    description:
      'No coração de Sacavém (Av. São José, 26A), um espaço onde a tradição da barbearia cruza a estética contemporânea.',
  },
];
