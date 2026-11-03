import { imageUrl } from '../../utils/images';
import './ImageSlot.css';

/**
 * Shows the real image once Sanity provides `src`; until then a dashed
 * placeholder like the approved designs. Placeholders are hidden from
 * assistive tech because they carry no information.
 */
export default function ImageSlot({ image, className = '', eager = false, width, height }) {
  if (image?.src) {
    return (
      <img
        className={`image-slot ${className}`}
        src={imageUrl(image.src, width)}
        alt={image.alt ?? ''}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        decoding="async"
      />
    );
  }

  return (
    <div className={`image-slot image-slot--placeholder ${className}`} aria-hidden="true">
      <span>{image?.placeholder}</span>
    </div>
  );
}
