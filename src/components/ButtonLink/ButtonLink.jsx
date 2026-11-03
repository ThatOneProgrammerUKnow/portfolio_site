import SmartLink from '../SmartLink/SmartLink';
import Icon from '../Icon/Icon';
import './ButtonLink.css';

/** Pill-shaped link styled as a button. Variants: primary, secondary, dark. */
export default function ButtonLink({ variant = 'primary', size, icon, className = '', children, ...linkProps }) {
  const classes = ['button', `button--${variant}`, size && `button--${size}`, className].filter(Boolean).join(' ');

  return (
    <SmartLink className={classes} {...linkProps}>
      <span>{children}</span>
      {icon && <Icon name={icon} size={size === 'lg' ? 28 : 18} />}
    </SmartLink>
  );
}
