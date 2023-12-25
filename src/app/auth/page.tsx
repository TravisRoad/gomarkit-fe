import Login from '@/components/auth/login';
import Image from 'next/image';

export default function Auth() {
	return (
		<div className="w-4/5 mx-auto">
			<Image
				src="/placeholder/400.png"
				height={400}
				width={400}
				alt="placeholder"
				className="mx-auto max-w-[66%] mb-2"
			/>
			<Login />
		</div>
	);
}
