
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation, Phone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface GohubsCenter {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  services: string[];
}

// Mock GOHUBS centers near Visakhapatnam
const gohubsCenters: GohubsCenter[] = [
  {
    id: '1',
    name: 'GOHUBS Visakhapatnam Central',
    address: 'MVP Colony, Visakhapatnam, Andhra Pradesh 530017',
    lat: 17.7231,
    lng: 83.3077,
    phone: '+91 91828 48430',
    services: ['Emergency Care', 'General Consultation', 'Maternal Care']
  },
  {
    id: '2',
    name: 'GOHUBS Anakapalle',
    address: 'Main Road, Anakapalle, Visakhapatnam District',
    lat: 17.6911,
    lng: 83.0034,
    phone: '+91 91828 48431',
    services: ['Rural Healthcare', 'Telemedicine', 'Health Camps']
  },
  {
    id: '3',
    name: 'GOHUBS Narsipatnam',
    address: 'Town Center, Narsipatnam, Visakhapatnam District',
    lat: 17.6675,
    lng: 82.6113,
    phone: '+91 91828 48432',
    services: ['Primary Care', 'Vaccination', 'Health Awareness']
  },
  {
    id: '4',
    name: 'GOHUBS Yelamanchili',
    address: 'Village Square, Yelamanchili, Visakhapatnam District',
    lat: 17.8428,
    lng: 82.8664,
    phone: '+91 91828 48433',
    services: ['Mobile Clinic', 'Emergency Response', 'Community Health']
  }
];

const GohubsLocator = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nearestCenters, setNearestCenters] = useState<GohubsCenter[]>([]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in kilometers
    return d;
  };

  const checkIfInSupportedArea = (lat: number, lng: number) => {
    // Check if user is within ~100km radius of Visakhapatnam
    const visakhapatnamLat = 17.6868;
    const visakhapatnamLng = 83.2185;
    const distance = calculateDistance(lat, lng, visakhapatnamLat, visakhapatnamLng);
    return distance <= 100; // 100km radius
  };

  const findNearestCenters = (userLat: number, userLng: number) => {
    const centersWithDistance = gohubsCenters.map(center => ({
      ...center,
      distance: calculateDistance(userLat, userLng, center.lat, center.lng)
    }));
    
    return centersWithDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 4); // Show top 4 nearest centers
  };

  const handleFindNearestGohubs = () => {
    setLoading(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        if (checkIfInSupportedArea(latitude, longitude)) {
          setUserLocation({ lat: latitude, lng: longitude });
          const nearest = findNearestCenters(latitude, longitude);
          setNearestCenters(nearest);
          setShowMap(true);
          
          toast({
            title: "Location found!",
            description: `Found ${nearest.length} GOHUBS centers near you.`
          });
        } else {
          toast({
            title: "Service not available",
            description: "GOHUBS services are currently available only in rural areas near Visakhapatnam.",
            variant: "destructive"
          });
        }
        setLoading(false);
      },
      (error) => {
        console.error('Location error:', error);
        toast({
          title: "Location access denied",
          description: "Please allow location access to find nearest GOHUBS centers.",
          variant: "destructive"
        });
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000
      }
    );
  };

  if (showMap && userLocation) {
    return (
      <div className="w-full space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Nearest GOHUBS Centers</h3>
          <p className="text-gray-600">Found {nearestCenters.length} centers near your location</p>
        </div>
        
        <div className="h-64 w-full rounded-lg overflow-hidden shadow-lg">
          <MapContainer 
            center={[userLocation.lat, userLocation.lng]} 
            zoom={10} 
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* User location marker */}
            <Marker position={[userLocation.lat, userLocation.lng]}>
              <Popup>
                <div className="text-center">
                  <strong>Your Location</strong>
                </div>
              </Popup>
            </Marker>
            
            {/* GOHUBS centers markers */}
            {nearestCenters.map((center) => (
              <Marker key={center.id} position={[center.lat, center.lng]}>
                <Popup>
                  <div className="p-2">
                    <h4 className="font-bold text-blue-600">{center.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{center.address}</p>
                    <p className="text-sm font-medium mb-2">
                      Distance: {center.distance?.toFixed(1)} km
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{center.phone}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Services: {center.services.join(', ')}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {nearestCenters.map((center) => (
            <Card key={center.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  {center.name}
                </CardTitle>
                <CardDescription>{center.address}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">
                      {center.distance?.toFixed(1)} km away
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-green-600" />
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-green-600"
                      onClick={() => window.location.href = `tel:${center.phone}`}
                    >
                      {center.phone}
                    </Button>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm font-medium text-gray-700 mb-1">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {center.services.map((service, index) => (
                        <span 
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setShowMap(false)}
            className="mx-auto"
          >
            Find Different Location
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <Button 
        onClick={handleFindNearestGohubs}
        disabled={loading}
        size="lg"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 text-lg transition-all hover:scale-105"
      >
        {loading ? (
          <>
            <Navigation className="mr-2 h-5 w-5 animate-spin" />
            Finding Location...
          </>
        ) : (
          <>
            <MapPin className="mr-2 h-5 w-5" />
            Find Nearest GOHUBS
          </>
        )}
      </Button>
      <p className="text-sm text-gray-600 mt-2">
        Click to find GOHUBS centers near you
      </p>
    </div>
  );
};

export default GohubsLocator;
