"use client";
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { ChartLineInteractive } from '@/components/ui/chart/chart-line-interactive';
import { ChartBarLabel } from '@/components/ui/chart/chart-bar-label';
import { ChartPieLabel } from '@/components/ui/chart/chart-pie-label';
export default  function DashboardPage() {
  const Map = useMemo(() => dynamic(
    () => import('@/components/ui/map'),
    { 
      loading: () => <p>loading</p>,
      ssr: false
    }
  ), [])
  return <div className="w-full h-auto">
      <div className="w-full  ">
        <ChartLineInteractive />
      </div>
      <div className="w-full  pt-10 pb-5">
        <ChartBarLabel />
      </div>
      <div className="w-full  pt-10 pb-5">
        <ChartPieLabel />
      </div>
      <div className="w-full h-[400px] mt-5 overflow-hidden ">
        <Map 
        posix={[40.4168, -3.7038]}
        zoom={2}
        >
        </Map>
      </div>
  </div>
}
