'use client';

import { ChangeEvent, useState } from 'react';
import { debounce } from 'lodash';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useUserInfo from '@/store/store';

interface Credential {
	Username: string;
	Password: string;
}

export default function Login() {
	const [cred, setCred] = useState<Credential>({
		Username: '',
		Password: '',
	});
	const router = useRouter();
	const userinfo = useUserInfo();

	const login = () => {
		fetch('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify(cred),
		})
			.then((res) => {
				if (res.status != 200) {
					toast.error('Invalid credentials');
					return;
				}
				toast.success('success');
				router.push('/');
				res.json().then((d) => {
					const data = d.data;
					userinfo.Set({
						ID: data.id,
						UserName: data.username,
						Role: data.role,
					});
				});
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const form = [
		{
			name: 'Name',
			type: 'text',
			onChange: (e: ChangeEvent<HTMLInputElement>) => {
				setCred({ ...cred, Username: e.target.value });
			},
		},
		{
			name: 'Password',
			type: 'password',
			onChange: (e: ChangeEvent<HTMLInputElement>) => {
				setCred({ ...cred, Password: e.target.value });
			},
		},
	];

	return (
		<>
			<div className="p-2 w-2/3 mx-auto bg-sky-700 text-white border-2 border-sky-900 border-b-0">
				login
			</div>
			<div className="p-2 w-2/3 mx-auto border-2 border-sky-900">
				<div className="w-full flex flex-col mt-2 mb-6">
					<button
						className="border hover:bg-slate-200 p-1 mt-2 w-2/3 mx-auto shadow py-1"
						// onClick={debounce(login, 300)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 496 512"
							className="inline w-[1.75rem] h-[1.75rem] mr-2 -translate-y-0.5"
						>
							<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
						</svg>
						login with Github
					</button>
				</div>
				<div className="relative h-[1rem] my-1">
					<hr className="mx-4" />
					<span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-neutral-400 px-2">
						Or
					</span>
				</div>
				<div className="w-full flex flex-col my-4">
					{form.map((it) => (
						<div className="mb-2" key={it.name}>
							<label className="w-2/3 mx-auto md:mx-1 md:w-1/6 block md:text-right pr-2 md:float-left font-bold ">
								{it.name}
							</label>
							<input
								type={it.type}
								className="border w-2/3 shadow-inner block mx-auto md:mx-0 pl-2 py-0.5"
								onChange={it.onChange}
							/>
						</div>
					))}
					<button
						className="border hover:bg-slate-200 p-1 mt-2 w-2/3 mx-auto shadow"
						onClick={debounce(login, 300)}
					>
						login
					</button>
				</div>
			</div>
		</>
	);
}
