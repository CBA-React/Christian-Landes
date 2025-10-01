'use client';

import { JSX, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useGoogleGSI } from '@/shared/hooks/useGoogleGSI';
import { AuthApi } from '../services/AuthApi';

import { LoginForm } from './LoginForm';

import FacebookLogin from 'public/icons/facebook-login.svg';

declare global {
	interface Window {
		FB: any;
	}
}

export const LoginSection = (): JSX.Element => {
	const router = useRouter();

	const onGoogleSub = useCallback(
		async (sub: string) => {
			try {
				const { access_token, refresh_token } =
					await AuthApi.socialLogin({ google_id: sub });
				localStorage.setItem('access_token', access_token);
				localStorage.setItem('refresh_token', refresh_token);
				toast.success('Logged in with Google!');
				router.push('/');
			} catch {
				toast.error('Google login failed');
			}
		},
		[router],
	);

	const gBtnRef = useRef<HTMLDivElement>(null);

	useGoogleGSI({
		onSub: onGoogleSub,
		buttonRef: gBtnRef,
		enableOneTapOncePerSession: false,
	});

	const handleFacebookLogin = () => {
		window.FB.login(
			async (resp: any) => {
				if (resp.status !== 'connected') {
					toast.error('Facebook auth was cancelled');
					return;
				}
				window.FB.api('/me', { fields: 'id' }, async (me: any) => {
					try {
						const { access_token, refresh_token } =
							await AuthApi.socialLogin({ facebook_id: me.id });
						localStorage.setItem('access_token', access_token);
						localStorage.setItem('refresh_token', refresh_token);
						toast.success('Logged in with Facebook!');
						router.push('/');
					} catch {
						toast.error('Facebook login failed');
					}
				});
			},
			{ scope: 'public_profile' },
		);
	};

	return (
		<div className="mx-5 mt-[110px] mb-[56px] flex w-full max-w-[1240px] justify-end md:mt-[161px] md:mb-[122px] xl:mx-auto">
			<section className="w-full max-w-[578px] rounded-[20px] bg-[#ffffffbf] px-6 py-10 backdrop-blur-[20px] md:p-16">
				<article className="flex flex-col gap-2 md:gap-4">
					<h1 className="font-chalet-1960 text-[48px] leading-[58px] font-medium text-[#242424] md:text-[84px] md:leading-[100%]">
						Log In
					</h1>
					<p className="text-base text-[#242424] md:text-xl">
						Welcome back!
						<br className="block sm:hidden" /> Please enter your
						detail
					</p>
				</article>

				<LoginForm />

				<article className="flex flex-col gap-5">
					<div className="flex items-center gap-5">
						<div className="h-[1px] w-full bg-[#24242433]" />
						<p className="text-sm text-[#242424]">Or</p>
						<div className="h-[1px] w-full bg-[#24242433]" />
					</div>

					<div className="flex flex-col items-center justify-center gap-7">
						<div ref={gBtnRef} />

						<button type="button" onClick={handleFacebookLogin}>
							<FacebookLogin />
						</button>
					</div>

					<p className="text-center text-sm text-[#242424]">
						Don’t have an account?{' '}
						<Link className="font-semibold" href="/sign-up">
							Sign Up
						</Link>
					</p>
				</article>
			</section>
		</div>
	);
};
