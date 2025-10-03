'use client';

import { JSX, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProjectDetails } from '@/modules/AvailableProjects/hooks/useProjectDetails';
import { RequestImageGallery } from '@/modules/MyRequests/components/details/RequestImageGallery';
import { MobileImageCarousel } from '@/modules/MyRequests/components/details/MobileImageCarousel';
import { ProjectDescription } from '@/modules/AvailableProjects/components/details/ProjectDescription';
import { ProjectDetailsHeader } from '@/modules/AvailableProjects/components/details/ProjectDetailsHeader';
import { RequestDetailsPanel } from '@/modules/MyRequests/components/details/RequestDetailsPanel';
import { LocationSection } from '@/modules/MyRequests/components/details/LocationSection';
import { RespondToProjectModal } from '@/modules/AvailableProjects/components/details/RespondToProjectModal';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary/ErrorBoundary';
import { LoadingSpinner } from '@/shared/components/Loading/LoadingSpinner';

const ErrorState = ({
	error,
	onRetry,
}: {
	error: string;
	onRetry: () => void;
}) => (
	<section
		className="flex flex-col items-center justify-center py-12 text-center"
		role="alert"
		aria-live="polite"
	>
		<h2 className="mb-2 text-lg font-medium text-[#242424]">
			Error loading project
		</h2>
		<p className="mb-4 text-[#242424]/50">{error}</p>
		<button
			onClick={onRetry}
			type="button"
			className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
		>
			Try Again
		</button>
	</section>
);

export default function ProjectDetailsPage(): JSX.Element {
	const params = useParams();
	const router = useRouter();
	const projectId = params.id as string;

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const {
		data: project,
		isLoading,
		error,
		refetch,
	} = useProjectDetails(projectId);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const handleApplyClick = () => {
		if (isMobile) {
			router.push(`/profile/available-projects/${projectId}/create-respond`);
		} else {
			setIsModalOpen(true);
		}
	};

	if (isLoading) {
		return (
			<ErrorBoundary>
				<section className="mb-10 w-full max-w-full overflow-hidden">
					<LoadingSpinner />
				</section>
			</ErrorBoundary>
		);
	}

	if (error || !project) {
		return (
			<ErrorBoundary>
				<section className="mb-10 w-full max-w-full overflow-hidden">
					<ErrorState
						error={
							error instanceof Error
								? error.message
								: 'Project not found or has been deleted'
						}
						onRetry={() => refetch()}
					/>
				</section>
			</ErrorBoundary>
		);
	}

	const projectDetails = [
		{
			label: 'Desired start:',
			value: project.preferredStart,
			type: 'calendar' as const,
		},
		{
			label: '',
			value: project.completionWindow,
			type: 'clock' as const,
		},
	];

	return (
		<ErrorBoundary>
			<>
				<div className="block bg-[#F1F3F6] px-5 pt-17 lg:pt-89">
					<div className="flex items-center justify-center lg:hidden">
						<ProjectDetailsHeader
							title={project.title}
							location={project.location}
							category={project.category}
							onApplyClick={handleApplyClick}
						/>
					</div>
				</div>

				<div className="mx-auto px-5 lg:mt-[-210px] lg:max-w-[1285px]">
					<div className="hidden lg:block">
						<ProjectDetailsHeader
							title={project.title}
							location={project.location}
							category={project.category}
							onApplyClick={handleApplyClick}
						/>
					</div>

					<div className="my-6 block lg:hidden">
						<MobileImageCarousel images={project.images} />
					</div>

					<div className="hidden lg:block">
						<RequestImageGallery images={project.images} />
					</div>

					<div className="mb-14 grid grid-cols-1 gap-6 lg:mb-30 lg:grid-cols-[1fr_400px] lg:items-start lg:gap-12 lg:px-0">
						<div className="order-2 md:order-1">
							<ProjectDescription
								description={project.description}
								budgetFormatted={project.budgetFormatted}
								onApplyClick={handleApplyClick}
							/>
						</div>

						<RequestDetailsPanel
							className="order-1 md:order-2"
							details={projectDetails}
						/>
					</div>

					<div className="">
						<LocationSection location={project.location} />
					</div>
				</div>

				{!isMobile && (
					<RespondToProjectModal
						isOpen={isModalOpen}
						onClose={() => setIsModalOpen(false)}
						projectId={projectId}
						onSuccess={() => {
							console.log('Offer sent successfully!');
						}}
					/>
				)}
			</>
		</ErrorBoundary>
	);
}
