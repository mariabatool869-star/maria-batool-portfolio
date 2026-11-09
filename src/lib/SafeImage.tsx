import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/**
 * An image that never shows the browser's broken-image icon: if the file is
 * missing or fails to decode, `fallback` is rendered instead.
 * Pass `jpgFallback` to serve <src>.webp with <src>.jpg for older browsers.
 */
export function SafeImage({
  src, alt, fallback, width, height, className, style, loading = 'lazy', fetchPriority, jpgFallback = false,
}: {
  src: string; alt: string; fallback: ReactNode; width: number; height: number
  className?: string; style?: CSSProperties; loading?: 'lazy' | 'eager'; fetchPriority?: 'high' | 'low' | 'auto'; jpgFallback?: boolean
}) {
  const [failed, setFailed] = useState(!src)
  const ref = useRef<HTMLImageElement>(null)
  // The page is pre-rendered, so an image can fail before React attaches
  // onError. Check once on mount: complete with no pixels means it failed.
  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [])
  if (failed) return <>{fallback}</>
  const img = (
    <img
      ref={ref}
      src={jpgFallback ? `${src}.jpg` : src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      onError={() => setFailed(true)}
      className={className}
      style={style}
    />
  )
  if (!jpgFallback) return img
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      {img}
    </picture>
  )
}
