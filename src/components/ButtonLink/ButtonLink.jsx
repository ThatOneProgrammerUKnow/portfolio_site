import SmartLink from '../SmartLink/SmartLink';
import './ButtonLink.css';

/**
 * Pill-shaped link styled as a button. Variants: primary, secondary, dark.
 * `icon` takes a Lucide icon component, e.g. icon={ArrowRight}.
 */
export default function ButtonLink({ variant = 'primary', size, icon: IconComponent, className = '', children, ...linkProps }) {
  const classes = ['button', `button--${variant}`, size && `button--${size}`, className].filter(Boolean).join(' ');

  return (
    <SmartLink className={classes} {...linkProps}>
      <span>{children}</span>
      {IconComponent && <IconComponent size={size === 'lg' ? 28 : 18} />}
    </SmartLink>
  );
}
