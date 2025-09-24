'use client';

import { JSX, useEffect, useState } from 'react';
import { ProjectsApi } from '../../../../modules/AvailableProjects/services/AvailableProjectsApi';
import { AvailableProjects } from '../../../../modules/AvailableProjects/components/AvailableProjects';
import { ProjectDisplayData } from '../../../../modules/AvailableProjects/types/type';
import { LoadingSpinner } from '@/shared/components/Loading/LoadingSpinner';

export default function AvailableProjectsPage(): JSX.Element {
	const [projects, setProjects] = useState<ProjectDisplayData[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const projectsResponse = await ProjectsApi.getProjects({
					page: 1,
					perPage: 6,
				});

				const displayProjects = ProjectsApi.transformProjectsForDisplay(
					projectsResponse.data,
				);

				setProjects(displayProjects);
			} catch (err) {
				console.error('Failed to load projects:', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProjects();
	}, []);

	return (
		<>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<AvailableProjects initialProjects={projects} />
			)}
		</>
	);
}
