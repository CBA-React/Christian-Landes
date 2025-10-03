'use client';

import { useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';

type OnGoogleSub = (sub: string) => Promise<void>;

declare global {
	interface Window {
		google?: {
			accounts: {
				id: {
					initialize: (config: any) => void;
					prompt: (cb?: (notif: any) => void) => void;
					renderButton?: (el: HTMLElement, opts: any) => void;
					cancel: () => void;
					disableAutoSelect?: () => void;
				};
			};
		};
	}
}

type UseGoogleGSIParams = {
	onSub: OnGoogleSub;
	buttonRef?: React.RefObject<HTMLDivElement | null>;
	enableOneTapOncePerSession?: boolean;
};

export const useGoogleGSI = (
	params: OnGoogleSub | UseGoogleGSIParams,
): { prompt: () => void } => {
	const onSub = typeof params === 'function' ? params : params.onSub;
	const buttonRef =
		typeof params === 'function' ? undefined : params.buttonRef;
	const enableOneTapOncePerSession =
		typeof params === 'function'
			? false
			: !!params.enableOneTapOncePerSession;

	const initialized = useRef(false);

	useEffect(() => {
		const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
		if (!clientId) {
			console.error('Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID');
			return;
		}
		if (initialized.current) return;

		const isFirefox =
			typeof navigator !== 'undefined' &&
			/firefox/i.test(navigator.userAgent);

		const tryInit = () => {
			if (!window.google?.accounts?.id) return false;

			window.google.accounts.id.initialize({
				client_id: clientId,
				ux_mode: 'popup',
				auto_select: false,
				cancel_on_tap_outside: true,
				use_fedcm_for_prompt: !isFirefox,
				callback: async ({ credential }: { credential?: string }) => {
					if (!credential) {
						toast.error('No Google credential');
						return;
					}
					const { sub } = jwtDecode<{ sub: string }>(credential);
					await onSub(sub);
				},
			});

			if (buttonRef?.current && window.google.accounts.id.renderButton) {
				window.google.accounts.id.renderButton(buttonRef.current, {
					theme: 'filled_blue',
					size: 'large',
					text: 'continue_with',
					shape: 'pill',
					width: 260,
				});
			}

			if (
				enableOneTapOncePerSession &&
				!sessionStorage.getItem('gsi_prompted')
			) {
				sessionStorage.setItem('gsi_prompted', '1');
				window.google.accounts.id.prompt((n: any) => {
					if (n.isNotDisplayed?.()) {
						console.warn(
							'[GSI] not displayed:',
							n.getNotDisplayedReason?.(),
						);
					}
					if (n.isSkippedMoment?.()) {
						console.warn('[GSI] skipped:', n.getSkippedReason?.());
					}
				});
			}

			window.google.accounts.id.disableAutoSelect?.();
			initialized.current = true;
			return true;
		};

		if (!tryInit()) {
			const t = setInterval(() => {
				if (tryInit()) clearInterval(t);
			}, 50);
			return () => clearInterval(t);
		}
	}, [onSub, buttonRef, enableOneTapOncePerSession]);

	const prompt = () => {
		window.google?.accounts?.id?.prompt((n: any) => {
			if (n.isNotDisplayed?.()) {
				console.warn(
					'[GSI] not displayed:',
					n.getNotDisplayedReason?.(),
				);
			}
			if (n.isSkippedMoment?.()) {
				console.warn('[GSI] skipped:', n.getSkippedReason?.());
			}
		});
	};

	return { prompt };
};
