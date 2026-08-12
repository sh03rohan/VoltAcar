import type { ImageMetadata } from 'astro';

import slideRoof from '../assets/images/slide-roof.webp';
import slideInterior from '../assets/images/slide-interior.webp';
import featureCabin from '../assets/images/feature-cabin.webp';
import slideStyle from '../assets/images/slide-style.webp';
import slideRide from '../assets/images/slide-ride.webp';

import viewFront from '../assets/images/feature-charging.webp';
import viewTop from '../assets/images/hotspot-car.webp';
import viewOverhead from '../assets/images/feature-range.webp';
import viewInterior from '../assets/images/feature-cabin.webp';

/**
 * The car explorer's content and its viewpoints.
 *
 * Two separate things live here on purpose:
 *
 *   `features` — what a hotspot says. One object per subject, keyed by id.
 *   `views`    — what the visitor is looking at. Each names a render and
 *                lists which features are visible on it and where.
 *
 * Keeping them apart is what lets the same subject appear on several views at
 * different coordinates without its copy being duplicated, and it is what
 * makes the viewer swappable: a turntable of 36 renders, or a WebGL camera
 * reporting projected positions, only ever replaces `views`.
 *
 * Marker coordinates are percentages **of the rendered image**, not of the
 * stage. The stage is a fixed box and every render has its own aspect ratio,
 * so the component measures the contained image box and maps these onto it —
 * otherwise a letterboxed view like the interior would put every marker in
 * the wrong place.
 */
export interface Feature {
  id: string;
  /** Small label above the title. */
  category: string;
  title: string;
  description: string;
  /** Specification lines. Optional — omit and the list is not rendered. */
  features?: string[];
  image: ImageMetadata;
  imageAlt: string;
  learnMore?: { label: string; href: string };
}

export interface ViewHotspot {
  /** Which entry in `features` this marker opens. */
  feature: string;
  /** Percentage of the rendered image, not the stage. */
  x: number;
  y: number;
}

export interface CarView {
  id: string;
  label: string;
  /** Short name for the marker's accessible label. */
  image: ImageMetadata;
  imageAlt: string;
  /** Draw the dashed ground ring. Off for views taken from inside the car,
      where a ground plane is nonsense. Defaults to on. */
  ground?: boolean;
  hotspots: ViewHotspot[];
}

/* -------------------------------------------------------------------------
   Features
   -------------------------------------------------------------------------
   Titles and descriptions are the Figma's own (#48:60), unchanged. The
   `category` labels name the part each marker sits on. The specification
   lines are new: the design carries none, and they were left out until the
   reference for this section showed them as part of the card. Where the site
   already states a number — 500 km of range, a 30 minute charge to 80%, 20+
   safety features, all from the home page's stat row — that number is used
   rather than a new one being made up. Replace any of them here.            */
export const features: Feature[] = [
  {
    id: 'roof',
    category: 'Roof',
    title: 'Panoramic Roof',
    description:
      'Expansive roof design for natural light, fresh air, and a feeling of openness.',
    features: ['Full-length glass canopy', 'UV and infrared filtering', 'Open, airy cabin'],
    image: slideRoof,
    imageAlt: 'The car on a mountain road, its glass canopy catching the light',
  },
  {
    /* The frame gives this marker the title of the one below it and a body
       belonging to something else entirely — "Compact, Professional-Grade
       Imaging" is camera copy. Both are reproduced unchanged rather than
       invented over; it is a known defect in the source. Replace here. */
    id: 'cargo',
    category: 'Cargo',
    title: 'Effortless Rear Access',
    description: 'Compact, Professional-Grade Imaging.',
    image: featureCabin,
    imageAlt: 'The car’s cabin seen from behind the front seats',
  },
  {
    id: 'rear',
    category: 'Rear Door',
    title: 'Effortless Rear Access',
    description: 'Smooth, wide-opening back door for easy entry and cargo loading.',
    features: ['Wide-opening tailgate', 'Low loading lip', 'Flat-folding rear bench'],
    image: slideInterior,
    imageAlt: 'The car’s interior looking out through the rear glass',
  },
  {
    id: 'doors',
    category: 'Side Entry',
    title: 'Sleek Side Entry',
    description: 'Reinforced, quiet, and secure doors designed for convenience and safety.',
    features: ['Reinforced side structure', 'Acoustic laminated glass', '20+ safety features'],
    image: slideStyle,
    imageAlt: 'The car in profile on a city street, showing its door line',
  },
  {
    id: 'wheels',
    category: 'Wheels',
    title: 'Premium Grip Tires',
    description: 'Engineered for smooth handling on every road surface.',
    features: [
      '18" aero alloy wheels',
      'Low rolling resistance',
      '500 km on a single charge',
      'Enhanced grip and stability',
    ],
    image: slideRide,
    imageAlt: 'Close-up of the car’s wheel and suspension',
  },
  {
    id: 'lights',
    category: 'Lighting',
    title: 'Signature Light Bar',
    description: 'A full-width daytime signature that makes the car unmistakable after dark.',
    features: ['Full-width LED bar', 'Adaptive high beam', 'Welcome and farewell sequence'],
    image: slideStyle,
    imageAlt: 'The front of the car showing its illuminated light bar',
  },
  {
    id: 'cabin',
    category: 'Cabin',
    title: 'Driver Display',
    description: 'Everything the drive needs on one clear panel, and nothing it does not.',
    features: ['Widescreen driver display', 'Voice and touch control', 'Over-the-air updates'],
    image: featureCabin,
    imageAlt: 'The car’s dashboard and driver display',
  },
];

/* -------------------------------------------------------------------------
   Views
   -------------------------------------------------------------------------
   Four genuinely distinct viewpoints, which is what this project's renders
   actually contain — a front elevation, two plan views and the cabin. They
   are studio shots on white, which is why the viewer sits in a white panel.

   This is *not* a turntable: the renders are separate photographs, not even
   steps around one axis, so dragging steps between viewpoints rather than
   spinning the car. Give this array 36 evenly-spaced renders and the same
   component becomes a true 360 with no other change.                        */
export const views: CarView[] = [
  {
    id: 'front',
    label: 'Front',
    image: viewFront,
    imageAlt: 'The car seen head-on',
    /* Three, not four: the doors are edge-on from here and a marker for them
       would sit on the wing mirror. A view only carries the subjects it can
       actually show. */
    hotspots: [
      { feature: 'roof', x: 50, y: 22 },
      { feature: 'lights', x: 63.5, y: 50 },
      { feature: 'wheels', x: 78, y: 76 },
    ],
  },
  {
    id: 'top',
    label: 'Top View',
    image: viewTop,
    imageAlt: 'The car from directly above, showing its roof, doors and wheels',
    /* The frame's own marker coordinates (#143:641 and siblings), converted
       from the 860x464 stage to percentages of the render. */
    hotspots: [
      { feature: 'roof', x: 37.67, y: 31.47 },
      { feature: 'cargo', x: 66.16, y: 30.17 },
      { feature: 'rear', x: 6.86, y: 46.12 },
      { feature: 'doors', x: 46.86, y: 75.65 },
      { feature: 'wheels', x: 83.49, y: 91.16 },
    ],
  },
  {
    id: 'overhead',
    label: 'Overhead',
    image: viewOverhead,
    imageAlt: 'The car from above with the cabin visible through the glass roof',
    hotspots: [
      { feature: 'cabin', x: 62, y: 50 },
      { feature: 'roof', x: 40, y: 22 },
      { feature: 'rear', x: 8, y: 50 },
      { feature: 'wheels', x: 80, y: 86 },
    ],
  },
  {
    id: 'interior',
    label: 'Interior',
    image: viewInterior,
    imageAlt: 'The cabin from behind the front seats, looking out through the windscreen',
    ground: false,
    hotspots: [
      { feature: 'roof', x: 50, y: 26 },
      { feature: 'cabin', x: 57, y: 57 },
      { feature: 'doors', x: 27, y: 70 },
    ],
  },
];

/** Lookup used by the component; ids are authored by hand, so guard them. */
export const featureById = new Map(features.map((f) => [f.id, f]));
