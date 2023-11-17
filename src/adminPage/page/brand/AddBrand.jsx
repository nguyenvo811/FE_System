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
import { createBrand, createCategory } from '../../../api/apiServices';

export default function AddBrand(props) {

	// Set dialog size
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  // Declare global variables to create product
  const { open, close, row } = props;

  const [msgErr, setMsgErr] = React.useState("");

  const [newBrand, setNewBrand] = React.useState({
    brandName: "",
    description: "",
  });

	const [error, setError] = React.useState({
    brandName: "",
    description: "", 
  });

	const [variants, setVariants] = React.useState([]);
  const [currentVariantIndex, setCurrentVariantIndex] = React.useState(0);

  const handleAddVariant = () => {
    const newVariant = {
      name: "",
      description: ""
    };

    setVariants((prevVariants) => [...prevVariants, newVariant]);
    setCurrentVariantIndex(variants.length)
  };

  const handleNameChange = (event) => {
    const variantsCopy = [...variants];
    variantsCopy[currentVariantIndex].name = event.target.value;

    setVariants(variantsCopy);
  };

	const handleDescriptionChange = (event) => {
    const variantsCopy = [...variants];
    variantsCopy[currentVariantIndex].description = event.target.value;

    setVariants(variantsCopy);
  };

  const handleVariantDeletion = (index) => {
    const variantsCopy = [...variants];
    variantsCopy.splice(index, 1);

    setVariants(variantsCopy);
  };

  console.log(variants)

  const displayPreview = () => {
    return (
      <>
        {variants.map((variant, index) => (
          <div key={index} className="relative border border-gray-300 rounded-lg mt-2">
            <div className="border-b border-gray-300 my-2">
              <div className='absolute top-0 right-0'>
                <IconButton>
                  <HighlightOffIcon onClick={(e) => handleVariantDeletion(index)} />
                </IconButton>
              </div>
              <div className='p-2 font-sans font-bold'>
                <h4>Product {index + 1}</h4>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-2 m-2'>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="name"
                    value="Product name"
                  />
                </div>
                <TextInput
                  id="name"
                  name="name"
                  required
                  placeholder="Name of product brand"
                  onClick={() => setCurrentVariantIndex(index)}
                  value={variants.name}
                  onChange={(event) => handleNameChange(event)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="description"
                    value="Description"
                  />
                </div>
                <TextInput
                  id="description-file"
                  name="description"
                  required
                  placeholder="Product description"
                  onClick={() => setCurrentVariantIndex(index)}
                  value={variants.description}
                  onChange={(event) => handleDescriptionChange(event)}
                />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const validation = () => {
    let msg = {}
    if (newBrand.brandName === "") {
      msg.brandName = "Do not empty the field!"
    } else if (msgErr !== "") {
      msg.brandName = msgErr
    } if (newBrand.description === "") {
      msg.description = "Do not empty the field!"
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
    let {name, value} = e.target;
    setNewBrand({...newBrand, [name]: value})
    setError({...error, [name]: ""})
  }

  const clearState = () => {
		setError({
      brandName: "",
      description: "", 
    });
    setNewBrand({
      brandName: "",
      description: "", 
    });
    setMsgErr("");
		setVariants([]);
    close();
  }

	const handleClose = () => {
    clearState()
    close()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      brandName: newBrand.brandName,
      description: newBrand.description,
			variants: variants
    }

		console.log(data	)

		const isValid = validation()
    if (isValid){

    // Create the category
    await createBrand(data)
      .then((response) => {
        row(response.data.data);
        clearState();
      })
      .catch((error) => {
				if (error.response.status === 500) {
					console.log(error.response.data.result);
					console.log(error);
					setMsgErr(error.response.data.message);
				}
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
            Create brand
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
                      htmlFor="brandName"
                      value="Brand name"
                    />
                  </div>
                  <TextInput
                    id="brandName"
                    name="brandName"
                    placeholder="Brand name"
                    required
                    type="text"
                    value={newBrand.brandName}
                    onChange={handleChangeInput}
                  />
									<p class="mt-1 text-sm text-red-500"> 
										{error.brandName}
									</p>
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="description"
                    value="Description"
                  />
                </div>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Brand description"
                  required
                  rows={4}
                  value={newBrand.description}
                  onChange={handleChangeInput}
                />
								<p class="mt-1 text-sm text-red-500"> 
									{error.description}
								</p>
              </div>

							{displayPreview()}

              <div className='mt-4'>
                <Button 
                  variant="contained" 
                  color="inherit"
                  onClick={handleAddVariant}
                >Create variants</Button>
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}