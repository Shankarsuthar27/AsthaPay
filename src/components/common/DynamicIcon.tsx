import React from 'react';
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-4 h-4', size }) => {
  // @ts-ignore
  const IconComponent = (LucideIcons as Record<string, React.FC<LucideIcons.LucideProps>>)[name] || LucideIcons.Sparkles;

  return <IconComponent className={className} size={size} />;
};
