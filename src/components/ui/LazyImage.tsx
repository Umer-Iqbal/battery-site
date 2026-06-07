import { ImgHTMLAttributes, useState } from 'react';
import { cn } from '@/utils/cn';
import { ImageOff } from 'lucide-react';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
  priority?: boolean;
}

export default function LazyImage({
  src,
  alt,
  className,
  fallbackClassName,
  priority = false,
  ...props
}: LazyImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-2 bg-muted text-muted-foreground rounded-lg',
          fallbackClassName ?? className
        )}
        role="img"
        aria-label={alt}
      >
        <ImageOff size={32} className="opacity-40" />
        <span className="text-xs text-center px-4">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
}
