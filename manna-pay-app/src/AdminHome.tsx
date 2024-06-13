import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import { userState } from "./atom/Users";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import {TransitionProps} from "@mui/material/transitions"
import {Avatar, Container, Divider, Typography,CircularProgress, Select, MenuItem,
    Box, Card,CardActions,CardContent, Slide, InputLabel,
    Button, SelectChangeEvent} from "@mui/material";

const baseURL = "https://jsonplaceholder.typicode.com/users"
    
type User = {
    userId: string;
    userPoint: number;
    userName: string;
    sendPoint: number;
    changeFlag: boolean;
    }

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
    ) {
    return <Slide direction="up" ref={ref} {...props} />;
    });
      
function AdminHome() {
    const [isLoading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [sendPoint, setSendPoint] = useState(0)
    const [sendUser, setSendUser] = useState("")
    const [userInfo, setUserInfo] = useState<User[]>([])

    useEffect(() => {
            axios.get(baseURL).then((res) => {
                console.log(res.data)
                const userList = [
                    {
                        userId: res.data[0].email,
                        userPoint: res.data[0].id,
                        userName: res.data[0].name,
                        sendPoint: 0,
                        changeFlag: false
                    },
                    {
                        userId: res.data[1].email,
                        userPoint: res.data[1].id,
                        userName: res.data[1].name,
                        sendPoint: 0,
                        changeFlag: false
                    },
                    {
                        userId: res.data[2].email,
                        userPoint: res.data[2].id,
                        userName: res.data[2].name,
                        sendPoint: 0,
                        changeFlag: false
                    }
                ]
                setUserInfo(userList);
            });
            // const storedUserInfo = sessionStorage.getItem('userInfo');
            // if (storedUserInfo) {
            // const parsedStoredUserInfo = JSON.parse(storedUserInfo)
            // setUserInfo(parsedStoredUserInfo);
            // }
      }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [userInfo])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClick = (id: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const {name} = e.currentTarget
        let point = 0
        if(name === 'plusTen'){
            point = 10
        }
        if(name === 'minusTen'){
            point = -10
        }
        if(name === 'plusFive'){
            point = 5
        }
        if(name === 'minusFive'){
            point = -5
        }
        if(name === 'plusOne'){
            point = 1
        }
        if(name === 'minusOne'){
            point = -1
        }
        const updatedList = userInfo.map(obj => {
            if (obj.userId === id) {
              // 更新が必要なオブジェクトをコピーし、変更を加える
              return { ...obj, sendPoint: obj.sendPoint + point };
            }
            return obj; // 更新が不要なオブジェクトはそのまま
          });
        setUserInfo(updatedList)
    }

    // const handleSend = (e: { preventDefault: () => void }) => {
    //     e.preventDefault();
    //     setUserInfo((prevUserInfo) => {
    //         // 前の状態を基に新しい状態を作成
    //         const updatedUserInfo = { ...prevUserInfo, userPoint: prevUserInfo.userPoint - sendPoint };
    //         // セッションに新しい状態を保存
    //         sessionStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    //         // 新しい状態を返す
    //         return updatedUserInfo;
    //     });
    //     setSendPoint(0)
    //     setSendUser("")
    //     setOpen(false);
    // }

    // const handleChangeSend = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    //     const {value} = e.target
    //     const newValue = parseInt(value)
    //     if ( newValue >= 0 && newValue <= userInfo.userPoint ){
    //         setSendPoint(newValue)
    //     } else {
    //         setSendPoint(0)
    //     }
    // }

    const handleSendUser = (e: SelectChangeEvent<string>) => {
        const {value} = e.target
        setSendUser(value)
        // alert(value)
    }

    return (
      <>
        {isLoading ? 
            <Box
            sx={{ display: "flex", 
            align: "center", 
            justifyContent: "center" }}>
                <CircularProgress
                    sx={{ margin: 20 }}
                />
            </Box>
            :
            <Container>
            <Container sx={{ mt: 10, display: "flex", float: "left" }}>
                {userInfo.map(user => (
                <Card key={user.userId} sx={{ width: "30%", boxShadow: 3, mr: 3, mb: 10 }}>
                    <Container sx={{ m: 1 }}>
                        <CardContent sx={{ display: 'flex',flexDirection: 'column', 
                            alignItems: 'center' }}>
                            <Avatar 
                                alt="Remy Sharp" 
                                src="https://www.anicom-sompo.co.jp/inu/wp-content/uploads/2020/12/94d34e01b3acd13b17f32a8912a01bbd.jpg"
                                sx={{ width: 100, height: 100, border: 1 }}
                                />
                            <Typography variant="h4" component="div" sx={{m: 1}}>
                                {user.userName}
                            </Typography>
                        </CardContent>

                        <Divider variant="middle" />

                        <CardContent sx={{ display: "flex", justifyContent: 'center'}}>
                                <Typography variant="h5" component="div" sx={{ m: 1 }}>
                                    {user.userPoint}
                                </Typography>
                                <Typography variant="h5" component="div" sx={{ m: 1 }}>
                                    {user.sendPoint >= 0 ?
                                        <Typography 
                                            variant="h5" sx={{ color: "red" }}>+</Typography> :
                                        <Typography
                                            variant="h5" sx={{ color: "blue" }}>-</Typography>}
                                </Typography>
                                <Typography variant="h5" component="div" sx={{ m: 1 }}>
                                    {user.sendPoint >= 0 ?
                                        <Typography 
                                            variant="h5" sx={{ color: "red" }}>{user.sendPoint}</Typography> :
                                        <Typography
                                            variant="h5" sx={{ color: "blue" }}>{user.sendPoint * -1}</Typography>}
                                </Typography>
                                <Typography variant="h5" component="div" sx={{ m: 1 }}>
                                    = {user.userPoint + user.sendPoint}
                                </Typography>
                        </CardContent>

                        <CardActions sx={{display: "flex", flexFlow: "column"}}>
                            <Container sx={{display: "flex", justifyContent: 'center'}}>
                                <Box sx={{ display: "flex",
                                    flexDirection: 'column', alignItems: 'center',
                                    }}>
                                    <Button size="medium" 
                                    sx={{ m: 1, backgroundColor: "red",
                                    '&:hover': {
                                        backgroundColor: 'red',
                                        opacity: 0.8// ホバー時の色
                                    }
                                    }}
                                    variant="contained" name="plusTen"
                                    onClick={(e) => handleClick(user.userId, e)}
                                    >+10</Button>
                                    <Button size="medium" 
                                    sx={{ m: 1, backgroundColor: "red",
                                    '&:hover': {
                                        backgroundColor: 'red',
                                        opacity:0.8// ホバー時の色
                                    }
                                    }}
                                    variant="contained" name="minusTen"
                                    onClick={(e) => handleClick(user.userId, e)}
                                    >-10</Button>
                                </Box>
                                <Box sx={{ display: "flex",
                                    flexDirection: 'column', alignItems: 'center',
                                    }}>
                                    <Button size="medium"
                                    sx={{ m: 1, backgroundColor: "orange",
                                    '&:hover': {
                                        backgroundColor: 'orange',
                                        opacity: 0.8 // ホバー時の色
                                    },}}
                                    variant="contained" name="plusFive"
                                    onClick={(e) => handleClick(user.userId, e)}
                                    >+5</Button>
                                    <Button size="medium" 
                                    sx={{ m: 1, backgroundColor: "orange",
                                            '&:hover': {
                                                backgroundColor: 'orange',
                                                opacity: 0.8 // ホバー時の色
                                            },
                                        }}
                                    variant="contained" name="minusFive"
                                    onClick={(e) => handleClick(user.userId, e)}
                                    >-5</Button>
                                </Box>
                                <Box sx={{ display: "flex",
                                    flexDirection: 'column', alignItems: 'center',
                                    }}>
                                    <Button size="medium"
                                    sx={{ m: 1, backgroundColor: "green",
                                    '&:hover': {
                                        backgroundColor: 'green',
                                        opacity: 0.8 // ホバー時の色
                                    },}}
                                    variant="contained" name="plusOne"
                                    onClick={(e) => handleClick(user.userId, e)}
                                    >+1</Button>
                                    <Button size="medium" 
                                    sx={{ m: 1, backgroundColor: "green",
                                            '&:hover': {
                                                backgroundColor: 'green',
                                                opacity: 0.8 // ホバー時の色
                                            },
                                        }}
                                    variant="contained" name="minusOne"
                                    onClick={(e) => handleClick(user.userId, e)}
                                    >-1</Button>
                                </Box>
                            </Container>
                            <Container>
                                <InputLabel id="demo-simple-select-label">理由</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={"理由を選んでください"}
                                label="Age"
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </Container>
                        </CardActions>
                    </Container>
                    
                </Card>
                ))}
            </Container>
            <Button
                size="medium"
                sx={{
                position: "fixed",
                bottom: 20,
                width: "10%", // 左右のマージンを考慮して幅を調整
                right: 20,
                fontSize: 20
                }}
                variant="contained"
            >
                おくる
            </Button>
            </Container>
            
            }

      </>
    );
  }
  
  export default AdminHome;
  