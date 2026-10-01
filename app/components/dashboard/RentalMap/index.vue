<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import type { Map, Marker, Polyline } from "leaflet";
import "leaflet/dist/leaflet.css";

const mapContainer = ref<HTMLElement | null>(null);

let map: Map | null = null;
let resizeObserver: ResizeObserver | null = null;

let pickupMarker: Marker | null = null;
let dropoffMarker: Marker | null = null;
let routeLine: Polyline | null = null;

const pickupLocation: [number, number] = [41.015, 28.975];
const dropoffLocation: [number, number] = [41.025, 29.015];

onMounted(async () => {
  await nextTick();

  if (!mapContainer.value) return;

  const L = await import("leaflet");

  delete (L.Icon.Default.prototype as any)._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });

  map = L.map(mapContainer.value, {
    zoomControl: true,
    attributionControl: true,
    preferCanvas: true,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    minZoom: 3,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  pickupMarker = L.marker(pickupLocation).addTo(map).bindPopup(`
      <div class="map-popup">
        <strong>Pick-Up</strong>
        <span>Istanbul Downtown</span>
      </div>
    `);

  dropoffMarker = L.marker(dropoffLocation).addTo(map).bindPopup(`
      <div class="map-popup">
        <strong>Drop-Off</strong>
        <span>Kadıköy</span>
      </div>
    `);

  routeLine = L.polyline([pickupLocation, dropoffLocation], {
    color: "#2563eb",
    weight: 4,
    opacity: 0.85,
    dashArray: "8 8",
    lineCap: "round",
    lineJoin: "round",
  }).addTo(map);

  const bounds = L.latLngBounds([pickupLocation, dropoffLocation]);

  map.fitBounds(bounds, {
    paddingTopLeft: [70, 70],
    paddingBottomRight: [70, 70],
    maxZoom: 13,
    animate: false,
  });

  const refreshMapSize = () => {
    if (!map) return;

    requestAnimationFrame(() => {
      map?.invalidateSize({
        animate: false,
        pan: false,
      });

      if (map) {
        map.fitBounds(bounds, {
          paddingTopLeft: [70, 70],
          paddingBottomRight: [70, 70],
          maxZoom: 13,
          animate: false,
        });
      }
    });
  };

  setTimeout(refreshMapSize, 50);
  setTimeout(refreshMapSize, 250);
  setTimeout(refreshMapSize, 500);

  resizeObserver = new ResizeObserver(() => {
    refreshMapSize();
  });

  resizeObserver.observe(mapContainer.value);

  window.addEventListener("resize", refreshMapSize);
});

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }

  window.removeEventListener("resize", () => {});

  if (map) {
    map.remove();
    map = null;
  }

  pickupMarker = null;
  dropoffMarker = null;
  routeLine = null;
});
</script>

<template>
  <div class="rental-map-wrapper">
    <div ref="mapContainer" class="rental-map"></div>
    <div class="map-overlay">
      <div class="location-status">
        <span class="status-dot"></span>
        <span>Live rental route</span>
      </div>
    </div>
    <div class="map-legend">
      <div class="legend-item">
        <span class="legend-dot pickup"></span>
        <span>Pick-Up</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot dropoff"></span>
        <span>Drop-Off</span>
      </div>
    </div>
  </div>
</template>
