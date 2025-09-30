import { MenuItem } from "@/interfaces";

export interface SidebarProps {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  userRole?: string;
  onLogout?: () => void;
  className?: string;
}

export interface SidebarItemProps {
  item: MenuItem;
  level?: number;
  isActive?: boolean;
  onItemClick?: (item: MenuItem) => void;
}
