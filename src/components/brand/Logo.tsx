import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { BRAND } from '@/lib/brand';
import {
  LOGO_BODY_PATH,
  LOGO_STROKE_WIDTH,
  LOGO_TERMINAL_PATH,
  LOGO_VIEWBOX,
} from './logo-paths';

interface LogoMarkProps {
  size?: number;
  className?: string;
}

/** The symbol on its own — favicons, app icons, tight spaces. */
export function LogoMark({ size = 30, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={LOGO_VIEWBOX}
      fill="none"
      className={className}
      aria-hidden
    >
      <path d={LOGO_BODY_PATH} stroke="hsl(var(--primary))" strokeWidth={LOGO_STROKE_WIDTH} />
      <path d={LOGO_TERMINAL_PATH} stroke="hsl(var(--accent))" strokeWidth={LOGO_STROKE_WIDTH} />
    </svg>
  );
}

interface LogoProps {
  /** Render as a link to home. Off for footers that already link elsewhere. */
  to?: string;
  size?: number;
  /** Wordmark type size in px; tracking stays 0.16em at every size. */
  wordmarkSize?: number;
  showWordmark?: boolean;
  className?: string;
}

/** The full lockup: mark plus the ENERSOL wordmark. */
export default function Logo({
  to = '/',
  size = 30,
  wordmarkSize = 18,
  showWordmark = true,
  className,
}: LogoProps) {
  const content = (
    <>
      <LogoMark size={size} />
      {showWordmark && (
        <span
          className="font-heading font-medium text-foreground"
          style={{ fontSize: wordmarkSize, letterSpacing: '0.16em' }}
        >
          {BRAND.name.toUpperCase()}
        </span>
      )}
    </>
  );

  if (!to) {
    return <span className={cn('flex items-center gap-2.5', className)}>{content}</span>;
  }

  return (
    <Link to={to} className={cn('flex items-center gap-2.5', className)} aria-label={BRAND.name}>
      {content}
    </Link>
  );
}
