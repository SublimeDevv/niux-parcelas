interface ErrorLoadProps {
  error?: string;
  title?: string;
  description?: string;
}

export default function ErrorLoad({ 
  error, 
  title = "Error al cargar", 
  description = "No se pudieron cargar los datos" 
}: ErrorLoadProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl shadow-sm p-8 max-w-md w-full text-center">
        <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-xl text-destructive">⚠️</span>
        </div>
        <h2 className="text-lg font-semibold text-card-foreground mb-2">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {error || description}
        </p>
      </div>
    </div>
  );
}
