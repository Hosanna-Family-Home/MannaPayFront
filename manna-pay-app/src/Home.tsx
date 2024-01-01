import { useRecoilValue } from "recoil";
import { userState } from "./atom/Users";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import {TransitionProps} from "@mui/material/transitions"
import {Avatar, Container, Divider, Typography,CircularProgress, Select, MenuItem,
    Box, Card, Input,CardActions, InputLabel,CardContent, Slide,
    Button, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText, TextField, SelectChangeEvent} from "@mui/material";

    
type User = {
    userId: string;
    userPw: string;
    userPoint: number;
    userName: string;
    }
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
    ) {
    return <Slide direction="up" ref={ref} {...props} />;
    });
      
function Home() {
    const userRecoilValue = useRecoilValue(userState)
    const [isLoading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [sendPoint, setSendPoint] = useState(0)
    const [sendUser, setSendUser] = useState("")
    const [userInfo, setUserInfo] = useState<User>({userId:"", userPw:"",userPoint: 0,userName:""})

    useEffect(() => {
            const storedUserInfo = sessionStorage.getItem('userInfo');
            if (storedUserInfo) {
            const parsedStoredUserInfo = JSON.parse(storedUserInfo)
            setUserInfo(parsedStoredUserInfo);
            }
      }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [userInfo])

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleSend = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setUserInfo((prevUserInfo) => {
            // 前の状態を基に新しい状態を作成
            const updatedUserInfo = { ...prevUserInfo, userPoint: prevUserInfo.userPoint - sendPoint };
            // セッションに新しい状態を保存
            sessionStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
            // 新しい状態を返す
            return updatedUserInfo;
        });
        setSendPoint(0)
        setSendUser("")
        setOpen(false);
    }

    const handleChangeSend = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {value} = e.target
        const newValue = parseInt(value)
        if ( newValue >= 0 && newValue <= userInfo.userPoint ){
            setSendPoint(newValue)
        } else {
            setSendPoint(0)
        }
    }

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
            <Container sx={{ 
                display: "flex",
                justifyContent: "center",
                mt: 20,
            }}>
               
                <Card sx={{ minWidth: "40%", boxShadow: 3 }}>
                    <Container sx={{ m: 1 }}>
                        <CardContent sx={{ display: "flex" }}>
                            <Avatar 
                                alt="Remy Sharp" 
                                src="https://www.anicom-sompo.co.jp/inu/wp-content/uploads/2020/12/94d34e01b3acd13b17f32a8912a01bbd.jpg"
                                sx={{ width: 100, height: 100, border: 1 }}
                                />
                            <Typography variant="h4" component="div" sx={{ mt:5, ml: 5 }}>
                                {userInfo.userName}
                            </Typography>
                        </CardContent>
                        <Divider variant="middle" />
                        <CardContent>
                            <Typography variant="h5" component="div" sx={{ mt: 1 }}>
                                ポイント : 　{userInfo.userPoint}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{display: "flex"}}>
                            <Button size="medium" 
                            sx={{ mr: 3, ml: "auto"}}
                            variant="contained"
                            onClick={handleClickOpen}
                            >おくる</Button>
                        </CardActions>
                    </Container>
                </Card>

                <Dialog
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    TransitionComponent={Transition}
                    aria-describedby="alert-dialog-slide-description"
                    component="form" onSubmit={handleSend}
                >
                    <DialogTitle>{"だれにいくらおくりますか？"}</DialogTitle>
                    <DialogContent>
                    <Select
                        value={sendUser}
                        onChange={(e) => handleSendUser(e)}
                        sx={{ width: "70%"}}
                    >
                        <MenuItem value={10}>
                        <Box sx={{ display: "flex" }}>
                        <Avatar 
                            alt="tomoya"
                            src="https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-brown-bear-animal-transparent-on-white-png-image_6655678.png"
                            sx={{ width: 25, height: 25, border: 1, mr: 1 }}
                            />
                            ともや
                        </Box>
                        </MenuItem>

                        <MenuItem value={20}>
                        <Box sx={{ display: "flex" }}>
                        <Avatar 
                            alt="tomoya"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNvJ6v6rNU_eO58NtkjmNBs9IUvZ_9Vm8Uhw&usqp=CAU"
                            sx={{ width: 25, height: 25, border: 1, mr: 1 }}
                            />
                            かなと
                        </Box>
                        </MenuItem>

                        <MenuItem value={30}>
                        <Box sx={{ display: "flex" }}>
                        <Avatar 
                            alt="tomoya" 
                            src="data:image/jpeg;base64,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"
                            sx={{ width: 25, height: 25, border: 1, mr: 1 }}
                            />
                            ふうか
                        </Box>
                        </MenuItem>
                    </Select>
                    <Box sx={{height: 15}} />
                    <Input onChange={(e) => handleChangeSend(e)} 
                        value={sendPoint} sx={{fontSize: 30}}/>
                    </DialogContent>
                    <DialogActions>
                    <Button type="submit">おくる</Button>
                    <Button onClick={handleClose}>やめる</Button>
                    </DialogActions>
                </Dialog>
            </Container>

            
            }

      </>
    );
  }
  
  export default Home;
  