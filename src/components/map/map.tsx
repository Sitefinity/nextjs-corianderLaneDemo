'use client';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { LocationAddress, MapProps } from '@interfaces';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import L, { Icon } from 'leaflet';
import { useEffect, useState } from 'react';

const Map = ({ maxZoom, icon, center, zoom, locations, mapHeight }: MapProps) => {
    const defaultIconData: Icon = new L.Icon({
        iconUrl: 'default',
        iconSize: new L.Point(1, 1),
    });

    const [iconData, setIconData] = useState(defaultIconData);

    useEffect(() => {
        const fetchIcon = async () => {
            const { iconUrl } = icon;
            const [width, height] = icon.iconSize;
            const [x, y] = icon.iconAnchor;
            setIconData(
                new L.Icon({
                    iconUrl,
                    iconSize: new L.Point(width, height),
                    iconAnchor: new L.Point(x, y),
                }),
            );
        };

        fetchIcon();
    }, [icon]);

    return (
        <MapContainer
            center={center}
            zoomControl={false}
            zoom={zoom}
            attributionControl={false}
            scrollWheelZoom={false}
            style={{ height: mapHeight }}
            className='mb-4'
        >
            <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' {...(maxZoom ? { maxZoom } : {})} />
            {locations &&
                locations.map(
                    ({ Latitude, Longitude }: Pick<LocationAddress, 'Longitude' | 'Latitude'>, index: number) => (
                        <Marker position={[Latitude, Longitude]} icon={iconData} key={index} />
                    ),
                )}
        </MapContainer>
    );
};

export default Map;
