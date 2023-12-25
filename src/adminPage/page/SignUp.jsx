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
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Label, TextInput, Select, Textarea } from 'flowbite-react';
import { signIn, userSignUp } from '../../api/apiServices';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			Do you already have an account? {" "}
			<Link color="inherit" href="/sign-in">
				Sign in.
			</Link>
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

export default function SignUp() {
	// Use navigate when user sign in successfully
	const navigate = useNavigate();

	// Declare globl variables
	const [open, setOpen] = React.useState(false);
	const [alertError, setAlertError] = React.useState("");

	const [newUser, setNewUser] = React.useState({
    email: "",
    password: "",
		fullName: "",
		phoneNumber: "",
		gender: "",
		role: ""
  });

	const [error, setError] = React.useState({
    email: "",
    password: "",
		fullName: "",
		phoneNumber: "",
		gender: "",
		role: ""
  });

	const renderRole = [
    {id: "admin", value: "Admin"},
    {id: "customer", value: "Customer"},
  ]

	const renderGender = [
    {id: "male", value: "Male"},
    {id: "female", value: "Female"},
  ]

  const validation = () => {
    let msg = {}
    if (newUser.email === "") {
      msg.email = "Do not empty the field!"
    } else if (!isEmail(newUser.email)) {
      msg.email = "Incorrect email form!"
		} if (newUser.password === "") {
      msg.password = "Do not empty the field!"
    } else if (newUser.password.length < 6) {
      msg.password = "Password must be greater than 6!"
    } if (newUser.fullName === "") {
      msg.fullName = "Do not empty the field!"
    } if (newUser.phoneNumber === "") {
      msg.phoneNumber = "Do not empty the field!"
    } else if (newUser.phoneNumber.length < 10 || newUser.phoneNumber.length > 10) {
      msg.phoneNumber = "Incorrect phone number form!"
    } if (newUser.gender === "") {
      msg.gender = "Do not empty the field!"
    } 
    
    setError(msg)
    if (Object.keys(msg).length > 0) {
      return false
    } else {
      return true
    }
  };

	const handleChangeInput = (e) => {
    let {name, value} = e.target;
    setNewUser({...newUser, [name]: value})
    setError({...error, [name]: ""})
  }

  const clearState = () => {
		setError({
      email: "",
			password: "",
			fullName: "",
			phoneNumber: "",
			gender: ""
    })
    setNewUser({
      email: "",
			password: "",
			fullName: "",
			phoneNumber: "",
			gender: ""
    })
  }

	const handleClose = () => {
    clearState()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: newUser.email,
			password: newUser.password,
			fullName: newUser.fullName,
			phoneNumber: newUser.phoneNumber,
			gender: newUser.gender
    }

		const isValid = validation()
    if (isValid){

    // Create the user
    await userSignUp(data)
      .then((response) => {
        clearState()
				navigate("/sign-in")
      })
      .catch((error) => {
        console.log(error)
      })
		}
  }

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
						<div class="flex items-center" onClick={() => navigate("/")}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              
            </div>
						<Typography component="h1" variant="h5">
							Sign up
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
										value={newUser.email}
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
											value="Password"
										/>
									</div>
									<TextInput
										id="password"
										name='password'
										placeholder="Password"
										required
										type="password"
										value={newUser.password}
										onChange={handleChangeInput}
									/>
									<p class="flex mt-1 text-sm text-red-500"> 
										{error.password}
									</p>
								</div>
								<div>
                  <div className="mb-2 flex">
                    <Label
                      htmlFor="fullName"
                      value="Full name"
                    />
                  </div>
                  <TextInput
                    id="fullName"
                    name="fullName"
                    placeholder="Full name"
                    required
                    type="text"
                    value={newUser.fullName}
                    onChange={handleChangeInput}
                  />
									<p class="flex mt-1 text-sm text-red-500"> 
										{error.fullName}
									</p>
                </div>
								
								<div>
									<div className="mb-2 flex">
										<Label
											htmlFor="phoneNumber"
											value="Phone number"
										/>
									</div>
									<TextInput
										id="phoneNumber"
										name="phoneNumber"
										placeholder="Phone number"
										required
										value={newUser.phoneNumber}
										onChange={handleChangeInput}
									/>
									<p class="flex mt-1 text-sm text-red-500"> 
										{error.phoneNumber}
									</p>
								</div>
								<div>
                  <div className="mb-2 flex">
                    <Label
                      htmlFor="gender"
                      value="Gender"
                    />
                  </div>
                  <Select
                    id="gender"
                    name="gender"
                    required
										defaultValue={"gender"}
                    onChange={handleChangeInput}
                  >
										<option value={"gender"}>
                      Choose gender
                    </option>
                    {renderGender?.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.value}
                      </option>
                    ))}
									</Select>
									<p class="flex mt-1 text-sm text-red-500"> 
										{error.gender}
									</p>
                </div>
							</div>
							
							{/* <FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/> */}
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								onChange={handleSubmit}
							>
								Sign up
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