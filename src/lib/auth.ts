'use Server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const IS_LOGIN_URL = 'http://localhost:8080/api/auth/islogin';

const _isLogin = async () => {
	return fetch(IS_LOGIN_URL, {
		cache: 'no-store',
		headers: {
			Cookie: cookies().toString(),
		},
	});
};

const isLogin = async () => {
	const isLogin = await _isLogin().then((res) => {
		return res.status === 200;
	});

	return isLogin;
};

const redirectToLogin = async () => {
	const isLogin = await _isLogin().then((res) => {
		return res.status === 200;
	});

	if (!isLogin) {
		redirect('/auth');
	}
};

const isAdmin = async (): Promise<[boolean, boolean]> => {
	const isAdmin = await _isLogin().then(async (res) => {
		if (res.status === 200) {
			const data = await res.json();
			return [true, data?.data?.role === 'admin'];
		}
		return [false, false];
	});
	return isAdmin as [boolean, boolean];
};

export default isLogin;

export { redirectToLogin, isAdmin };
