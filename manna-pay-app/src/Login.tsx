import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil"
import { useHistory } from "react-router-dom"
import {Button, Container, Box, TextField, Typography} from "@mui/material";
import { userState } from "./atom/Users";


function Login() {
  let history = useHistory()
  const initialUser: User = {
    userId: "",
    userPw: "",
	userPoint: 0,
	userName: "",
	userFlag: ""
  }

const recoilUser = useRecoilValue(userState);
const setRecoilUser = useSetRecoilState(userState);
const [user, setUser] = useState<User>(initialUser);

const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
const { name, value } = e.target;
setUser({ ...user, [name]: value });
	console.log('id:', user.userId)
	console.log('password:', user.userPw)
}

const handleSubmit = (e: { preventDefault: () => void }) => {
	e.preventDefault();
	validate(user);
}

const validate = (userInputValue: User) => {
	let userFlag = ""
	if (!userInputValue.userId || !userInputValue.userPw) {
		alert('Please enter user id or password');
		return;
	}
	if (userInputValue.userId === loginUser.userId
		&& userInputValue.userPw === loginUser.userPw){
			userFlag = loginUser.userFlag
			sessionStorage.setItem("userInfo", JSON.stringify(loginUser));
			setUser(initialUser)
			alert('login successed')
	} else {
		setUser(initialUser)
		alert('going wrong')
	}
	if (userFlag === "p") {
		history.push("/adminHome")
		console.log(sessionStorage.getItem("userInfo"))
	}
	if (userFlag === "c") {
		history.push("/home")
		console.log(sessionStorage.getItem("userInfo"))
	}
}

type User = {
	userId: string;
	userPw: string;
	userPoint: number;
	userName: string;
	userFlag: string;
}

const loginUser: User = {
	userId: "kanatomoya",
	userPw: "1234",
	userPoint: 235,
	userName: "かなともや",
	userFlag: "p"
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
