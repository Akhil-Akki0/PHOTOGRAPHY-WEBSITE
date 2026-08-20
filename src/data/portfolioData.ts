import { PhotoProject, ServiceItem, JournalPost } from '../types';

export const AKHIL_PROFILE = {
  name: 'Akhil.A',
  brandName: 'AKHILANUBHAVA',
  studioName: 'LUMIÈRE STUDIO',
  title: 'Photographer • Creative • Visual Storyteller',
  bio: 'Akhil is an editorial, nature, and documentary visual storyteller. Working at the intersection of quiet observation and raw cinematic tension, his imagery seeks the fleeting poetry between light, shadow, and human spirit.',
  location: 'Bangalore & Worldwide',
  experienceYears: '8+ Years of Visual Direction',
  portraitUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3vgZJYs9Vc0pmYe9qU88gpFzDEsiMleLVokDQbmqtR2iUebcN-rX-ri9OAICBzFb_kelDH6cUGxt3QPyicMlnPQZny4bAth4d1OxP64yC9-DGM6nDPJvTbMjobgSH9uHd726LDacSP7sAA4dv-bLrGMONjX6s59Ub1QnrIxqcsYxaREQZpHKr68B1UGJQs19hvWojanLaEeVESyi3EQLiehlySfknEG8KqgblM1_wQgLikI8YZlCbZWj-UVTVS4w2kg',
  gear: [
    'Leica M11 & SL2-S Bodies',
    'Summilux-M 35mm f/1.4 ASPH',
    'Noctilux-M 50mm f/0.95',
    'Sony α7R V with G-Master Primes',
    'Hasselblad X2D 100C Medium Format'
  ],
  quote: 'We photograph people, places and stories with an honest, cinematic eye.'
};

export const COLOR_PROJECTS: PhotoProject[] = [
  {
    id: 'vibrant-wings',
    number: '01',
    title: 'Vibrant Wings',
    category: 'NATURE',
    subcategory: 'WILDLIFE',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIofDFt18ET_DNuQBV9OLiEBGJAEIXfKGAFGnxnITDcMXTc2tYEqGliS9WjQYrOG5JMpZB1OAUhH72rw4VBOVLnV9pBzeF6wrcjGo3KBdmxcc-M4918yuERk43Yg9vMW5zuap9X1-CcDs8K3Ry10vXNI-Fm_SUbriJfTFChnDmHjmYSKSR3HQ5lKGE9iC5COAOLBfaDzxyEmaaORyMqoLAN3NjOgKJB42TOSDrV4jyseb_apXxZ1FwHKFZZU1KVwaMRQ',
    altText: 'Vibrant plumage bird perched on delicate moss branch',
    aspectRatio: '4/3',
    spanCols: 'md:col-span-8',
    story: 'Captured at first dawn in the canopy of the Western Ghats. The interplay of dew-kissed leaves and saturated plumage reflects the untouched vitality of the rainforest awakening.',
    location: 'Western Ghats, India',
    year: '2024',
    exif: {
      camera: 'Sony α7R V',
      lens: 'FE 600mm f/4 GM OSS',
      focalLength: '600mm',
      aperture: 'f/4.0',
      shutterSpeed: '1/2500s',
      iso: '400'
    }
  },
  {
    id: 'blossom-duet',
    number: '02',
    title: 'Blossom Duet',
    category: 'NATURE',
    subcategory: 'SPRING',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWrsBKg-LrCn3PfK21tXuka2ma6uBYaMc0pMY4pJuz8tkgfZuUwHZ3TziQppQeibHHpO13JMg6YLFABIU4KrbFrypUbmeoCbyLWnVnZlgqUaPaS20dz1iMkOLniOia2iHGLG7WqIB-Fj2mbrnUi090R6IFb9A1Srxv8tMwXW30JGivurV68uOFKZi6XUhwd9UdG1y0Qk80WP5HKU2BZYQyW0EdktLaAfhmrXw-h7vRlOD5VQjaOBkP6YKzQlEHqGxuOg',
    altText: 'Pair of delicate songbirds among spring cherry blossoms',
    aspectRatio: '3/4',
    spanCols: 'md:col-span-4 md:col-start-9 md:mt-48',
    story: 'A fleeting, synchronized pause between two songbirds as spring mist cleared across the orchard highlands.',
    location: 'Himalayan Foothills',
    year: '2024',
    exif: {
      camera: 'Leica SL2-S',
      lens: 'APO-Vario-Elmarit-SL 90-280mm',
      focalLength: '240mm',
      aperture: 'f/4.0',
      shutterSpeed: '1/1600s',
      iso: '200'
    }
  },
  {
    id: 'serene-glider',
    number: '03',
    title: 'Serene Glider',
    category: 'OCEAN',
    subcategory: 'DEEP',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsJcLhozbCCa6A18u7lGM8e8_lMXXxmoa5a6w5KYOBccW4pbx9tlocqTb6cpXRwP3LTIWrOagf59uTEsqSdJZMzxsbkj6JXqdhfIyjJgqgVH4xiHUVEIq3LR85F_OIGR9cXCRfl4ewdw9LckloknvNaP3q4_Fv3zq3RCaIRqUeq41slQb7VcGKcBpnqQqJOTn-NipzXy4OQQlgcFBYJJ-yxh0B4mkdXUCvXwvZCJ4hmJ9eku5-AsF7idcHr2yGghFLmA',
    altText: 'Majestic sea turtle gliding through crystalline turquoise water',
    aspectRatio: '21/9',
    spanCols: 'md:col-span-12 mt-12',
    story: 'Submerged forty feet below the surface in the Andaman Sea. The ancient rhythm of oceanic migration captured in pristine clarity as light refracted across the seabed.',
    location: 'Andaman Waters',
    year: '2024',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 21mm f/4 in Nauticam Housing',
      focalLength: '21mm',
      aperture: 'f/5.6',
      shutterSpeed: '1/500s',
      iso: '160'
    }
  },
  {
    id: 'gentle-giant',
    number: '04',
    title: 'Gentle Giant',
    category: 'OCEAN',
    subcategory: 'MAJESTIC',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtm77WHj4j17YkpuaTKzFLqXQwYXIRXrcXCOLC7UBWDMdVVNj8akoMa0PjEVxFneR1Aw2bgl0oCpClOmp0LNziOz741NK-RVFgsAmlzdHz5u75TGnT7fsTs6Vem_yGehQPHYvQRFZllit-XZAO6Mmd4vTM6VmVYEGFUQbEqYBaCblaY_FWnGnVyesShnobUYankcpCdrUIYlNdArkC_-jcpVEN7Tf3ywS7dWgnm1F17FxonN09qI34lAcjwRtpbBwd6A',
    altText: 'Close up underwater profile of a colossal marine life creature',
    aspectRatio: 'square',
    spanCols: 'md:col-span-6 md:col-start-7 mt-12',
    story: 'Eye-to-eye encounter in open pelagic blue. An awe-inspiring stillness that reminds the photographer of our small place in the planetary tapestry.',
    location: 'Indian Ocean Pelagic Trench',
    year: '2023',
    exif: {
      camera: 'Sony α7R V',
      lens: 'FE 16-35mm f/2.8 GM II',
      focalLength: '24mm',
      aperture: 'f/3.5',
      shutterSpeed: '1/800s',
      iso: '250'
    }
  }
];

export const GRAYSCALE_PROJECTS: PhotoProject[] = [
  {
    id: 'shadow-hunter',
    number: '05',
    title: 'Shadow Hunter',
    category: 'WILDLIFE',
    subcategory: 'AMAZON',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz-YC-VOt1aSIxeEsQmeBvyBUpJnPeHQQzL7HsswpONfp6NH5ZFJBnQIPKZh0ngFMyv0V9IDnTXSzqoc3_M0hmIPv7IAoAWzm96hvGPxMYbSuy8t0YlxvZP42bufYjU0uZU3s9ioGJED9Bz2q8yJvD_U6M77tNzQSgw08RCmZy0ch2oKAtA3M5bGUih6qglH5MR0h6d1n0QqOJASMMEKuDE6cOiNlRblZEYS4so4oOp-y_uXOzwJK5DAOW1XDROOcXtQ',
    altText: 'Dramatic monochrome jaguar stalking through dense jungle shadows',
    aspectRatio: '4/3',
    spanCols: 'md:col-span-8',
    isGrayscale: true,
    story: 'Waiting twelve hours inside a riverbank hide. The apex predator emerged silently through twilight fog, its gaze cutting through dense foliage.',
    location: 'Peruvian Rainforest',
    year: '2023',
    exif: {
      camera: 'Leica M11 Monochrom',
      lens: 'APO-Summicron-M 90mm f/2 ASPH',
      focalLength: '90mm',
      aperture: 'f/2.0',
      shutterSpeed: '1/320s',
      iso: '1600'
    }
  },
  {
    id: 'azure-flight',
    number: '06',
    title: 'Azure Flight',
    category: 'AVIAN',
    subcategory: 'TROPICS',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPasR6xQScTaJMYnARSEQd8Lv2rBu5eJB1VY_xY8MCloADlmD_S_vGk8c0v9dOHgsSTrkg1R3at--2ywrm9gjoQUKDh6Fj190s_XZydlt8Vif2rYO0-AUy50neih3h4hDXWzEfn8Wy3wb-OChMSl3keXX2gdPPe9E_xwqCcKqc6JGxiVAD9Za-6J0jKcuj50ZOuLCe6MEbIKa0WzH6iyHgHFPZgBCaskAbQLEtnMsO4Xdn67C0zB34YvoCDsFPH0nhqw',
    altText: 'Monochrome dynamic wingspan of exotic bird soaring in mid-air',
    aspectRatio: '3/4',
    spanCols: 'md:col-span-4 md:col-start-9 md:mt-48',
    isGrayscale: true,
    story: 'Frozen in high-contrast flight against an overcast storm front. Feather textures and aerodynamic precision highlighted in stark tonal range.',
    location: 'Costa Rican Highlands',
    year: '2023',
    exif: {
      camera: 'Sony α7R V',
      lens: 'FE 400mm f/2.8 GM OSS',
      focalLength: '400mm',
      aperture: 'f/2.8',
      shutterSpeed: '1/4000s',
      iso: '800'
    }
  },
  {
    id: 'masked-observer',
    number: '07',
    title: 'Masked Observer',
    category: 'FOREST',
    subcategory: 'NOCTURNAL',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwXGZBwfYfwHI9Lzhl9_6kldgoeKYNKWECLuij9kAVWPXIp3VOnjn7xpTJWc-hhQBFR7nGYWkJnLI6QRrWw8uVXFeieUxGTfUVycNhN15hONmhiycmtdyGcgfT7pO_n10qexOad0mjjYSELBg3cMGhO9omW0qsc1gOcuQJiUIjWBVmpZIdXJjNPYaJNWFJHsHzYomgKQGKRaPKwtPwzXldncSA3WyS1c01VvwFQJsQ0YTy3JS-ZWbXPW6th6cqpnEKRA',
    altText: 'Intense macro close-up of woodland mammal exploring the forest undergrowth',
    aspectRatio: '21/9',
    spanCols: 'md:col-span-12 mt-12',
    isGrayscale: true,
    story: 'A curiosity shared between species in the midnight fog. Natural moonlight illuminating intricate whisker details and contemplative eyes.',
    location: 'Pacific Northwest Old Growth',
    year: '2024',
    exif: {
      camera: 'Leica SL2-S',
      lens: 'Summilux-SL 50mm f/1.4 ASPH',
      focalLength: '50mm',
      aperture: 'f/1.4',
      shutterSpeed: '1/125s',
      iso: '3200'
    }
  },
  {
    id: 'pine-sentinel',
    number: '08',
    title: 'Pine Sentinel',
    category: 'NATURE',
    subcategory: 'HIGHLANDS',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArD9IKHnCgN9W2T8YQL1m_jIcd6UAqLW2cOLDHmIBLl0gTgJGSJ_bEbtrBdhoxqxR1kUT3eqIVFLkuy9-svPHsq0RHPgeWZoELXlmpaj70hb_5gHeqtnH61Hd-8RgZW2nJkziyZVnN9dgaBXJJD4zrpXGp3gp_AkYer_40dCQH-vzcrPvClv4bYFlR86lH4ZwPVlteRqeOTq77Kw01QxLiOAnEdaFP7y2162kDUuc0w3QpflOM4MEL9o1CiLFDhPUx0Q',
    altText: 'Highland creature poised on weathered pine needle branch in dramatic shadow',
    aspectRatio: 'square',
    spanCols: 'md:col-span-6 md:col-start-7 mt-12',
    isGrayscale: true,
    story: 'Perched in the alpine coniferous zone. The stark contrasts of bark ridges and vigilant posture mirror the harsh beauty of mountain solitude.',
    location: 'Nilgiri Shola Forests',
    year: '2024',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 135mm f/2.8',
      focalLength: '135mm',
      aperture: 'f/3.2',
      shutterSpeed: '1/1000s',
      iso: '400'
    }
  }
];

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Editorial Portraits',
    description: 'Curated, high-fashion styling meets authentic emotion. We create striking, timeless portraits that belong in a magazine spread.',
    details: [
      'Pre-production creative direction and moodboarding',
      'Full lighting setup on location or private studio',
      'Fine-art analog grain and master tonal grading',
      'High-resolution archival print files & digital deliverables'
    ],
    deliverables: '25-40 Master Curated Retouched Frames',
    turnaround: '10 Business Days'
  },
  {
    number: '02',
    title: 'Documentary Events',
    description: 'Unobtrusive, cinematic coverage of your most important days. Focused on real moments, raw emotion, and storytelling.',
    details: [
      'Discreet, fly-on-the-wall narrative coverage',
      'Dual-camera Leica & Hasselblad documentation',
      'Chronological visual story book composition',
      'Private online preview gallery for guests & press'
    ],
    deliverables: '300-500 Story-Driven Processed Frames',
    turnaround: '14 Business Days'
  },
  {
    number: '03',
    title: 'Brand Narratives',
    description: 'Visual identity creation for luxury brands, architects, and designers seeking a sophisticated, minimalist aesthetic.',
    details: [
      'Comprehensive architectural and spatial compositions',
      'Brand hero banners, editorial lookbooks, and campaign assets',
      'Licensing rights for global digital, print & billboard campaigns',
      'On-site color calibration and styling consultation'
    ],
    deliverables: 'Custom Campaign Library + Source Color Proofs',
    turnaround: '14 Business Days'
  }
];

export const JOURNAL_POSTS: JournalPost[] = [
  {
    id: 'art-of-quiet-light',
    number: '01',
    title: 'The Architecture of Quiet Light',
    date: 'August 14, 2024',
    category: 'ESSAY',
    readTime: '4 min read',
    summary: 'Why removing color reveals the structural bones of a subject, and how monochrome allows the human eye to experience pure form.',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz-YC-VOt1aSIxeEsQmeBvyBUpJnPeHQQzL7HsswpONfp6NH5ZFJBnQIPKZh0ngFMyv0V9IDnTXSzqoc3_M0hmIPv7IAoAWzm96hvGPxMYbSuy8t0YlxvZP42bufYjU0uZU3s9ioGJED9Bz2q8yJvD_U6M77tNzQSgw08RCmZy0ch2oKAtA3M5bGUih6qglH5MR0h6d1n0QqOJASMMEKuDE6cOiNlRblZEYS4so4oOp-y_uXOzwJK5DAOW1XDROOcXtQ',
    content: [
      'In a visual ecosystem saturated with hyper-vivid stimulation, monochrome is not a subtraction; it is an amplification. When you strip chromatic noise, you are left with the three foundational pillars of visual truth: geometry, luminance, and soul.',
      'During my travels through the misty cloud forests of South America and the Nilgiris, light is rarely consistent. By tuning our vision to shadows rather than highlights, the photograph transforms from a mere record of reality into an architectural mood.'
    ]
  },
  {
    id: 'patience-behind-the-lens',
    number: '02',
    title: 'Twelve Hours for a Single Frame',
    date: 'July 28, 2024',
    category: 'FIELD NOTES',
    readTime: '6 min read',
    summary: 'Notes from the Amazon riverbank on remaining completely still while waiting for apex predators in extreme conditions.',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIofDFt18ET_DNuQBV9OLiEBGJAEIXfKGAFGnxnITDcMXTc2tYEqGliS9WjQYrOG5JMpZB1OAUhH72rw4VBOVLnV9pBzeF6wrcjGo3KBdmxcc-M4918yuERk43Yg9vMW5zuap9X1-CcDs8K3Ry10vXNI-Fm_SUbriJfTFChnDmHjmYSKSR3HQ5lKGE9iC5COAOLBfaDzxyEmaaORyMqoLAN3NjOgKJB42TOSDrV4jyseb_apXxZ1FwHKFZZU1KVwaMRQ',
    content: [
      'Wildlife photography is 98% patience, 1% anticipation, and 1% mechanical actuation. When tracking wildlife, breath control and environmental respect dictate whether an animal accepts your proximity.',
      'The goal is never to conquer nature with long telephotos, but to be permitted into its sanctuary as a quiet witness.'
    ]
  }
];
