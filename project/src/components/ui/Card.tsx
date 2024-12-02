import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface CardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: 'neutral' | 'success' | 'warning' | 'danger';
  className?: string;
}

const variantStyles = {
  neutral: 'bg-blue-50 text-blue-700',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-red-700',
};

export function Card({ title, value, icon: Icon, variant = 'neutral', className }: CardProps) {
  return (
    <div className={clsx(
      'rounded-lg p-6 shadow-sm',
      variantStyles[variant],
      className
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <Icon className="w-8 h-8 opacity-80" />
      </div>
    </div>
  );
}