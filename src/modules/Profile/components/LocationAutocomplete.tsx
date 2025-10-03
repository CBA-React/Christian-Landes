'use client';

import { JSX, useState, useRef, useEffect, useCallback } from 'react';
import { FieldError } from 'react-hook-form';
import Location from 'public/icons/profile/location.svg';

interface LocationAutocompleteProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	error?: FieldError;
	placeholder?: string;
	required?: boolean;
}

interface PlacePrediction {
	description: string;
	place_id: string;
}

declare global {
	interface Window {
		google: typeof google;
	}
}

export const LocationAutocomplete = ({
	label,
	value,
	onChange,
	error,
	placeholder,
}: LocationAutocompleteProps): JSX.Element => {
	const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const autocompleteService =
		useRef<google.maps.places.AutocompleteService | null>(null);
	const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (window.google?.maps) {
			setIsGoogleMapsLoaded(true);
			return;
		}

		if (document.querySelector('script[src*="maps.googleapis.com"]')) {
			const checkLoaded = setInterval(() => {
				if (window.google?.maps) {
					setIsGoogleMapsLoaded(true);
					clearInterval(checkLoaded);
				}
			}, 100);
			return () => clearInterval(checkLoaded);
		}

		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
		script.async = true;
		script.defer = true;

		script.onload = () => setIsGoogleMapsLoaded(true);
		script.onerror = () =>
			console.error('Failed to load Google Maps script');

		document.head.appendChild(script);
	}, []);

	useEffect(() => {
		if (isGoogleMapsLoaded && window.google?.maps?.places) {
			autocompleteService.current =
				new google.maps.places.AutocompleteService();
		}
	}, [isGoogleMapsLoaded]);

	const fetchPredictions = useCallback((inputValue: string) => {
		if (!autocompleteService.current) return;

		autocompleteService.current.getPlacePredictions(
			{
				input: inputValue,
			},
			(predictions, status) => {
				console.log('Google Places status:', status);
				console.log('Predictions:', predictions);

				if (
					status === google.maps.places.PlacesServiceStatus.OK &&
					predictions
				) {
					console.log('Setting suggestions:', predictions.length);
					setSuggestions(predictions);
					setShowSuggestions(true);
				} else {
					console.log('No predictions or error');
					setSuggestions([]);
					setShowSuggestions(false);
				}
			},
		);
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		onChange(inputValue);

		if (debounceTimerRef.current) {
			clearTimeout(debounceTimerRef.current);
		}

		if (inputValue.length > 2) {
			debounceTimerRef.current = setTimeout(() => {
				fetchPredictions(inputValue);
			}, 400);
		} else {
			setSuggestions([]);
			setShowSuggestions(false);
		}
	};

	const handleSelectSuggestion = (suggestion: PlacePrediction) => {
		onChange(suggestion.description);
		setShowSuggestions(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				inputRef.current &&
				!inputRef.current.contains(event.target as Node)
			) {
				setShowSuggestions(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
		};
	}, []);

	console.log('Render state:', {
		showSuggestions,
		suggestionsCount: suggestions.length,
	});

	return (
		<div className="flex flex-col gap-2.5 text-[#242424]">
			<label className="flex items-center gap-2">{label}</label>
			<div className="relative" ref={inputRef}>
				<input
					type="text"
					value={value}
					onChange={handleInputChange}
					placeholder={placeholder}
					className="w-full border border-[#24242480] px-4 py-2.5 pr-10 placeholder:text-[#24242480] focus:outline-none"
					disabled={!isGoogleMapsLoaded}
				/>
				<Location className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2" />

				{showSuggestions && suggestions.length > 0 && (
					<ul className="absolute z-[9999] mt-1 max-h-60 w-full overflow-auto border border-[#24242480] bg-white shadow-lg">
						{suggestions.map((suggestion) => (
							<li
								key={suggestion.place_id}
								onClick={() =>
									handleSelectSuggestion(suggestion)
								}
								className="cursor-pointer px-4 py-2.5 hover:bg-gray-100"
							>
								{suggestion.description}
							</li>
						))}
					</ul>
				)}
			</div>
			{error && (
				<p className="mt-1 text-sm text-red-500">{error.message}</p>
			)}
			{!isGoogleMapsLoaded && (
				<p className="text-xs text-gray-500">
					Loading location service...
				</p>
			)}
		</div>
	);
};
