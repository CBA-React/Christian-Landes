'use client';

import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Component Error Boundary caught:', error, errorInfo);
	}

	handleRetry = () => {
		this.setState({ hasError: false, error: undefined });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<section
					className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center"
					role="alert"
					aria-live="polite"
				>
					<h2 className="mb-4 text-xl font-semibold text-red-600">
						Something went wrong
					</h2>
					<p className="mb-6 text-gray-600">
						{this.state.error?.message ||
							'Please try refreshing the page'}
					</p>
					<div className="flex gap-4">
						<button
							onClick={this.handleRetry}
							className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
						>
							Try Again
						</button>
						<button
							onClick={() => window.location.reload()}
							className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
						>
							Refresh Page
						</button>
					</div>
				</section>
			);
		}

		return this.props.children;
	}
}
