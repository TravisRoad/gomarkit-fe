import { redirectToLogin } from '@/lib/auth';

export default async function page() {
	const _hasLogin = await redirectToLogin();
	return (
		<div className="flex flex-col">
			<div>
				<button>login</button>
			</div>
		</div>
	);
}
