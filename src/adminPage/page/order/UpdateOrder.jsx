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
import { updateCategory, updateOrder } from '../../../api/apiServices';

export default function UpdateOrder(props) {

  // Set dialog size
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  // Declare global variables to create product
  const { open, close, row, data, setData } = props;
  const [status, setStatus] = React.useState("");

  const orderStatus = ["Pending", "Processing", "Shipped", "Delivered"]

  const getProducts = data?.orderDetail?.map((val, index) => {
    const findColor = val?.product?.variants?.map((value) => value)
    const getColor = findColor?.find(value => value._id === val.color)
    const findVersion = getColor?.moreVariants?.map(value => value)
    const getVersion = findVersion?.find(value => value._id === val.version)
    return (
      <>
        <div className="grid w-full sm:grid-cols-5 gap-2 my-2 break-all justify-between md:items-center">
          <div>
            <p className="max-sm:hidden font-medium text-sm">Product name</p>
            <span className="text-gray-700">{val?.product?.productName}</span>
          </div>
          <div>
            <p className="max-sm:hidden font-medium text-sm">Color</p>
            <span className="text-gray-700">{getColor.color}</span>
          </div>
          <div>
            <p className="max-sm:hidden font-medium text-sm">Version</p>
            <span className="text-gray-700">{getVersion.version}</span>
          </div>
          <div>
            <p className="max-sm:hidden font-medium text-sm">Quantity</p>
            <span className="text-gray-700">{val.quantity}</span>
          </div>
          <div>
            <p className="max-sm:hidden font-medium text-sm">Price</p>
            <span className="text-gray-700">{getVersion.price}</span>
          </div>
        </div>
      </>
    )
  })

  // const listProductDetail = product?.variants?.map(val => { return val._id });
  // const defaultColor = listProductDetail?.find((id) => { return id === selectValue?._id });

  React.useEffect(() => {
    setStatus(data.status)
  }, [data.status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      status: status
    }

    await updateOrder(data._id, updatedData)
      .then((response) => {
        row(response.data.data.value);
        close()
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
                        htmlFor="_id"
                        value="Order ID"
                      />
                    </div>
                    <span className="text-gray-700">{data._id}</span>
                  </div>
                </div>
              <div className='my-2 grid grid-cols-2 gap-2'>
              <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="status"
                      value="Status"
                    />
                  </div>
                  <Select
                    id="status"
                    name="status"
                    required
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {orderStatus?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="totalPrice"
                      value="Total"
                    />
                  </div>
                  <span className="text-gray-700">{data.totalPrice}</span>
                </div>
              </div>

              <div className='my-2 grid grid-cols-2 gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="username"
                      value="Full name"
                    />
                  </div>
                  <span className="text-gray-700">{data.username}</span>
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="phoneNumber"
                      value="Phone number"
                    />
                  </div>
                  <span className="text-gray-700">{data.phoneNumber}</span>
                </div>
              </div>

              <div className='my-2 grid gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="shippingAddress"
                      value="Shipping address"
                    />
                  </div>
                  <span className="text-gray-700">{data.shippingAddress}</span>
                </div>
              </div>

              <div className='my-2 grid gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="note"
                      value="Note"
                    />
                  </div>
                  <span className="text-gray-700">{data.note}</span>
                </div>
              </div>

              <div className='my-2 grid grid-cols-2 gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="createdAt"
                      value="Created at"
                    />
                  </div>
                  <span className="text-gray-700">{data.createdAt}</span>
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="updatedAt"
                      value="Updated at"
                    />
                  </div>
                  <span className="text-gray-700">{data.updatedAt}</span>
                </div>
              </div>

              <div className='my-2 grid gap-2'>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="orderDetail"
                      value="Order detail"
                    />
                  </div>
                  {getProducts}
                </div>
              </div>

            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="inherit" onClick={close}>
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