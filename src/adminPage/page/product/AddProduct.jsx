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
import { createLaptop, createWatch, getCategories } from '../../../api/apiServices';
import UploadFile from '../../../asset/library/UploadFile';
import Watch from './Watch';
import Laptop from './Laptop';
import Television from './Television';
import SmartPhone from './SmartPhone';
import Tablet from './Tablet';

export default function AddProduct(props) {

  // Declare global variables to create product
  const { open, close, row } = props;
  const [select, setSelect] = React.useState([]);

  const [newProduct, setNewProduct] = React.useState({
    productName: "",
    description: "",
  });

  const handleChangeInput = (e) => {
    let { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value })
  }

  // Declare variables to create watch
  const [watch, setWatch] = React.useState({
    screenSize: "",
    weight: "",
    batteryCapacity: "",
  });


  // Declare variables to create laptop
  const [laptop, setLaptop] = React.useState({
    resolution: "",
    cpuNumber: "",
    baseClock: "",
    dimensions: "",
    weight: "",
    ram: "",
    operatingSystem: ""
  });

  // Set dialog size
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');

  // Get categories 
  React.useEffect(() => {
    getCategories()
      .then(res => {
        setSelect(res.data.data)
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.result);
          console.log(err.response.status);
          console.log(err.response.data.message);
        }
      })
  }, []);

  // Select category options to change attributes
  const [selectedValue, setSelectedValue] = React.useState("");
  const handleSelect = (e) => {
    // Set the state variable to the selected value.
    setSelectedValue(e.target.value);
  }

  // List category to rendert
  const listCategory = select.find(val => { 
    if (val._id === selectedValue) {
      return val
    } else {
      return 
    }
  });

  const includeParentId = [];

  select.forEach((element) => {
    if (element.parentId) {
      includeParentId.push(element);
    }
  });

  // Select, preview and remove image
  const [variants, setVariants] = React.useState([]);
  const [moreVariants, setMoreVariants] = React.useState([]);
  const [currentVariantIndex, setCurrentVariantIndex] = React.useState(0);
  const [currentMoreVariantIndex, setCurrentMoreVariantIndex] = React.useState(0);

  const handleAddMoreVariant = () => {
    const newMoreVariant = {
      version: "",
      price: "",
      quantity: ""
    };

    setMoreVariants((prevMoreVariants) => [...prevMoreVariants, newMoreVariant]);
    setCurrentMoreVariantIndex(moreVariants.length)
    setVariants((prevVariants) => {
      const newVariants = [...prevVariants];
      newVariants[currentVariantIndex].moreVariants.push(newMoreVariant);
      return newVariants;
    });
  }

  const handleAddVariant = () => {
    const newVariant = {
      color: "",
      images: [],
      moreVariants: moreVariants
    };

    setVariants((prevVariants) => [...prevVariants, newVariant]);
    setCurrentVariantIndex(variants.length)
  };

  const handleColorChange = (event) => {
    const variantsCopy = [...variants];
    variantsCopy[currentVariantIndex].color = event.target.value;

    setVariants(variantsCopy);
  };

  const handleFileUpload = (event) => {
    const variantsCopy = [...variants];
    const files = event.target.files;
    for (const file of files) {
      variantsCopy[currentVariantIndex].images.push(file);
    }

    setVariants(variantsCopy);
  };

  const handleVersionChange = (event) => {
    const variantsCopy = [...moreVariants];
    variantsCopy[currentMoreVariantIndex].version = event.target.value;

    setMoreVariants(variantsCopy);
  };

  const handlePriceChange = (event) => {
    const variantsCopy = [...moreVariants];
    variantsCopy[currentMoreVariantIndex].price = event.target.value;

    setMoreVariants(variantsCopy);
  };

  const handleQuantityChange = (event) => {
    const variantsCopy = [...moreVariants];
    variantsCopy[currentMoreVariantIndex].quantity = event.target.value;

    setMoreVariants(variantsCopy);
  };

  const handleImageDeletion = (index, imageIndex) => {
    const variantsCopy = [...variants];
    variantsCopy[index].images.splice(imageIndex, 1);

    setVariants(variantsCopy);
  };

  const handleVariantDeletion = (index) => {
    const variantsCopy = [...variants];
    variantsCopy.splice(index, 1);

    setVariants(variantsCopy);
  };

  const handleMoreVariantDeletion = (index) => {
    const variantsCopy = [...moreVariants];
    variantsCopy.splice(index, 1);

    setMoreVariants(variantsCopy);
  };

  console.log(variants)

  const displayMoreVariants = () => {
    return (
      <>
        {moreVariants?.map((variant, index) => (
          <div key={index} className="relative border border-gray-300 rounded-lg m-4">
            <div className="border-b border-gray-300 my-2">
              <div className='absolute top-0 right-0'>
                <IconButton>
                  <HighlightOffIcon onClick={(e) => handleMoreVariantDeletion(index)} />
                </IconButton>
              </div>
              <div className='p-2 font-sans font-bold'>
                <h4>Variant {index + 1}</h4>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-2 m-2'>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="version"
                    value="Version"
                  />
                </div>
                <TextInput
                  id="version"
                  name="version"
                  type="text"
                  placeholder="Version of product"
                  onClick={() => setCurrentMoreVariantIndex(index)}
                  value={moreVariants.version}
                  onChange={(event) => handleVersionChange(event)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="price"
                    value="Price"
                  />
                </div>
                <TextInput
                  id="price"
                  name="price"
                  type="text"
                  placeholder="Price of product"
                  onClick={() => setCurrentMoreVariantIndex(index)}
                  value={moreVariants.price}
                  onChange={(event) => handlePriceChange(event)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="quantity"
                    value="Quantity"
                  />
                </div>
                <TextInput
                  id="quantity"
                  name="quantity"
                  type="text"
                  placeholder="Quantity of product"
                  onClick={() => setCurrentMoreVariantIndex(index)}
                  value={moreVariants.quantity}
                  onChange={(event) => handleQuantityChange(event)}
                />
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }

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
                    htmlFor="color"
                    value="Color"
                  />
                </div>
                <TextInput
                  id="color"
                  name="color"
                  required
                  placeholder="Color of product"
                  onClick={() => setCurrentVariantIndex(index)}
                  value={variants.color}
                  onChange={(event) => handleColorChange(event)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="image"
                    value="Images"
                  />
                </div>
                <TextInput
                  id="dropzone-file"
                  name="image"
                  type="file"
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  multiple
                  onClick={() => setCurrentVariantIndex(index)}
                  onChange={(event) => handleFileUpload(event)}
                />
              </div>
            </div>

            <div className="w-full mx-auto">
              <div className='relative flex mt-4 justify-center space-x-6'>
                {variant.images.map((image, imageIndex) => (
                  <div key={imageIndex} className='relative'>
                    <div className='h-36 w-36 m-auto relative group border-dashed border-2 border-gray-300 rounded-xl'>
                      <img src={URL.createObjectURL(image)} alt="Preview" className='w-full h-full rounded-xl bg-center bg-cover ' />
                      <div className='absolute top-0 right-0'>
                        <IconButton>
                          <HighlightOffIcon onClick={(e) => handleImageDeletion(index, imageIndex)} />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {displayMoreVariants()}

            <div className='m-4'>
              <Button
                variant="contained"
                color="inherit"
                onClick={handleAddMoreVariant}
              >Create variant</Button>
            </div>
          </div>
        ))}
      </>
    );
  };

  const clearState = () => {
    setWatch({
      screenSize: "",
      weight: "",
      batteryCapacity: "",
    });

    setNewProduct({
      productName: "",
      description: "",
    });

    setSelectedValue("");
    setVariants([]);
    setMoreVariants([]);
    close();
  }

  const choseValue = (value) => {
    switch (value) {
      case listCategory[0]:
        return {
          screenSize: watch.screenSize,
          weight: watch.weight,
          batteryCapacity: watch.batteryCapacity,
        };
      case listCategory[1]:
        return {
          resolution: laptop.resolution,
          cpuNumber: laptop.cpuNumber,
          baseClock: laptop.baseClock,
          dimensions: laptop.dimensions,
          weight: laptop.weight,
          ram: laptop.ram,
          operatingSystem: laptop.operatingSystem
        };
      default:
        throw new Error('Invalid product type');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      productName: newProduct.productName,
      description: newProduct.description,
      category: selectedValue,
      variants: variants,
      ...choseValue(selectedValue)
    }

    const updatedVariants = [];
    for (let index = 0; index < variants.length; index++) {

      const element = variants[index];
      const upfiles = await Promise.all(element.images.map(UploadFile));
      const updatedElement = {
        ...element,
        images: upfiles.map((upfile) => upfile.data),
      };
      updatedVariants.push(updatedElement);
    }

    data.variants = updatedVariants;

    console.log(data)
    // Create the appropriate product type based on the selected category
    const createProductType = async (productType) => {
      switch (productType) {
        case listCategory[0]:
          return await createWatch(data);
        case listCategory[1]:
          return await createLaptop(data);
        default:
          throw new Error('Invalid product type');
      }
    };

    // Create the product
    return await createProductType(selectedValue)
      .then((response) => {
        console.log(response.data.data)
        row(response.data.data);
        clearState();
      })
      .catch((error) => {
        console.log(error)
      })
  }


  return (
    <div>
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={close}
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
                      htmlFor="productName"
                      value="Product Name"
                    />
                  </div>
                  <TextInput
                    id="productName"
                    name="productName"
                    placeholder="iPhone 15"
                    required
                    type="text"
                    value={newProduct.productName}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>

              <div className='grid gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="category"
                      value="Category"
                    />
                  </div>
                  <Select
                    id="category"
                    name="category"
                    required
                    value={selectedValue}
                    onChange={handleSelect}
                  >
                    <option value={"Choose category"}>
                      Choose category
                    </option>
                    {includeParentId?.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.categoryName}
                      </option>
                    ))}
                  </Select>
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
                  placeholder="iPhone is the best product of Apple"
                  required
                  rows={4}
                  value={newProduct.description}
                  onChange={handleChangeInput}
                />
              </div>

              {
                selectedValue === "" ? "" 
                  : selectedValue === "Choose category" ? "" 
                    : listCategory.parentId.categoryName === "Watch" ? <Watch data={watch} setData={setWatch} />
                      : listCategory.parentId.categoryName === "Laptop" ? <Laptop data={laptop} setData={setLaptop} />
                        : listCategory.parentId.categoryName === "Television" ? <Television data={laptop} setData={setLaptop} />
                          : listCategory.parentId.categoryName === "Smart phone" ? <SmartPhone data={laptop} setData={setLaptop} />
                            : listCategory.parentId.categoryName === "Tablet" ? <Tablet data={laptop} setData={setLaptop} />
                              : "" 
              }

              {displayPreview()}

              <div className='mt-4'>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={handleAddVariant}
                >Create product color</Button>
              </div>

            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="inherit" onClick={close}>
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