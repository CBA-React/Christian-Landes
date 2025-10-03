import {
	useMutation,
	UseMutationResult,
	useQuery,
	useQueryClient,
	UseQueryResult,
} from '@tanstack/react-query';

import { MyPlan, Plan, PlansApi } from '../services/PlansApi';

export const usePlans = (): UseQueryResult<Plan[], Error> =>
	useQuery({ queryKey: ['plans'], queryFn: () => PlansApi.getPlans() });

export const useMyPlan = (): UseQueryResult<MyPlan, Error> =>
	useQuery({ queryKey: ['my-plan'], queryFn: () => PlansApi.getMyPlan() });

export const useSubscribeOrChange = (): UseMutationResult<
	{
		url: string;
	},
	Error,
	{
		plan_id: number;
		hasActive: boolean;
	},
	unknown
> => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (vars: { plan_id: number; hasActive: boolean }) => {
			return vars.hasActive
				? PlansApi.changePlan(vars.plan_id)
				: PlansApi.createSubscription(vars.plan_id);
		},
		onSuccess: async (_data) => {
			await qc.invalidateQueries({ queryKey: ['my-plan'] });
		},
	});
};
