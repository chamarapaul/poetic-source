// components/common/BulletList.tsx
interface BulletListProps {
    items: string[];
    className?: string;
  }
  
  export const BulletList = ({ items, className = "" }: BulletListProps) => (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="font-medium mr-2">•</span>
          <span className="text-sm md:text-base">{item}</span>
        </li>
      ))}
    </ul>
  );