'use client';

import type { ButtonHTMLAttributes, MouseEvent } from 'react';

export type ReserveButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  analyticsEventName?: string;
  analyticsParams?: Record<string, unknown>;
};

const DEFAULT_EVENT_NAME = 'reservation_click';

export default function ReserveButton({
  onClick,
  analyticsEventName = DEFAULT_EVENT_NAME,
  analyticsParams,
  className,
  type = 'button',
  ...props
}: ReserveButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', analyticsEventName, {
        page_path: window.location.pathname,
        ...analyticsParams,
      });
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={className}
      {...props}
    />
  );
}
