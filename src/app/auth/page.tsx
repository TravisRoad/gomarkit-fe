import Login from '@/components/auth/login';
import Image from 'next/image';
import isLogin from '@/lib/auth';

export default async function Auth() {
	const hasLogin = await isLogin();
	return (
		<div className="w-4/5 mx-auto">
			<Image
				src="/placeholder/400.png"
				height={400}
				width={400}
				alt="placeholder"
				className="mx-auto max-w-[66%] mb-2"
			/>
			<Login hasLogin={hasLogin} />
		</div>
	);
}
