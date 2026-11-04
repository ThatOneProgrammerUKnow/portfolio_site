import SmartLink from '../SmartLink/SmartLink';
import './ButtonLink.css';

const ICON_SIZES = { sm: 16, lg: 28 };

/**
 * Pill-shaped link styled as a button. Variants: primary, secondary, dark. Sizes: sm, lg (default in between).
 * `icon` takes a Lucide icon component, e.g. icon={ArrowRight}.
 */
export default function ButtonLink({ variant = 'primary', size, icon: IconComponent, className = '', children, ...linkProps }) {
  const classes = ['button', `button--${variant}`, size && `button--${size}`, className].filter(Boolean).join(' ');

  return (
    <SmartLink className={classes} {...linkProps}>
      <span>{children}</span>
      {IconComponent && <IconComponent size={ICON_SIZES[size] ?? 18} />}
    </SmartLink>
  );
}
