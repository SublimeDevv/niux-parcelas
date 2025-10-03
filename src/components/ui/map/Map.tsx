// src/components/Map.tsx

import { useRef } from "react"
import { useMapEvent } from "react-leaflet"
import { MapContainer, Marker, TileLayer, Popup, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

interface Props {
    posix: [number, number],
    zoom?: number
}
const defaults = {
  zoom: 19,
}

function SetViewOnClick({ animateRef }: { animateRef: React.RefObject<boolean> }) {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    })
  })

  return null
}

export default function Map(props: Props) {
  const { zoom = defaults.zoom, posix } = props
  const animateRef = useRef<boolean>(true)
  return(
  <>
  <MapContainer center={posix} zoom={zoom} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={posix} draggable={true}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
      <Tooltip>Tooltip for CircleMarker</Tooltip>
    </Marker>
    <Marker position={[17.941078, -92.902405]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
    <Tooltip>Tooltip for CircleMarker</Tooltip>
  </Marker>
  <SetViewOnClick animateRef={animateRef} />
  </MapContainer>
  </>
  )
}