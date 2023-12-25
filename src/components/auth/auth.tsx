'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const isLogin = async (): Promise<boolean> => {
	const ans = await fetch('/api/auth/islogin', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((res) => {
		return res.status == 200;
	});
	return ans;
};

export default function AuthCheck() {
	const router = useRouter();

	useEffect(() => {
		isLogin().then((res) => {
			if (!res) {
				router.push('/auth');
			}
		});
	}, []);

	return <></>;
}
