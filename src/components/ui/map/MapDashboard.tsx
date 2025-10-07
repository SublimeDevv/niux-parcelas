import { useRef, useState, useMemo } from "react";
import { useMapEvent } from "react-leaflet";
import { MapContainer, Marker, TileLayer, Popup, Tooltip } from "react-leaflet";
import { ChevronLeft, ChevronRight, MapPin, Thermometer, Search, X } from "lucide-react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

interface MarkerData {
  position: [number, number];
  data: {
    temperature: number;
    humidity?: number;
    crop?: string;
    timestamp: string;
  };
}

interface Props {
  posix: [number, number];
  zoom?: number;
  markers?: MarkerData[];
}

const defaults = {
  zoom: 13,
};

function SetViewOnClick({
  animateRef,
}: {
  animateRef: React.RefObject<boolean>;
}) {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
}

export default function MapDashboard(props: Props) {
  const { zoom = defaults.zoom, posix, markers = [] } = props;
  const animateRef = useRef<boolean>(true);
  
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [tempFilter, setTempFilter] = useState<"all" | "cold" | "warm" | "hot">("all");
  const [coordFilter, setCoordFilter] = useState<"all" | "north" | "south" | "east" | "west">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const centerLat = posix[0];
  const centerLng = posix[1];

  const filteredMarkers = useMemo(() => {
    let filtered = [...markers];

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter((m, index) => {
        const parcelaNum = (index + 1).toString();
        const crop = m.data.crop?.toLowerCase() || "";
        const temp = m.data.temperature.toString();
        const humidity = m.data.humidity?.toString() || "";
        
        return parcelaNum.includes(search) || 
               crop.includes(search) || 
               temp.includes(search) ||
               humidity.includes(search);
      });
    }

    if (tempFilter === "cold") {
      filtered = filtered.filter(m => m.data.temperature < 20);
    } else if (tempFilter === "warm") {
      filtered = filtered.filter(m => m.data.temperature >= 20 && m.data.temperature < 30);
    } else if (tempFilter === "hot") {
      filtered = filtered.filter(m => m.data.temperature >= 30);
    }

    if (coordFilter === "north") {
      filtered = filtered.filter(m => m.position[0] > centerLat);
    } else if (coordFilter === "south") {
      filtered = filtered.filter(m => m.position[0] <= centerLat);
    } else if (coordFilter === "east") {
      filtered = filtered.filter(m => m.position[1] > centerLng);
    } else if (coordFilter === "west") {
      filtered = filtered.filter(m => m.position[1] <= centerLng);
    }

    return filtered;
  }, [markers, tempFilter, coordFilter, centerLat, centerLng, searchTerm]);

  const totalPages = Math.ceil(filteredMarkers.length / pageSize);
  
  const paginatedMarkers = useMemo(() => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    return filteredMarkers.slice(start, end);
  }, [filteredMarkers, currentPage, pageSize]);

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getMarkerColor = (temp: number) => {
    if (temp < 20) return { emoji: "❄️", color: "text-blue-500" };
    if (temp < 25) return { emoji: "✓", color: "text-green-500" };
    if (temp < 30) return { emoji: "⚠", color: "text-yellow-500" };
    return { emoji: "🔥", color: "text-red-500" };
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <Search className="h-4 w-4" />
            Buscar parcelas
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(0);
              }}
              placeholder="Buscar por número, cultivo, temperatura..."
              className="w-full px-3 py-2 pr-10 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            Filtrar por temperatura
          </label>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => {
                setTempFilter("all");
                setCurrentPage(0);
              }}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                tempFilter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => {
                setTempFilter("cold");
                setCurrentPage(0);
              }}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                tempFilter === "cold"
                  ? "bg-blue-500 text-white"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
               Frías (&lt;20°C)
            </button>
            <button
              onClick={() => {
                setTempFilter("warm");
                setCurrentPage(0);
              }}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                tempFilter === "warm"
                  ? "bg-green-500 text-white"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
               Templadas (20-30°C)
            </button>
            <button
              onClick={() => {
                setTempFilter("hot");
                setCurrentPage(0);
              }}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                tempFilter === "hot"
                  ? "bg-red-500 text-white"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
               Calientes (≥30°C)
            </button>
          </div>
        </div>

        {/* Filtros de ubicación */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Filtrar por ubicación
          </label>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => {
                setCoordFilter("all");
                setCurrentPage(0);
              }}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                coordFilter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => {
                setCoordFilter("north");
                setCurrentPage(0);
              }}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                coordFilter === "north"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
               Norte
            </button>
            <button
              onClick={() => {
                setCoordFilter("south");
                setCurrentPage(0);
              }}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                coordFilter === "south"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
               Sur
            </button>
            <button
              onClick={() => {
                setCoordFilter("east");
                setCurrentPage(0);
              }}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                coordFilter === "east"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
               Este
            </button>
            <button
              onClick={() => {
                setCoordFilter("west");
                setCurrentPage(0);
              }}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                coordFilter === "west"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
               Oeste
            </button>
          </div>
        </div>

        {/* Paginación */}
        <div className="flex items-center justify-between gap-4 pt-2 border-t border-border">
          <div className="flex gap-2">
            <button
              onClick={() => handlePageSizeChange(10)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                pageSize === 10
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              10
            </button>
            <button
              onClick={() => handlePageSizeChange(25)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                pageSize === 25
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              25
            </button>
            <button
              onClick={() => handlePageSizeChange(50)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                pageSize === 50
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              50
            </button>
            <button
              onClick={() => handlePageSizeChange(filteredMarkers.length)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                pageSize === filteredMarkers.length
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              Todas
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className="p-1.5 rounded-md bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-muted-foreground min-w-[100px] text-center">
              {totalPages > 0 ? `${currentPage + 1} / ${totalPages}` : "0 / 0"}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage >= totalPages - 1}
              className="p-1.5 rounded-md bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Mostrando {paginatedMarkers.length > 0 ? currentPage * pageSize + 1 : 0} - {Math.min((currentPage + 1) * pageSize, filteredMarkers.length)} de {filteredMarkers.length} parcelas
          {filteredMarkers.length !== markers.length && (
            <span className="ml-1">({markers.length} total)</span>
          )}
        </div>
      </div>

      <div className="flex-1 rounded-lg overflow-hidden border border-border">
        <MapContainer
          center={posix}
          zoom={zoom}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {paginatedMarkers.map((marker, index) => {
            const globalIndex = currentPage * pageSize + index;
            return (
              <Marker key={`marker-${globalIndex}`} position={marker.position}>
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-lg mb-2">Parcela {globalIndex + 1}</h3>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-semibold">🌡️ Temperatura:</span>{" "}
                        {marker.data.temperature}°C
                      </p>
                      {marker.data.humidity && (
                        <p className="text-sm">
                          <span className="font-semibold">💧 Humedad:</span>{" "}
                          {marker.data.humidity}%
                        </p>
                      )}
                      {marker.data.crop && (
                        <p className="text-sm">
                          <span className="font-semibold">🌾 Cultivo:</span>{" "}
                          {marker.data.crop}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(marker.data.timestamp).toLocaleString("es-MX")}
                      </p>
                      <p className="text-xs text-gray-400">
                        Lat: {marker.position[0].toFixed(6)}, Lon:{" "}
                        {marker.position[1].toFixed(6)}
                      </p>
                    </div>
                  </div>
                </Popup>
                <Tooltip direction="top" offset={[0, -20]} opacity={0.9}>
                  <div className="text-center">
                    <p className="font-semibold">Parcela {globalIndex + 1}</p>
                    <p className="text-sm">
                      <span className={getMarkerColor(marker.data.temperature).color}>
                        {getMarkerColor(marker.data.temperature).emoji}
                      </span>{" "}
                      {marker.data.temperature}°C
                    </p>
                  </div>
                </Tooltip>
              </Marker>
            );
          })}

          <SetViewOnClick animateRef={animateRef} />
        </MapContainer>
      </div>
    </div>
  );
}