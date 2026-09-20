<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import type { Map, Marker } from "leaflet";

const mapContainer = ref<HTMLElement | null>(null);

let map: Map | null = null;
let pickupMarker: Marker | null = null;
let dropoffMarker: Marker | null = null;

onMounted(async () => {
  if (!mapContainer.value) return;

  const L = await import("leaflet");

  delete (L.Icon.Default.prototype as any)._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });

  map = L.map(mapContainer.value, {
    zoomControl: true,
    attributionControl: true,
  }).setView([41.0082, 28.9784], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  pickupMarker = L.marker([41.015, 28.975])
    .addTo(map)
    .bindPopup(`
      <div class="map-popup">
        <strong>Pick-Up</strong>
        <span>Istanbul Downtown</span>
      </div>
    `);

  dropoffMarker = L.marker([41.025, 29.015])
    .addTo(map)
    .bindPopup(`
      <div class="map-popup">
        <strong>Drop-Off</strong>
        <span>Kadiköy</span>
      </div>
    `);

  L.polyline(
    [
      [41.015, 28.975],
      [41.025, 29.015],
    ],
    {
      color: "#2563eb",
      weight: 4,
      opacity: 0.8,
      dashArray: "8 8",
    }
  ).addTo(map);

  const bounds = L.latLngBounds([
    [41.015, 28.975],
    [41.025, 29.015],
  ]);

  map.fitBounds(bounds, {
    padding: [40, 40],
  });
});

onBeforeUnmount(() => {
  if (map) {
    map.remove();
    map = null;
  }
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