import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({
  children,
  className = '',
  hoverable = false,
}: CardProps) {
  return (
    <div
      className={`
        rounded-xl
        border border-rose-100
        bg-gradient-to-br from-white to-rose-50
        overflow-hidden
        ${hoverable ? 'hover-lift' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
