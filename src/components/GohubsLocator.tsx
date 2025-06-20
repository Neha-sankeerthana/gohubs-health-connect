
import React, { useState, useRef } from 'react';
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

// GOHUBS center at Vignan's Institute of Engineering for Women, Duvvada
const gohubsCenter: GohubsCenter = {
  id: '1',
  name: 'GOHUBS – Duvvada (Remote Access Point)',
  address: 'Vignan\'s Institute of Engineering for Women, Duvvada, Visakhapatnam',
  lat: 17.7045,
  lng: 83.2145,
  phone: '+91 91828 48430',
  services: ['Remote Healthcare', 'Telemedicine', 'Health Camps', 'Emergency Care']
};

const GohubsLocator = () => {
  const [showMap, setShowMap] = useState(false);

  const handleFindNearestGohubs = () => {
    setShowMap(true);
    toast({
      title: "GOHUBS Location Found!",
      description: "Showing nearest GOHUBS center in Duvvada, Visakhapatnam."
    });
  };

  if (showMap) {
    return (
      <div className="w-full space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Nearest GOHUBS Center</h3>
          <p className="text-gray-600">Remote Healthcare Access Point</p>
        </div>
        
        <div className="h-80 w-full rounded-lg overflow-hidden shadow-lg">
          <MapContainer 
            center={[gohubsCenter.lat, gohubsCenter.lng]} 
            zoom={15} 
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            <Marker position={[gohubsCenter.lat, gohubsCenter.lng]}>
              <Popup>
                <div className="p-2">
                  <h4 className="font-bold text-blue-600">{gohubsCenter.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{gohubsCenter.address}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{gohubsCenter.phone}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Services: {gohubsCenter.services.join(', ')}
                  </div>
                  <button 
                    onClick={() => window.location.href = `tel:${gohubsCenter.phone}`}
                    className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 w-full"
                  >
                    Call GOHUBS
                  </button>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-blue-600" />
              {gohubsCenter.name}
            </CardTitle>
            <CardDescription>{gohubsCenter.address}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-600" />
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-green-600"
                  onClick={() => window.location.href = `tel:${gohubsCenter.phone}`}
                >
                  {gohubsCenter.phone}
                </Button>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Available Services:</p>
                <div className="flex flex-wrap gap-2">
                  {gohubsCenter.services.map((service, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-gray-500">
                  Located at Vignan's Institute of Engineering for Women, providing remote healthcare access to rural communities in Visakhapatnam district.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setShowMap(false)}
            className="mx-auto"
          >
            Hide Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <Button 
        onClick={handleFindNearestGohubs}
        size="lg"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 text-lg transition-all hover:scale-105"
      >
        <MapPin className="mr-2 h-5 w-5" />
        Find Nearest GOHUBS
      </Button>
      <p className="text-sm text-gray-600 mt-2">
        Click to find GOHUBS centers near you
      </p>
    </div>
  );
};

export default GohubsLocator;
