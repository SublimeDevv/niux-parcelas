import * as React from "react";

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  href?: string;
  badge?: string | number;
  children?: MenuItem[];
}
