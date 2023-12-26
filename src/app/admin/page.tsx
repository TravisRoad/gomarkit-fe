import { isAdmin } from '@/lib/auth';

export default async function page() {
	const [hasLogin, admin] = await isAdmin();
	if (!hasLogin) {
		return <div> not Login </div>;
	}
	if (!admin) {
		return <div> 401 Unauthorized </div>;
	}
	return (
		<div className="flex flex-col">
			<div>
				<button>login</button>
			</div>
		</div>
	);
}
