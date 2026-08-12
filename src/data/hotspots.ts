import type { ImageMetadata } from 'astro';

import slideRoof from '../assets/images/slide-roof.webp';
import slideInterior from '../assets/images/slide-interior.webp';
import featureCabin from '../assets/images/feature-cabin.webp';
import slideStyle from '../assets/images/slide-style.webp';
import slideRide from '../assets/images/slide-ride.webp';

/**
 * The car diagram's hotspots — Figma #48:60.
 *
 * Kept out of the component so a hotspot can be added, removed or reordered
 * without touching markup or script: `CarHotspots.astro` maps over whatever is
 * here, and the panel logic is indexed rather than hard-coded. Any number
 * works.
 *
 * `mx`/`my` are the marker's top-left corner inside the frame's own 860x464
 * stage, straight from Figma. The component converts them to percentages, so
 * the markers stay locked to the render at every size.
 *
 * `category` labels the part each marker sits on. `title` and `description`
 * are the frame's own copy, unchanged.
 *
 * `features` and `learnMore` are optional and deliberately unset. The design
 * carries no per-part specification copy, and inventing bullet points for a
 * fictional car would be inventing product claims. Both are fully wired in the
 * component: add them here and they render.
 */
export interface Hotspot {
  /** Stable identifier, used for the panel's DOM id. */
  id: string;
  /** Small label above the title — the part the marker sits on. */
  category: string;
  title: string;
  description: string;
  image: ImageMetadata;
  imageAlt: string;
  /** Optional specification list. Renders as a bulleted list when present. */
  features?: string[];
  /** Optional call to action below the copy. */
  learnMore?: { label: string; href: string };
  /** Marker top-left within the 860x464 stage. */
  mx: number;
  my: number;
}

export const hotspots: Hotspot[] = [
  {
    id: 'roof',
    category: 'Roof',
    title: 'Panoramic Roof',
    description:
      'Expansive roof design for natural light, fresh air, and a feeling of openness.',
    image: slideRoof,
    imageAlt: 'The car on a mountain road, its glass canopy roof catching the light',
    mx: 301,
    my: 123,
  },
  {
    /* The frame gives this marker the title of the one below it and a body
       that belongs to something else entirely — "Compact, Professional-Grade
       Imaging" is camera copy. Both are reproduced unchanged rather than
       invented over; it is a known defect in the source, recorded in the
       deviation register. Replace `title` and `description` here. */
    id: 'cargo',
    category: 'Cargo',
    title: 'Effortless Rear Access',
    description: 'Compact, Professional-Grade Imaging.',
    image: featureCabin,
    imageAlt: 'The car’s cabin seen from behind the front seats',
    mx: 546,
    my: 117,
  },
  {
    id: 'rear',
    category: 'Rear Door',
    title: 'Effortless Rear Access',
    description: 'Smooth, wide-opening back door for easy entry and cargo loading.',
    image: slideInterior,
    imageAlt: 'The car’s interior looking out through the rear glass',
    mx: 36,
    my: 191,
  },
  {
    id: 'doors',
    category: 'Side Entry',
    title: 'Sleek Side Entry',
    description: 'Reinforced, quiet, and secure doors designed for convenience and safety.',
    image: slideStyle,
    imageAlt: 'The car in profile on a city street, showing its door line',
    mx: 380,
    my: 328,
  },
  {
    id: 'wheels',
    category: 'Wheels',
    title: 'Premium Grip Tires',
    description: 'Engineered for smooth handling on every road surface.',
    image: slideRide,
    imageAlt: 'Close-up of the car’s wheel and suspension',
    mx: 695,
    my: 400,
  },
];
