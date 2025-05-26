import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = "" }) => {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
            )}

            {item.current ? (
              <span className="flex items-center text-sm font-medium text-gray-900">
                {index === 0 && <Home className="w-4 h-4 mr-2" />}
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href || "#"}
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors duration-200"
              >
                {index === 0 && <Home className="w-4 h-4 mr-2" />}
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
