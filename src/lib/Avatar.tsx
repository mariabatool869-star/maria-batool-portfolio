import { Monogram } from './Monogram'
import { SafeImage } from './SafeImage'

/**
 * Circular portrait avatar with a thin blue→cyan ring. The image is 192px
 * (sharp up to 64px at 3x); the "SR" monogram shows if it fails to load.
 */
export function Avatar({ size }: { size: number }) {
  return (
    <span className="avatar-ring" style={{ width: size, height: size }}>
      <SafeImage
        src="/images/avatar"
        jpgFallback
        alt=""
        width={size}
        height={size}
        loading="eager"
        className="h-full w-full rounded-full object-cover"
        fallback={<Monogram size={size - 4} />}
      />
    </span>
  )
}
