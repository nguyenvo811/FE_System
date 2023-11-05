import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Label, TextInput, Select, Textarea } from 'flowbite-react';
import { signIn } from '../../api/apiServices';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

function AlertModal(props) {
	const { open, close, error } = props;
	
	return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Thông tin xác thực"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authentication() {
	// Use navigate when user sign in successfully
	const navigate = useNavigate();

	// Declare globl variables
	const [open, setOpen] = React.useState(false);
	const [alertError, setAlertError] = React.useState("");

	const handleOpen = (val) => {
		setOpen(true)
		setAlertError(val)
	}

	const handleClose = () => {
		setOpen(false)
		setAlertError("")
	}

	const [account, setAccount] = React.useState({
		email: "",
		password: ""
	})

	const [error, setError] = React.useState({
		email: "",
		password: ""
	});

	// Get value
	const handleChangeInput = (e) => {
		let { name, value } = e.target;
		setAccount({ ...account, [name]: value })
		setError({...error, [name]: ""})
	}

	// Validation
	const validate = () => {
		let msg = {}
		if (account.email === "") {
			msg.email = "Vui lòng nhập email!"
		} else if (!isEmail(account.email)) {
			msg.email = "Email không đúng định dạng!"
		} if (account.password === "") {
			msg.password = "Vui lòng nhập mật khẩu!"
		}

		setError(msg)
		console.log("validating")
		if (Object.keys(msg).length > 0) {
			return false
		} else {
			return true
		}
	};

	// Set state to null
	const clearState = () => {
    setError({
      email: "",
      password: "",
    })
    setAccount({
      email: "",
      password: "", 
    })
  }

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			email: account.email,
			password: account.password
		}

		const isValid = validate()
		if (isValid) {
			return await signIn(data)
			.then(res => {
				if (res.status === 200) {
					clearState()
					navigate("/products")
					window.location.reload()
				}
			})
			.catch((err) => {
				if (err.response.status === 500) {
					console.log(err.response.data.result);
					handleOpen(err.response.data.message);
				}
			})
		}
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Grid container component="main" sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
						backgroundRepeat: 'no-repeat',
						backgroundColor: (t) =>
							t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign in
						</Typography>
						<Box component="form" margin="normal" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
							<div className='w-full grid gap-4'>
								<div>
									<div className="mb-2 flex">
										<Label
											htmlFor="email"
											value="Email"
										/>
									</div>
									<TextInput
										id="email"
										name="email"
										placeholder="email@gmail.com"
										required
										type="email"
										value={account.email}
										onChange={handleChangeInput}
									/>
									<p class="flex mt-1 text-sm text-red-500"> 
										{error.email}
									</p>
								</div>
								<div>
									<div className="mb-2 flex">
										<Label
											htmlFor="password"
											value="Mật khẩu"
										/>
									</div>
									<TextInput
										id="password"
										name='password'
										placeholder="Nhập mật khẩu"
										required
										type="password"
										value={account.password}
										onChange={handleChangeInput}
									/>
									<p class="flex mt-1 text-sm text-red-500"> 
										{error.password}
									</p>
								</div>
							</div>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								onChange={handleSubmit}
							>
								Đăng nhập
							</Button>
							<Copyright sx={{ mt: 5 }} />
							<AlertModal open={open} close={handleClose} error={alertError} />
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
