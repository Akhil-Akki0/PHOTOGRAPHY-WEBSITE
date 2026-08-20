export interface PhotoProject {
  id: string;
  number: string;
  title: string;
  category: string;
  subcategory: string;
  imageUrl: string;
  altText: string;
  isGrayscale?: boolean;
  aspectRatio: '4/3' | '3/4' | '21/9' | 'square' | '16/9';
  spanCols: string;
  offsetCols?: string;
  story: string;
  location: string;
  year: string;
  exif: {
    camera: string;
    lens: string;
    focalLength: string;
    aperture: string;
    shutterSpeed: string;
    iso: string;
  };
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  details: string[];
  deliverables: string;
  turnaround: string;
}

export interface JournalPost {
  id: string;
  number: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  summary: string;
  coverUrl: string;
  content: string[];
}
