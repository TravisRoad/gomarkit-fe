'use Server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const isLogin = async (redirectURL: string, callback?: (d: any) => void) => {
	const isLogin = await fetch('http://localhost:8080/api/auth/islogin', {
		cache: 'no-store',
		headers: {
			Cookie: cookies().toString(),
		},
	}).then((res) => {
		const ans = res.status === 200;
		if (ans && callback) res.json().then(callback);
		return ans;
	});

	if (!isLogin) {
		redirect(redirectURL);
	}

	return isLogin;
};

const redirectToLogin = () => isLogin('/auth');

export default isLogin;

export { redirectToLogin };
