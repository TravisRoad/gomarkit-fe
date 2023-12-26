import { redirectToLogin } from '@/lib/auth';

export default async function Home() {
	const hasLogin = await redirectToLogin();
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			HomePage
		</main>
	);
}
