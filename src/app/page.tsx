"use client";
import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  BarChart3,
  Map,
  TrendingUp,
  Zap,
  Shield,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-chart-1/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-chart-2/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-background/80 backdrop-blur-md shadow-lg border-b border-border"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
              <Map className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground tracking-tight">
              Niux<span className="text-chart-1">Parcelas</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="cursor-pointer p-2 rounded-lg bg-secondary hover:bg-accent transition-all duration-300 transform hover:scale-110"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-secondary-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-secondary-foreground" />
              )}
            </button>
            <button
              onClick={() => router.push("/login")}
              className="cursor-pointer px-6 py-2 rounded-lg font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-foreground">
              Gestión Inteligente
              <br />
              <span className="text-chart-1">de Parcelas</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Visualiza, analiza y optimiza tus propiedades con mapas
              interactivos y análisis en tiempo real
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={<Map className="w-8 h-8" />}
              title="Mapas Interactivos"
              description="Visualiza tus parcelas con precisión geográfica"
              color="chart-1"
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Análisis Avanzado"
              description="Gráficas y métricas en tiempo real"
              color="chart-2"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Tendencias"
              description="Predicciones y proyecciones inteligentes"
              color="chart-3"
            />
          </div>

          {/* Dashboard Preview */}
          <div className="rounded-2xl bg-card backdrop-blur-lg p-8 shadow-2xl border border-border transform hover:scale-[1.02] transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Map Preview */}
              <div className="rounded-xl bg-secondary p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-card-foreground">
                      Mapa de Parcelas
                    </h3>
                    <Map className="w-5 h-5 text-chart-1" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-32 rounded-lg bg-muted relative overflow-hidden">
                      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-1 p-2">
                        {[...Array(24)].map((_, i) => (
                          <div
                            key={i}
                            className={`rounded ${
                              i % 3 === 0
                                ? "bg-chart-1"
                                : i % 2 === 0
                                ? "bg-chart-2"
                                : "bg-chart-3"
                            } animate-pulse`}
                            style={{ animationDelay: `${i * 0.1}s` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total Parcelas
                      </span>
                      <span className="font-bold text-chart-1">127</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart Preview */}
              <div className="rounded-xl bg-secondary p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-card-foreground">
                      Análisis
                    </h3>
                    <BarChart3 className="w-5 h-5 text-chart-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-end justify-between h-32 gap-2">
                      {[
                        { height: 65, color: "chart-1" },
                        { height: 85, color: "chart-2" },
                        { height: 45, color: "chart-3" },
                        { height: 95, color: "chart-4" },
                        { height: 75, color: "chart-5" },
                        { height: 60, color: "chart-1" },
                      ].map((bar, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-t-lg bg-${bar.color} transform hover:scale-105 transition-all duration-300 animate-grow`}
                          style={{
                            height: `${bar.height}%`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        ></div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Rendimiento
                      </span>
                      <span className="font-bold text-chart-4 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +23%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <SmallFeatureCard icon={<Zap />} text="Actualización Instantánea" />
            <SmallFeatureCard icon={<Shield />} text="Datos Seguros" />
            <SmallFeatureCard icon={<Users />} text="Colaboración en Equipo" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-lg border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} NiuxParcelas. Gestión inteligente de
            parcelas.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes grow {
          from {
            height: 0;
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-grow {
          animation: grow 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }) {
  return (
    <div className="p-6 rounded-xl bg-card backdrop-blur-lg border border-border transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl group">
      <div
        className={`w-14 h-14 rounded-lg bg-${color} flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300`}
      >
        {React.cloneElement(icon, {
          className: "w-8 h-8 text-primary-foreground",
        })}
      </div>
      <h3 className="text-xl font-bold mb-2 text-card-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function SmallFeatureCard({ icon, text }) {
  return (
    <div className="flex items-center space-x-3 p-4 rounded-lg bg-secondary/50 backdrop-blur-sm border border-border/50 hover:scale-105 transition-transform duration-300">
      <div className="text-chart-1">
        {React.cloneElement(icon, { className: "w-5 h-5" })}
      </div>
      <span className="font-medium text-secondary-foreground">{text}</span>
    </div>
  );
}
