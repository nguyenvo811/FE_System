import * as React from 'react';
import ReactDOM from 'react-dom';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { Combobox, Label, TextInput, Select, Textarea } from 'flowbite-react';
import { createUser } from '../../../api/apiServices';
import isEmail from 'validator/lib/isEmail';

export default function AddUser(props) {

	// Set dialog size
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  // Declare global variables to create product
  const { open, close, row } = props;

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
    {id: "staff", value: "Staff"},
  ]

	const renderGender = [
    {id: "male", value: "Nam"},
    {id: "female", value: "Nữ"},
  ]

  const validation = () => {
    let msg = {}
    if (newUser.email === "") {
      msg.email = "Vui lòng điền email!"
    } else if (!isEmail(newUser.email)) {
      msg.email = "Email không đúng định dạng!"
		} if (newUser.password === "") {
      msg.password = "Vui lòng điền mật khẩu!"
    } else if (newUser.password.length < 6) {
      msg.password = "Mật khẩu phải trên 6 ký tự!"
    } if (newUser.fullName === "") {
      msg.fullName = "Vui lòng điền họ và tên!"
    } if (newUser.phoneNumber === "") {
      msg.phoneNumber = "Vui lòng điền số điện thoại!"
    } else if (newUser.phoneNumber.length < 10 || newUser.phoneNumber.length > 10) {
      msg.phoneNumber = "Số điện thoại không đúng!"
    } if (newUser.role === "") {
      msg.role = "Vui lòng chọn vai trò!"
    } if (newUser.gender === "") {
      msg.gender = "Vui lòng chọn giới tính!"
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
			gender: "",
			role: ""
    })
    setNewUser({
      email: "",
			password: "",
			fullName: "",
			phoneNumber: "",
			gender: "",
			role: ""
    })
    close()
  }

	const handleClose = () => {
    clearState()
    close()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: newUser.email,
			password: newUser.password,
			fullName: newUser.fullName,
			phoneNumber: newUser.phoneNumber,
			gender: newUser.gender,
			role: newUser.role
    }

		const isValid = validation()
    if (isValid){

    // Create the user
    await createUser(data)
      .then((response) => {
        row(response.data.data);
        clearState();
      })
      .catch((error) => {
        console.log(error)
      })
		}
  }
  

  return (
    <div>
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Thêm sản phẩm
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={close}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="email"
                      value="Email"
                    />
                  </div>
                  <TextInput
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                    required
                    type="text"
                    value={newUser.email}
                    onChange={handleChangeInput}
                  />
									<p class="mt-1 text-sm text-red-500"> 
										{error.email}
									</p>
                </div>
								
								<div>
									<div className="mb-2 block">
										<Label
											htmlFor="password"
											value="Mật khẩu"
										/>
									</div>
									<TextInput
										id="password"
										name="password"
										placeholder="Mật khẩu"
										required
										type="password"
										value={newUser.password}
										onChange={handleChangeInput}
									/>
									<p class="mt-1 text-sm text-red-500"> 
										{error.password}
									</p>
								</div>
              </div>

							<div className='grid grid-cols-2 gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="fullName"
                      value="Họ và tên"
                    />
                  </div>
                  <TextInput
                    id="fullName"
                    name="fullName"
                    placeholder="Nguyễn Văn A"
                    required
                    type="text"
                    value={newUser.fullName}
                    onChange={handleChangeInput}
                  />
									<p class="mt-1 text-sm text-red-500"> 
										{error.fullName}
									</p>
                </div>
								
								<div>
									<div className="mb-2 block">
										<Label
											htmlFor="phoneNumber"
											value="Số điện thoại"
										/>
									</div>
									<TextInput
										id="phoneNumber"
										name="phoneNumber"
										placeholder="0912365478"
										required
										value={newUser.phoneNumber}
										onChange={handleChangeInput}
									/>
									<p class="mt-1 text-sm text-red-500"> 
										{error.phoneNumber}
									</p>
								</div>
              </div>

							<div className='grid grid-cols-2 gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="gender"
                      value="Giới tính"
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
                      Chọn giới tính
                    </option>
                    {renderGender?.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.value}
                      </option>
                    ))}
									</Select>
									<p class="mt-1 text-sm text-red-500"> 
										{error.gender}
									</p>
                </div>
								
								<div>
									<div className="mb-2 block">
										<Label
											htmlFor="role"
											value="Vai trò"
										/>
									</div>
									<Select
										id="role"
										name="role"
										required
										defaultValue={"role"}
										onChange={handleChangeInput}
									>
									 	<option value={"role"}>
                      Chọn vai trò
                    </option>
                    {renderRole?.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.value}
                      </option>
                    ))}
									</Select>
									<p class="mt-1 text-sm text-red-500"> 
										{error.role}
									</p>
								</div>
              </div>

            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              Hủy
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}