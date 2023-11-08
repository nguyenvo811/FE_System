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
import { createCategory } from '../../../api/apiServices';

export default function AddCategory(props) {

  // Set dialog size
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  // Declare global variables to create product
  const { open, close, row } = props;


  // Select category options to change attributes
  const [selectedValue, setSelectedValue] = React.useState("");
  const handleSelect = (e) => {
    // Set the state variable to the selected value.
    setSelectedValue(e.target.value);
  }

  const [newCategory, setNewCategory] = React.useState({
    categoryName: "",
    description: ""
  });

  const [error, setError] = React.useState({
    categoryName: "",
    description: ""
  });

  const validation = () => {
    let msg = {}
    if (newCategory.categoryName === "") {
      msg.categoryName = "Không được bỏ trống ô!"
    } if (newCategory.description === "") {
      msg.description = "Không được bỏ trống ô!"
    }

    setError(msg)
    console.log("validating")
    if (Object.keys(msg).length > 0) {
      return false
    } else {
      return true
    }
  };

  const handleChangeInput = (e) => {
    let { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value })
    setError({ ...error, [name]: "" })
  }

  const clearState = () => {
    setError({
      categoryName: "",
      description: "",
    })
    setNewCategory({
      categoryName: "",
      description: "",
    })
    setSelectedValue("")
    close()
  }

  const handleClose = () => {
    clearState()
    close()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      categoryName: newCategory.categoryName,
      description: newCategory.description
    }

    const isValid = validation()
    if (isValid) {

      // Create the category
      await createCategory(data)
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
              <div className='grid gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="categoryName"
                      value="Loại sản phẩm"
                    />
                  </div>
                  <TextInput
                    id="categoryName"
                    name="categoryName"
                    placeholder="Loại sản phẩm"
                    required
                    type="text"
                    value={newCategory.categoryName}
                    onChange={handleChangeInput}
                  />
                  <p class="mt-1 text-sm text-red-500">
                    {error.categoryName}
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="description"
                    value="Mô tả loại sản phẩm"
                  />
                </div>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Mô tả loại sản phẩm"
                  required
                  rows={4}
                  value={newCategory.description}
                  onChange={handleChangeInput}
                />
                <p class="mt-1 text-sm text-red-500">
                  {error.description}
                </p>
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