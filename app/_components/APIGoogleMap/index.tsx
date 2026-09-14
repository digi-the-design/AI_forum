"use client";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
const mapId = process.env.NEXT_PUBLIC_MAP_ID ?? "";

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
        mapId={mapId}
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
      </Map>
    </APIProvider>
  );
}
