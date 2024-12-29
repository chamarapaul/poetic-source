// components/shared/buttons/action-buttons.tsx
import { ArrowRight } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ActionButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const ActionButton = ({
  href,
  children,
  icon: Icon = ArrowRight,
  className,
  variant = 'primary',
}: ActionButtonProps) => {
  const baseStyles = 'inline-flex items-center transition-colors';
  const variants = {
    primary:
      'px-5 py-2.5 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700',
    secondary:
      'px-6 py-3 bg-white text-gray-800 border rounded-lg hover:bg-gray-50',
  };

  return (
    <Link href={href} className={cn(baseStyles, variants[variant], className)}>
      {children}
      <Icon className="w-4 h-4 ml-2" />
    </Link>
  );
};

interface NavButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: () => void;
}

export const NavButton = ({
  href,
  children,
  icon: Icon = ArrowRight,
  iconPosition = 'right',
  className,
  onClick,
}: NavButtonProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'text-blue-600 hover:text-blue-700 inline-flex items-center gap-2 text-sm',
        className
      )}
    >
      {iconPosition === 'left' && <Icon className="w-4 h-4" />}
      {children}
      {iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </Link>
  );
};
