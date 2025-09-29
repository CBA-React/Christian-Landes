export const ErrorMessage = ({
	message = 'Failed to load data',
	onRetry,
}: {
	message?: string;
	onRetry?: () => void;
}) => {
	return (
		<div className="flex min-h-[400px] items-center justify-center p-8 text-center">
			<div>
				<h2 className="mb-2 text-xl font-semibold text-red-600">
					{message}
				</h2>
				<p className="mb-4 text-gray-600">
					Please try refreshing the page
				</p>
				<div className="flex justify-center gap-4">
					{onRetry && (
						<button
							onClick={onRetry}
							className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
						>
							Try Again
						</button>
					)}
					<button
						onClick={() => window.location.reload()}
						className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
					>
						Refresh Page
					</button>
				</div>
			</div>
		</div>
	);
};
