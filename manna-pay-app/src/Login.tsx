import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil"
import { useHistory } from "react-router-dom"
import {Button, Container, Box, TextField, Typography} from "@mui/material";
import { userState } from "./atom/Users";
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';


function Login() {
  let history = useHistory()
  const initialUser: User = {
    userId: "",
    userPw: "",
	userPoint: 0,
	userName: "",
	userFlag: "",
	parentChildFlag: 0,
	loginFlag: false
  }

type CsrfToken = {
	csrf_token: string
}

const setRecoilUser = useSetRecoilState(userState);
const [user, setUser] = useState<User>(initialUser);
const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>) => {
	const { name, value } = e.target;
	setUser({ ...user, [name]: value });
}
  
const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
	
    try {
        // ログインリクエストを送信
		axios.defaults.withCredentials = true
		const getCsrfToken = async () => {
			const { data } = await axios.get<CsrfToken>(
				'http://localhost:8080/csrf'
			)
			axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
			return data.csrf_token
		  }
		getCsrfToken()
		.then((csrf_token) => {
			alert(csrf_token)
			axios.post('http://localhost:8080/login',
			{email: user.userId, password: user.userPw}). //id: asdf@gmail.com, pw: asdfasdf
			then((res) => {
				alert('FINAL SUCCESS!!');
				sessionStorage.setItem("userInfo", JSON.stringify(loginUser));
				setRecoilUser(loginUser)
				setUser(initialUser)
				alert('login successed')
				if (user.parentChildFlag == 0) {
					history.push("/adminHome")
				} else if (user.parentChildFlag == 1) {
					history.push("/home")
				} else {
					sessionStorage.removeItem("userInfo")
				}

			})
		})
		.catch((err) => {
			alert(`${err} : login failed`)
		})
		
    } catch (error) {
        // エラーハンドリング
		sessionStorage.removeItem("userInfo")
        alert('Error during login:');
    }
}

type User = {
	userId: string | null;
	userPw: string | null;
	userPoint: number | null;
	userName: string | null;
	userFlag: string | null;
	parentChildFlag: number;
	loginFlag: boolean;
}

const loginUser: User = {
	userId: "kanatomoya",
	userPw: "1234",
	userPoint: 235,
	userName: "かなともや",
	userFlag: "p",
	parentChildFlag: 0,
	loginFlag: true
}

  return (
    <>
			<Container component="main" maxWidth="sm">
				<Box
					sx={{
						marginY: '10%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						borderRadius:5,
						boxShadow: 3,
						padding: 5
          }}
				>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, align: 'center' }}>
						<Typography component="h1" variant="h5" textAlign="center">
							Sign in
						</Typography>
						<TextField
								margin="normal"
								required
								fullWidth
								name="userId"
								label="id"
								type="text"
								id="userId"
								value={user.userId}
								onChange={(e) => handleChange(e)}
							/>
						<TextField
								margin="normal"
								required
								fullWidth
								name="userPw"
								label="userPw"
								type="password"
								id="userPw"
								autoComplete="current-password"
								value={user.userPw}
								onChange={(e) => handleChange(e)}
							/>
							<InputLabel id="demo-simple-select-label">check</InputLabel>
							<Select
								name="parentChildFlag"
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={user.parentChildFlag}
								label="Age"
								onChange={(e) => handleChange(e)}
							>
								<MenuItem value={0}>Parent</MenuItem>
								<MenuItem value={1}>Child</MenuItem>
							</Select>
							
						<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2, p: 2, fontSize: 20}}
						>
							Login
						</Button>
					</Box>
				</Box>
			</Container>
    </>
    );
}

export default Login;
