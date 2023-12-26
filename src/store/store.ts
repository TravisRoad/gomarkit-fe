import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';
import { useState, useEffect } from 'react';

const useStore = <T, F>(
	store: (callback: (state: T) => unknown) => unknown,
	callback: (state: T) => F,
) => {
	const result = store(callback) as F;
	const [data, setData] = useState<F>();

	useEffect(() => {
		setData(result);
	}, [result]);

	return data;
};

const initState = {
	ID: '',
	UserName: '',
	Role: '',
};

const useUserInfo = create(
	devtools(
		persist(
			combine(initState, (set, get) => ({
				Set: (ui: any) => {
					set(ui);
				},
				Get: () => get(),
				Reset: () => {
					set(initState);
				},
			})),
			{ name: 'user-info' },
		),
	),
);

export { useUserInfo };
export default useStore;
