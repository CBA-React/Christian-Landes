'use client';

import { Component, ReactNode } from 'react';
import { Button } from '@/shared/components/Button/Button';

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(): State {
		return { hasError: true };
	}

	componentDidCatch(error: Error) {
		console.error('Profile Error:', error);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
					<h2 className="mb-4 text-xl font-semibold text-red-600">
						Something went wrong
					</h2>
					<p className="mb-6 text-gray-600">
						Please try refreshing the page
					</p>
					<Button
						onClick={() => window.location.reload()}
						variant="solid"
						color="primary"
					>
						Refresh Page
					</Button>
				</div>
			);
		}

		return this.props.children;
	}
}
