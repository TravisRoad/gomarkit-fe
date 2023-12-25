'use client';

import { ChangeEvent, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Credential {
	Username: string;
	Password: string;
}

const isLogin = async (): Promise<boolean> => {
	const ans = await fetch('/api/auth/islogin', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((res) => {
			return res.status == 200;
		})
		.catch((_e) => {
			return false;
		});
	return ans;
};

export default function Login() {
	const [cred, setCred] = useState<Credential>({
		Username: '',
		Password: '',
	});
	const router = useRouter();

	useEffect(() => {
		const checkLogin = async () => {
			const hasLogin: boolean = await isLogin();
			if (hasLogin) {
				router.push('/');
			}
		};
		checkLogin();
	}, []);

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
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	return (
		<>
			<div className="p-2 w-2/3 mx-auto bg-sky-700 text-white border-2 border-sky-900 border-b-0">
				login
			</div>
			<div className="p-2 w-2/3 mx-auto border-2 border-sky-900">
				<div className="w-full flex flex-col mt-2 mb-6">
					<button
						className="border hover:bg-slate-200 p-1 mt-2 w-2/3 mx-auto shadow"
						// onClick={debounce(login, 300)}
					>
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
						<div className="mb-2">
							<label className="w-2/3 mx-auto md:mx-1 md:w-1/6 block md:text-right pr-2 md:float-left font-bold ">
								{it.name}
							</label>
							<input
								type={it.type}
								className="border w-2/3 shadow-inner block mx-auto md:mx-0"
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
