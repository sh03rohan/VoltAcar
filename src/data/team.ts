import type { ImageMetadata } from 'astro';
import team1 from '../assets/images/team-1.webp';
import team2 from '../assets/images/team-2.webp';
import team3 from '../assets/images/team-3.webp';
import team4 from '../assets/images/team-4.webp';
import team5 from '../assets/images/team-5.webp';
import team6 from '../assets/images/team-6.webp';

/**
 * The team, shared by the grid (MeetTheTeam) and the profile modal
 * (TeamProfile) so the two can never drift apart.
 *
 * Roles are taken from the About page frame (#103:189) rather than the
 * standalone component (#271:15877); the two disagree on the third card and
 * the page is what ships.
 *
 * The portraits are alpha cut-outs composited to the card's 445x560 window —
 * the lime behind them is the card's own background, never part of the asset.
 * That is what lets the modal lift the person out on their own.
 */
export interface TeamMember {
  name: string;
  /** Set vertically up the card's left edge, and as the modal's eyebrow. */
  role: string;
  bio: string;
  image: ImageMetadata;
  alt: string;
  /**
   * Optional longer profile copy for the modal's right column. The Figma
   * carries no such text, so nothing is set here rather than invented — fill
   * these in and the blocks appear on their own.
   */
  about?: string;
  /** Optional skill tags, rendered as pills beside the portrait. */
  expertise?: string[];
  /** Optional short credentials, rendered as a list under the bio. */
  facts?: string[];
}

export const team: TeamMember[] = [
  {
    name: 'John Sans',
    role: 'Founder & CEO',
    bio: 'Visionary leader driving innovation and sustainability across all electric mobility projects.',
    image: team1,
    alt: 'John Sans',
  },
  {
    name: 'Michael Reed',
    role: 'Chief Financial Officer',
    bio: 'Oversees financial strategy, budgeting, and investment planning to drive sustainable growth for VoltACar.',
    image: team2,
    alt: 'Michael Reed',
  },
  {
    name: 'Daniel Brooks',
    role: 'Chief Design Officer',
    bio: 'Crafting sleek, user-friendly, and human-centered vehicle designs for modern drivers.',
    image: team3,
    alt: 'Daniel Brooks',
  },
  {
    name: 'Sarah Thompson',
    role: 'Head of Technology',
    bio: 'Tech expert leading product development and cutting-edge EV technology solutions.',
    image: team4,
    alt: 'Sarah Thompson',
  },
  {
    name: 'Emily Roberts',
    role: 'Chief People Officer',
    bio: 'Leads talent development, employee engagement, and organizational culture to empower VoltACar’s workforce.',
    image: team5,
    alt: 'Emily Roberts',
  },
  {
    name: 'Robert Wilson',
    role: 'Senior Vice President',
    bio: 'Drives strategic initiatives, oversees cross-functional teams, and ensures operational excellence across VoltACar.',
    image: team6,
    alt: 'Robert Wilson',
  },
];
