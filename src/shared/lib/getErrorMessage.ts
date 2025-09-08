type ErrorResponse = {
	message?: string;
	errCode?: number;
};

function hasAxiosResponse(
	err: any,
): err is { response: { data?: ErrorResponse } } {
	return (
		typeof err === 'object' &&
		err !== null &&
		'response' in err &&
		typeof (err as any).response === 'object'
	);
}

export function getErrorMessage(
	err: unknown,
	fallback = 'Unknown error',
): string {
	if (hasAxiosResponse(err)) {
		const data = err.response.data;
		return data?.message || fallback;
	}
	if (err instanceof Error) {
		return err.message || fallback;
	}

	return fallback;
}
