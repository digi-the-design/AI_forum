"use client";

import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
const stylingWizardStyles = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
];

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
const mapId = process.env.NEXT_PUBLIC_MAP_ID ?? "";

// 💡 地図オブジェクト（map）にスタイルを動的に流し込むコンポーネント
function MapStyleInjector() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // インスタンスに対して直接スタイルを適用
    map.setOptions({ styles: stylingWizardStyles });
  }, [map]);

  return null;
}

export default function GoogleMap() {
  if (!googleMapsApiKey) {
    return null;
  }

  return (
    <APIProvider apiKey={googleMapsApiKey}>
      <Map
        style={{ width: "100%", height: "400px" }}
        defaultCenter={{ lat: 35.662463643681285, lng: 139.70823741112952 }}
        defaultZoom={16}
        // mapId={mapId}
        renderingType={"RASTER"}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        minZoom={10} // ズームアウトの限界を設定（日本全体まで戻れないようにする）
        maxZoom={20} // ズームインの限界を設定
        restriction={{
          // 閲覧できる範囲を「東京周辺のみ」にロックする
          latLngBounds: { north: 35.9, south: 35.4, east: 140.2, west: 139.2 },
          strictBounds: true,
        }}
      >
        <Marker
          position={{ lat: 35.662463643681285, lng: 139.70823741112952 }}
        />
        <MapStyleInjector />
      </Map>
    </APIProvider>
  );
}
