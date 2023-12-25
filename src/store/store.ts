import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';

const useUserInfo = create(
	devtools(
		persist(
			combine(
				{
					ID: '',
					UserName: '',
					Role: '',
				},
				(set, get) => ({
					Set: (ui: any) => {
						set(ui);
					},
					Get: () => get(),
				}),
			),
			{ name: 'user-info' },
		),
	),
);

export default useUserInfo;
