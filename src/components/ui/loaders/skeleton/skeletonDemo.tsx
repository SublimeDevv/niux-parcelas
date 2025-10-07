import SkeletonGrid from "./skeletonGrid";
import SkeletonList from "./skeletonList";
import SkeletonForm from "./skeletonForm";
import SkeletonMenu from "./skeletonMenu";
import SkeletonTable from "./skeletonTable";

export default function SkeletonDemo() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Skeleton Loading Components
          </h1>
          <p className="text-gray-600">
            Componentes reutilizables para estados de carga
          </p>
        </div>

        {/* Grid */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Grid Layout</h2>
          <SkeletonGrid columns={3} rows={2} gap={6} cardType="default" />
        </section>

        {/* Lista */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Lista</h2>
          <SkeletonList items={4} showAvatar={true} />
        </section>

        {/* Menú Horizontal */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Menú Horizontal</h2>
          <SkeletonMenu items={5} orientation="horizontal" />
        </section>

        {/* Menú Vertical */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Menú Vertical</h2>
          <SkeletonMenu items={6} orientation="vertical" />
        </section>

        {/* Tabla */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Tabla</h2>
          <SkeletonTable columns={4} rows={5} />
        </section>

        {/* Formulario */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Formulario</h2>
          <SkeletonForm fields={4} hasButton={true} />
        </section>
      </div>
    </div>
  );
}
