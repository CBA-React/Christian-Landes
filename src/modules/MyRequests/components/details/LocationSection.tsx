'use client';

import { useState, useEffect } from 'react';
import Location from 'public/icons/profile/location.svg';
import {
	APIProvider,
	Map,
	AdvancedMarker,
	Pin,
	useMapsLibrary,
	useMap,
} from '@vis.gl/react-google-maps';

interface LocationSectionProps {
	location: string;
}

const defaultCoordinates = { lat: 33.9986, lng: -81.032 };

const MapWithGeocoding = ({ location }: { location: string }) => {
	const map = useMap();
	const geocodingLib = useMapsLibrary('geocoding');
	const [coordinates, setCoordinates] = useState(defaultCoordinates);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!geocodingLib || !location) return;

		const geocodeAddress = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const geocoder = new geocodingLib.Geocoder();
				const response = await geocoder.geocode({ address: location });

				if (response.results && response.results[0]) {
					const { lat, lng } = response.results[0].geometry.location;
					const newCoordinates = {
						lat: lat(),
						lng: lng(),
					};
					setCoordinates(newCoordinates);

					if (map) {
						map.panTo(newCoordinates);
					}
				} else {
					setError('Location not found');
				}
			} catch (err) {
				console.error('Geocoding error:', err);
				setError('Failed to load location');
			} finally {
				setIsLoading(false);
			}
		};

		geocodeAddress();
	}, [geocodingLib, location, map]);

	return (
		<>
			<Map
				center={coordinates}
				zoom={15}
				mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
				disableDefaultUI={false}
				gestureHandling="cooperative"
				className="h-full w-full"
			>
				<AdvancedMarker position={coordinates}>
					<Pin
						background="#0066FF"
						borderColor="#003D99"
						glyphColor="#FFFFFF"
						scale={1.2}
					/>
				</AdvancedMarker>
			</Map>

			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-white/80">
					<div className="flex items-center gap-2">
						<div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
						<span className="text-sm text-gray-600">
							Loading location...
						</span>
					</div>
				</div>
			)}

			{error && (
				<div className="absolute top-4 left-1/2 -translate-x-1/2 rounded bg-red-50 px-4 py-2 text-sm text-red-600">
					{error}
				</div>
			)}
		</>
	);
};

export const LocationSection = ({ location }: LocationSectionProps) => {
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

	if (!apiKey) {
		return (
			<div className="mb-14 lg:mb-30">
				<h2 className="font-chalet-1960 mb-3 text-[36px] leading-[100%] tracking-[-1px] text-[#242424] lg:text-[40px]">
					Project Location
				</h2>
				<div className="rounded border border-red-200 bg-red-50 p-4">
					<p className="text-sm text-red-600">
						Google Maps is not configured
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="mb-14 lg:mb-30">
			<h2 className="font-chalet-1960 mb-3 text-[36px] leading-[100%] tracking-[-1px] text-[#242424] lg:text-[40px]">
				Project Location
			</h2>

			<div className="mb-10 flex items-center gap-2">
				<Location className="color-[#242424]/50" />
				<span className="font-chalet-1960 text-[16px] text-[#242424]/50">
					{location}
				</span>
			</div>

			<div className="relative h-[500px] w-full overflow-hidden rounded-lg">
				<APIProvider apiKey={apiKey}>
					<MapWithGeocoding location={location} />
				</APIProvider>
			</div>

			<div className="mt-4 flex items-center justify-end">
				<a
					href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
				>
					Open in Google Maps
					<svg
						className="h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
						/>
					</svg>
				</a>
			</div>
		</div>
	);
};
