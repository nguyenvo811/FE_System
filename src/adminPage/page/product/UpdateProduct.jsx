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
import { createLaptop, createWatch, createSmartPhone, createTV, createTablet, getCategories, getBrands, getCategory } from '../../../api/apiServices';
import UploadFile from '../../../asset/library/UploadFile';
import Watch from './Watch';
import Laptop from './Laptop';
import Television from './Television';
import SmartPhone from './SmartPhone';
import Tablet from './Tablet';

export default function UpdateProduct(props) {

  // Declare global variables to create product
  const { open, close, row, data, setData } = props;
  const [select, setSelect] = React.useState([]);
  const [selectBrand, setSelectBrand] = React.useState([]);

  const handleChangeInput = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value })
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

  // Declare variables to create smart phone
  const [smartPhone, setSmartPhone] = React.useState({
    screenTech: "",
    resolution: "",
    screenSize: "",
    operatingSystem: "",
    processor: "",
    internalMemory: "",
    ram: "",
    mobileNetwork: "",
    simSlot: "",
    batteryCapacity: ""
  });

  // Declare variables to create tablet
  const [tablet, setTablet] = React.useState({
    screenTech: "",
    operatingSystem: "",
    processorChip: "",
    graphicsChip: "",
    wifi: "",
    bluetooth: "",
    internalMemory: "",
    ram: "",
    dimensionsNWeight: ""
  });

  // Declare variables to create television
  const [television, setTelevision] = React.useState({
    resolution: "",
    screenSize: "",
    productType: "",
    port: "",
    weight: ""
  });

  // Set dialog size
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');

  // Get categories and brand
  React.useEffect(() => {
    getCategories()
      .then(res => {
        console.log(res.data.data)
        setSelect(res.data.data)
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.result);
          console.log(err.response.status);
          console.log(err.response.data.message);
        }
      })
    getBrands()
      .then(res => {
        setSelectBrand(res.data.data)
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.result);
          console.log(err.response.status);
          console.log(err.response.data.message);
        }
      })
  }, []);

  // Select category and brand options to change attributes
  const [selectedValue, setSelectedValue] = React.useState("");
  const [selectedBrandValue, setSelectedBrandValue] = React.useState("");
  const [selectedProductBrandValue, setSelectedProductBrandValue] = React.useState("");

  const handleSelect = (e) => {
    // Set the state variable to the selected value.
    setSelectedValue(e.target.value);
  }

  const handleBrandSelect = (e) => {
    // Set the state variable to the selected value.
    setSelectedBrandValue(e.target.value);
  }

  const handleProductBrandSelect = (e) => {
    // Set the state variable to the selected value.
    setSelectedProductBrandValue(e.target.value);
  }

  // List category to rendert
  const listCategory = select?.find(val => {
    if (val._id === selectedValue) {
      return val
    } else {
      return
    }
  });

  const showProductBrand = selectBrand.find(val => {
    if (val._id === selectedBrandValue) {
      return val
    }
  });

  // Select, preview and remove image
  const [variants, setVariants] = React.useState([{
    color: "",
    images: [],
    moreVariants: []
  }]);

  const [moreVariants, setMoreVariants] = React.useState([{
    version: "",
    price: "",
    quantity: ""
  }]);

  console.log(data)

  React.useEffect(() => {
    setVariants(data?.variants)
    setSelectedValue(data?.category?._id)
    setSelectedBrandValue(data?.brand?._id)
    setSelectedProductBrandValue(data?.productBrand)
  }, [data?.category?._id, data?.brand?._id, data?.productBrand]);

  const [error, setError] = React.useState({
    productName: "",
    description: "",
    origin: "",
    category: "",
    color: "",
    price: "",
    images: ""
  });

  const handleAddMoreVariant = (index) => {
    let newMoreVariant = {
      version: "",
      price: "",
      quantity: ""
    };

    setMoreVariants([variants[index]?.moreVariants.push(newMoreVariant)])
  }

  const handleAddVariant = () => {
    let newField = {
      color: "",
      images: [],
      moreVariants: []
    }

    let newMoreVariant = {
      version: "",
      price: "",
      quantity: ""
    };

    setVariants([...variants, newField]);
    setMoreVariants([newMoreVariant]);
  };

  const handleColorChange = (index, event) => {
    const variantsCopy = [...variants];
    variantsCopy[index].color = event.target.value;

    setVariants(variantsCopy);
  };

  const handleFileUpload = (index, event) => {
    const variantsCopy = [...variants];
    const files = event.target.files;
    for (const file of files) {
      variantsCopy[index].images.push(file);
    }

    setVariants(variantsCopy);
  };

  const handleVersionChange = (index, indexTemp, event) => {
    setMoreVariants(variants[index].moreVariants[indexTemp].version = event.target.value);
  };

  const handlePriceChange = (index, indexTemp, event) => {
    setMoreVariants(variants[index].moreVariants[indexTemp].price = event.target.value);
  };

  const handleQuantityChange = (index, indexTemp, event) => {
    setMoreVariants(variants[index].moreVariants[indexTemp].quantity = event.target.value);
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

  const handleMoreVariantDeletion = (index, indexTemp) => {
    setMoreVariants(variants[index]?.moreVariants.splice(indexTemp, 1))
  };

  const displayMoreVariants = (index) => {
    return (
      variants[index].moreVariants?.map((variant, indexTemp) => (
        <div key={indexTemp} className="relative border border-gray-300 rounded-lg m-4">
          <div className="border-b border-gray-300 my-2">
            <div className='absolute top-0 right-0'>
              <IconButton>
                <HighlightOffIcon onClick={(e) => handleMoreVariantDeletion(index, indexTemp)} />
              </IconButton>
            </div>
            <div className='p-2 font-sans font-bold'>
              <h4>Variant {indexTemp + 1}</h4>
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
                value={variant.version}
                onChange={(event) => handleVersionChange(index, indexTemp, event)}
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
                value={variant.price}
                onChange={(event) => handlePriceChange(index, indexTemp, event)}
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
                value={variant.quantity}
                onChange={(event) => handleQuantityChange(index, indexTemp, event)}
              />
            </div>
          </div>
        </div>
      )
    ))
  }

  const displayPreview = variants?.map((variant, index) => {
    return (
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
              value={variant.color}
              onChange={(event) => handleColorChange(index, event)}
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
              onChange={(event) => handleFileUpload(index, event)}
            />
          </div>
        </div>

        <div className="w-full mx-auto">
          <div className='relative flex mt-4 justify-center space-x-6'>
            {variant?.images?.map((image, imageIndex) => (
              <div key={imageIndex} className='relative'>
                <div className='h-36 w-36 m-auto relative group border-dashed border-2 border-gray-300 rounded-xl'>
                  <img src={image} alt="Preview" className='w-full h-full rounded-xl bg-center bg-cover ' />
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

        {displayMoreVariants(index)}

        <div className='m-4'>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => handleAddMoreVariant(index)}
          >Create variant</Button>
        </div>
      </div>
    )
  })

  const clearState = () => {
    setWatch({
      screenSize: "",
      weight: "",
      batteryCapacity: "",
    });

    setData({
      productName: "",
      description: "",
    });

    setSelectedValue("");
    setVariants([]);
    setMoreVariants([]);
    close();
  }

  const choseValue = async (value) => {
    const category = await getCategory(value);
    const showValue = category.data.data;
    switch (showValue.categoryName) {
      case "Laptop":
        return {
          resolution: laptop.resolution,
          cpuNumber: laptop.cpuNumber,
          baseClock: laptop.baseClock,
          dimensions: laptop.dimensions,
          weight: laptop.weight,
          ram: laptop.ram,
          operatingSystem: laptop.operatingSystem
        };
      case "Watch":
        return {
          screenSize: watch.screenSize,
          weight: watch.weight,
          batteryCapacity: watch.batteryCapacity,
        };

      case "Smart phone":
        return {
          screenTech: smartPhone.screenTech,
          resolution: smartPhone.resolution,
          screenSize: smartPhone.screenSize,
          operatingSystem: smartPhone.operatingSystem,
          processor: smartPhone.processor,
          internalMemory: smartPhone.internalMemory,
          ram: smartPhone.ram,
          mobileNetwork: smartPhone.mobileNetwork,
          simSlot: smartPhone.simSlot,
          batteryCapacity: smartPhone.batteryCapacity
        };
      case "Television":
        return {
          resolution: television.resolution,
          screenSize: television.screenSize,
          productType: television.productType,
          port: television.port,
          weight: television.weight
        };
      case "Tablet":
        return {
          screenTech: tablet.screenTech,
          operatingSystem: tablet.operatingSystem,
          processorChip: tablet.processorChip,
          graphicsChip: tablet.graphicsChip,
          wifi: tablet.wifi,
          bluetooth: tablet.bluetooth,
          internalMemory: tablet.internalMemory,
          ram: tablet.ram,
          dimensionsNWeight: tablet.dimensionsNWeight
        };
      default:
        setError({ category: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      productName: data.productName,
      description: data.description,
      category: selectedValue,
      brand: selectedBrandValue,
      productBrand: selectedProductBrandValue,
      variants: variants,
      ...await choseValue(selectedValue)
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

    updatedData.variants = updatedVariants;

    // Create the appropriate product type based on the selected category
    const createProductType = async (productType) => {
      const category = await getCategory(productType);
      const showValue = category.data.data;
      console.log(showValue.categoryName)
      switch (showValue.categoryName) {
        case "Laptop":
          return await createLaptop(updatedData);
        case "Watch":
          return await createWatch(updatedData);
        case "Smart phone":
          return await createSmartPhone(updatedData);
        case "Television":
          return await createTV(updatedData);
        case "Tablet":
          return await createTablet(updatedData);
        default:
          setError({ category: "" });
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
                    value={data.productName}
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
                    {select?.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.categoryName}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="brand"
                      value="Brand"
                    />
                  </div>
                  <Select
                    id="brand"
                    name="brand"
                    required
                    value={selectedBrandValue}
                    onChange={handleBrandSelect}
                  >
                    <option value={"Choose brand"}>
                      Choose brand
                    </option>
                    {selectBrand?.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.brandName}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="productBrand"
                      value="Product of Brand"
                    />
                  </div>
                  <Select
                    id="productBrand"
                    name="productBrand"
                    required
                    value={selectedProductBrandValue}
                    onChange={handleProductBrandSelect}
                  >
                    <option value={"Choose product of brand"}>
                      Choose product of brand
                    </option>
                    {showProductBrand?.variants?.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.name}
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
                  value={data.description}
                  onChange={handleChangeInput}
                />
              </div>

              {
                selectedValue === "" ? ""
                  : selectedValue === "Choose category" ? ""
                    : listCategory?.categoryName === "Watch" ? <Watch data={data?.moreAttribute} setData={setWatch} />
                      : listCategory?.categoryName === "Laptop" ? <Laptop data={data?.moreAttributeaptop} setData={setLaptop} />
                        : listCategory?.categoryName === "Television" ? <Television data={data?.moreAttribute} setData={setTelevision} />
                          : listCategory?.categoryName === "Smart phone" ? <SmartPhone data={data?.moreAttribute} setData={setSmartPhone} />
                            : listCategory?.categoryName === "Tablet" ? <Tablet data={data?.moreAttribute} setData={setTablet} />
                              : ""
              }

              {displayPreview}

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