"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Calendar, Shield } from "lucide-react";
import { InternalUser } from "../interfaces";

interface UserViewModalProps {
  open: boolean;
  onClose: () => void;
  user: InternalUser | null;
}

export const UserViewModal: React.FC<UserViewModalProps> = ({
  open,
  onClose,
  user,
}) => {
  if (!user) return null;

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Detalles del Usuario
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Información básica */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nombre completo</p>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Correo electrónico</p>
                <p className="text-base">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rol</p>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary border border-primary/20">
                  {user.rol || "Sin rol"}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Información de fechas */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fecha de registro</p>
                <p className="text-base">{formatDate(user.createdAt)}</p>
              </div>
            </div>

            {user.updatedAt && (
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Última actualización</p>
                  <p className="text-base">{formatDate(user.updatedAt)}</p>
                </div>
              </div>
            )}
          </div>

          {/* ID del usuario */}
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-xs font-medium text-muted-foreground mb-1">ID del usuario</p>
            <p className="text-sm font-mono text-muted-foreground">{user.id}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
