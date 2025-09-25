export class SimpleThrottle {
	private lastCallTime = 0;
	private timeoutId: NodeJS.Timeout | null = null;

	constructor(private delay: number = 300) {}

	execute<T extends any[], R>(
		fn: (...args: T) => Promise<R>,
		...args: T
	): Promise<R> {
		return new Promise((resolve, reject) => {
			const now = Date.now();
			const timeSinceLastCall = now - this.lastCallTime;

			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = null;
			}

			if (timeSinceLastCall >= this.delay) {
				this.lastCallTime = now;
				fn(...args)
					.then(resolve)
					.catch(reject);
			} else {
				const remainingTime = this.delay - timeSinceLastCall;
				this.timeoutId = setTimeout(() => {
					this.lastCallTime = Date.now();
					fn(...args)
						.then(resolve)
						.catch(reject);
				}, remainingTime);
			}
		});
	}

	cancel() {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
			this.timeoutId = null;
		}
	}

	reset() {
		this.cancel();
		this.lastCallTime = 0;
	}
}
