
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const NearestHospitals = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  const hospitals = [
    { name: "Apollo Hospital", lat: 17.7231, lng: 83.3012, type: "Multi-speciality" },
    { name: "KIMS Hospital", lat: 17.7331, lng: 83.3112, type: "Cardiac Care" },
    { name: "Rainbow Hospital", lat: 17.7131, lng: 83.2912, type: "Pediatric Care" },
    { name: "Care Hospital", lat: 17.7431, lng: 83.3212, type: "Emergency Care" },
    { name: "Medicover Hospital", lat: 17.7031, lng: 83.2812, type: "General Medicine" }
  ];

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Initialize map centered on Visakhapatnam
    mapInstance.current = L.map(mapRef.current).setView([17.7231, 83.3012], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance.current);

    // Add hospital markers
    hospitals.forEach(hospital => {
      const marker = L.marker([hospital.lat, hospital.lng])
        .addTo(mapInstance.current!)
        .bindPopup(`
          <div>
            <h3 style="margin: 0; color: #1f2937; font-weight: bold;">${hospital.name}</h3>
            <p style="margin: 5px 0; color: #6b7280;">${hospital.type}</p>
            <button onclick="window.open('tel:+919182848430')" style="background: #dc2626; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Call Hospital</button>
          </div>
        `);
    });

    // Add user location marker (mock location)
    const userIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    L.marker([17.7231, 83.3012], { icon: userIcon })
      .addTo(mapInstance.current!)
      .bindPopup('<b>Your Location</b>')
      .openPopup();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Find Nearest Hospitals</CardTitle>
        <CardDescription>Hospitals in Visakhapatnam area</CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={mapRef} style={{ height: '400px', width: '100%' }} className="rounded-lg border" />
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {hospitals.map((hospital, index) => (
            <div key={index} className="border rounded-lg p-3">
              <h4 className="font-semibold">{hospital.name}</h4>
              <p className="text-sm text-gray-600">{hospital.type}</p>
              <button 
                onClick={() => window.open('tel:+919182848430')}
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                Call Hospital
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NearestHospitals;
