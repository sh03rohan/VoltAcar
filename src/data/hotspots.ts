import type { ImageMetadata } from 'astro';

import slideRoof from '../assets/images/slide-roof.webp';
import slideInterior from '../assets/images/slide-interior.webp';
import featureCabin from '../assets/images/feature-cabin.webp';
import slideStyle from '../assets/images/slide-style.webp';
import slideRide from '../assets/images/slide-ride.webp';

/* Cut out from the studio renders and trimmed to the car — see the note on
   `views`. Trimming is what stops a third of the stage being spent on the
   empty margin the studio frame carried, and it is why the marker coordinates
   below are not the ones the frame states: they are percentages of the image,
   so cropping the image moves every one of them. They were remapped with the
   crop, not re-guessed. */
import viewFront from '../assets/images/car-front.webp';
import viewTop from '../assets/images/car-top.webp';
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
  /** Render inside a rounded frame rather than as a free-standing cutout.
      For any view whose picture is a scene rather than a car on a backdrop —
      there is nothing to knock out, so it is presented as an inset instead.
      Kept separate from `ground` on purpose: they happen to coincide today,
      and a fourth view could easily want one without the other. */
  framed?: boolean;
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
   Three viewpoints: a front elevation, a plan view, and the cabin.

   The first two are studio renders with their backdrops knocked out, so the
   car sits on the section rather than in a box. The cabin is not — it is a
   photograph taken from inside the car, where there is no backdrop around a
   subject to remove; the whole frame is the subject. It is presented as a
   framed inset instead.

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
      { feature: 'roof', x: 50, y: 9 },
      { feature: 'lights', x: 72.84, y: 46.21 },
      { feature: 'wheels', x: 89.73, y: 80.77 },
    ],
  },
  {
    id: 'top',
    label: 'Top View',
    image: viewTop,
    imageAlt: 'The car from directly above, showing its roof, doors and wheels',
    /* The frame's own marker coordinates (#143:641 and siblings), converted
       from the 860x464 stage to percentages of the render, then remapped onto
       the trimmed cutout — see the note on `views` above. */
    hotspots: [
      { feature: 'roof', x: 37.07, y: 29.57 },
      { feature: 'cargo', x: 66.95, y: 28.19 },
      { feature: 'rear', x: 4.76, y: 45.09 },
      { feature: 'doors', x: 46.71, y: 76.37 },
      { feature: 'wheels', x: 85.12, y: 92.8 },
    ],
  },
  {
    id: 'interior',
    label: 'Interior',
    image: viewInterior,
    imageAlt: 'The cabin from behind the front seats, looking out through the windscreen',
    ground: false,
    framed: true,
    hotspots: [
      { feature: 'roof', x: 50, y: 26 },
      { feature: 'cabin', x: 57, y: 57 },
      { feature: 'doors', x: 27, y: 70 },
    ],
  },
];

/** Lookup used by the component; ids are authored by hand, so guard them. */
export const featureById = new Map(features.map((f) => [f.id, f]));
