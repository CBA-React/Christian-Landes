'use client';

import { useState, useCallback, useEffect } from 'react';
import {
	APIProvider,
	Map,
	AdvancedMarker,
	Pin,
	useMap,
	useMapsLibrary,
	useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

interface LocationMapPickerProps {
	initialLocation?: { lat: number; lng: number };
	onLocationSelect: (location: {
		lat: number;
		lng: number;
		address: string;
	}) => void;
	height?: string;
}

const defaultCenter = {
	lat: 40.7128,
	lng: -74.006,
};

const MapContent = ({
	initialLocation,
	onLocationSelect,
}: {
	initialLocation?: { lat: number; lng: number };
	onLocationSelect: (location: {
		lat: number;
		lng: number;
		address: string;
	}) => void;
}) => {
	const map = useMap();
	const geocodingLib = useMapsLibrary('geocoding');
	const [markerRef, marker] = useAdvancedMarkerRef();

	const [markerPosition, setMarkerPosition] = useState(
		initialLocation || defaultCenter,
	);
	const [address, setAddress] = useState<string>('');
	const [isGeocoding, setIsGeocoding] = useState(false);

	const geocodePosition = useCallback(
		async (position: { lat: number; lng: number }) => {
			if (!geocodingLib) return;

			setIsGeocoding(true);
			const geocoder = new geocodingLib.Geocoder();

			try {
				const response = await geocoder.geocode({ location: position });

				if (response.results && response.results[0]) {
					const newAddress = response.results[0].formatted_address;
					setAddress(newAddress);
					onLocationSelect({
						lat: position.lat,
						lng: position.lng,
						address: newAddress,
					});
				}
			} catch (error) {
				console.error('Geocoding error:', error);
			} finally {
				setIsGeocoding(false);
			}
		},
		[geocodingLib, onLocationSelect],
	);

	useEffect(() => {
		if (!marker) return;

		const dragEndListener = marker.addListener(
			'dragend',
			(event: google.maps.MapMouseEvent) => {
				if (event.latLng) {
					const newPosition = {
						lat: event.latLng.lat(),
						lng: event.latLng.lng(),
					};
					setMarkerPosition(newPosition);
					geocodePosition(newPosition);
				}
			},
		);

		return () => {
			google.maps.event.removeListener(dragEndListener);
		};
	}, [marker, geocodePosition]);

	useEffect(() => {
		if (!map) return;

		const clickListener = map.addListener(
			'click',
			(event: google.maps.MapMouseEvent) => {
				if (event.latLng) {
					const newPosition = {
						lat: event.latLng.lat(),
						lng: event.latLng.lng(),
					};
					setMarkerPosition(newPosition);
					geocodePosition(newPosition);
				}
			},
		);

		return () => {
			google.maps.event.removeListener(clickListener);
		};
	}, [map, geocodePosition]);

	useEffect(() => {
		if (initialLocation && geocodingLib) {
			setMarkerPosition(initialLocation);
			geocodePosition(initialLocation);
		}
	}, [initialLocation, geocodingLib, geocodePosition]);

	return (
		<>
			<Map
				defaultZoom={13}
				center={markerPosition}
				gestureHandling="greedy"
				disableDefaultUI={false}
				mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
				className="z-999999 h-full w-full"
			>
				<AdvancedMarker
					ref={markerRef}
					position={markerPosition}
					draggable={true}
				>
					<Pin
						background="#0066FF"
						borderColor="#003D99"
						glyphColor="#FFFFFF"
						scale={1.2}
					/>
				</AdvancedMarker>
			</Map>

			{address && (
				<div className="mt-3 rounded border border-blue-200 bg-blue-50 p-3">
					<p className="text-sm text-gray-700">
						<strong>Selected location:</strong> {address}
					</p>
					<p className="mt-1 text-xs text-gray-500">
						Coordinates: {markerPosition.lat.toFixed(6)},{' '}
						{markerPosition.lng.toFixed(6)}
					</p>
				</div>
			)}

			{isGeocoding && (
				<p className="mt-2 text-xs text-gray-500">Getting address...</p>
			)}

			<p className="mt-2 text-sm text-gray-600">
				Click on the map or drag the marker to refine location
			</p>
		</>
	);
};

export const LocationMapPicker = ({
	initialLocation,
	onLocationSelect,
	height = '400px',
}: LocationMapPickerProps) => {
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

	if (!apiKey) {
		return (
			<div className="rounded border border-red-200 bg-red-50 p-4">
				<p className="text-sm text-red-600">
					Google Maps API key is not configured
				</p>
			</div>
		);
	}

	return (
		<APIProvider apiKey={apiKey}>
			<div className="z-999999 space-y-3">
				<div
					className="overflow-hidden rounded border border-gray-300"
					style={{ height }}
				>
					<MapContent
						initialLocation={initialLocation}
						onLocationSelect={onLocationSelect}
					/>
				</div>
			</div>
		</APIProvider>
	);
};
