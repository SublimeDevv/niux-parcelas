// components/ui/heading.tsx
"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeadingProps {
  title: string;
  description: string;
  onAddNew?: () => void;
}

export const Heading: React.FC<HeadingProps> = ({ 
  title, 
  description,
  onAddNew 
}) => {
  return (
    <div className="flex items-center justify-between mb-4 w-full">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      {onAddNew && (
        <Button onClick={onAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Añadir Nuevo
        </Button>
      )}
    </div>
  );
};