'use client';

import React, { JSX, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import EmailIcon from '../../../../public/icons/email.svg';
import PhoneIcon from '../../../../public/icons/phone.svg';
import AddressIcon from '../../../../public/icons/address.svg';
import ArrowIconWhite from 'public/icons/arrow-up-right-white-big.svg';
import CheckIcon from 'public/icons/symbols_check-white.svg';
import { Button } from '@/shared/components/Button/Button';

import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { sendContact } from '../services/sendContactApi';
import { ContactInput } from './ContactInput';

export interface ContactFormValues {
	name: string;
	email: string;
	phone: string;
	message: string;
}

export const ContactForm = (): JSX.Element => {
	const [serverError, setServerError] = useState<string | null>(null);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const mutation = useMutation({
		mutationFn: (data: ContactFormValues) => sendContact(data),
		onSuccess: () => {
			setIsSuccess(true);
			reset();
		},
		onError: (err) => {
			setServerError(getErrorMessage(err));
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ContactFormValues>();

	const onSubmit = async (data: ContactFormValues): Promise<void> => {
		setServerError(null);
		try {
			await mutation.mutateAsync(data);
		} catch (err: unknown) {
			const msg = getErrorMessage(
				err,
				'Something gone wrong. Please try again later.',
			);
			setServerError(msg);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			setTimeout(() => {
				setIsSuccess(false);
			}, 5000);
		}
	}, [isSuccess]);

	return (
		<section className="mx-auto rounded-[10px] bg-[#CFEDD9] lg:mt-[-78px] lg:mb-[120px] lg:max-w-[1240px] lg:p-[48px]">
			<ul className="mb-23 flex gap-[40px]">
				<li className="rounded-[10px] border-1 border-[rgba(0,0,0,0.3)] p-[24px]">
					<EmailIcon className="mb-3" />
					<p className="mb-3 text-[20px]">Support Email</p>
					<p className="mb-5 text-[16px]">info.example@gmai.com</p>
					<Button
						type="button"
						variant="solid"
						color="primary"
						aria-label="Email Us"
						className="!h-[43px] w-[306px] justify-center text-[16px] !font-[400]"
					>
						Email Us
					</Button>
				</li>
				<li className="rounded-[10px] border-1 border-[rgba(0,0,0,0.3)] p-[24px]">
					<PhoneIcon className="mb-3" />
					<p className="mb-3 text-[20px]">Phone Number</p>
					<p className="mb-5 text-[16px]">1800-000-0000</p>
					<Button
						type="button"
						variant="solid"
						color="primary"
						aria-label="Call Us"
						className="!h-[43px] w-[306px] justify-center text-[16px] !font-[400]"
					>
						Call Us
					</Button>
				</li>
				<li className="rounded-[10px] border-1 border-[rgba(0,0,0,0.3)] p-[24px]">
					<AddressIcon className="mb-3" />
					<p className="mb-3 text-[20px]">Headquarters</p>
					<p className="mb-5 text-[16px]">
						12 Cherry Street, NJ, 10384
					</p>
					<Button
						type="button"
						variant="solid"
						color="primary"
						aria-label="Visit Us"
						className="!h-[43px] w-[306px] justify-center text-[16px] !font-[400]"
					>
						Visit Us
					</Button>
				</li>
			</ul>
			<div className="flex gap-[86px]">
				<form onSubmit={handleSubmit(onSubmit)} className="w-[450px]">
					{serverError && (
						<div className="rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700">
							{serverError}
						</div>
					)}
					<ContactInput
						label="Full Name"
						id="name"
						placeholder="Enter your full name"
						error={errors.name}
						register={register('name', {
							required: 'Name is required',
							minLength: {
								value: 3,
								message: 'Name must be at least 3 characters',
							},
							maxLength: {
								value: 30,
								message: 'Name must be less than 30 characters',
							},
							pattern: {
								value: /^[A-Za-zА\s'-]+$/,
								message: 'Only letters and spaces are allowed',
							},
						})}
					/>

					<ContactInput
						label="Email Address"
						id="email"
						placeholder="Enter your email address"
						error={errors.email}
						register={register('email', {
							required: 'Email is required',
							minLength: {
								value: 6,
								message: 'Email must be at least 6 characters',
							},
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: 'Please enter a valid email',
							},
						})}
					/>

					<ContactInput
						label="Phone Number"
						id="phone"
						placeholder="Enter your phone number"
						error={errors.phone}
						register={register('phone', {
							required: 'Phone is required',
							pattern: {
								value: /^(?:(?:\+)?[0-9\s\-().]{7,})$/,
								message: 'Please enter a valid phone number',
							},
						})}
					/>

					<ContactInput
						label="Message"
						id="message"
						placeholder="Your message goes here"
						error={errors.message}
						register={register('message', {
							required: 'Message is required',
							minLength: {
								value: 3,
								message:
									'Message must be at least 3 characters',
							},
							maxLength: {
								value: 300,
								message:
									'Message must be less than 300 characters',
							},
						})}
					/>

					<Button
						className="flex h-[58px] w-full justify-center gap-[40px] !rounded-none text-[20px]"
						icon={isSuccess ? <CheckIcon /> : <ArrowIconWhite />}
						iconPosition="right"
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting
							? 'Loading...'
							: isSuccess
								? 'Successfully send'
								: 'Get Started'}
					</Button>
				</form>
				<div
					className="mt-[-12px] h-[536px] w-[606px] bg-cover"
					style={{
						backgroundImage: "url('/images/contact-us-map.png')",
					}}
				/>
			</div>
		</section>
	);
};

