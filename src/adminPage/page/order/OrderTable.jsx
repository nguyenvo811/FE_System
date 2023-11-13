import { Breadcrumb } from "flowbite-react";
import { HiHome, HiPencilAlt, HiTrash } from "react-icons/hi";
import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteOrder, getOrders, removeCategory } from "../../../api/apiServices";
import AlertOrder from "./AlertOrder";
import UpdateOrder from "./UpdateOrder";

export default function OrderTable() {
	return (
		<>
			<div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
				<div className="mb-1 w-full">
					<div className="mb-4 pt-16">
						<h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
							ORDER LIST
						</h1>
						<Breadcrumb className="mb-4">
							<Breadcrumb.Item href="#">
								<div className="flex items-center gap-x-3">
									<HiHome className="text-xl" />
									<span className="dark:text-white">Home</span>
								</div>
							</Breadcrumb.Item>
							<Breadcrumb.Item>Order list</Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="overflow-x-auto">
					<div className="min-w-full align-middle">
						<div className="overflow-hidden mx-4 mt-4">
							<Table />
						</div>
					</div>
				</div>
			</div> 
		</>
	)
}

const Table = function() {

	// Add product dialog
	const [openUpdate, setOpenUpdate] = React.useState(false);
	const [openAlert, setOpenAlert] = React.useState(false);
	const [rows, setRows] = React.useState("");

	const [data, setData] = React.useState([]);
	const apiRef = React.useRef(null);

	React.useEffect(() => {
    getOrders()
      .then(res => {
        setData(res.data.data)
        console.log(res.data.data)
      })
      .catch(err => {
        console.log(err); 
      }) 
  }, [])

	// Update the row.
	const updateRow = (value) => {
		const index = data.findIndex((p) => p._id === value._id);
		if (index !== -1) {
			const updatedData = [...data];
			updatedData[index] = value;
			setData(updatedData);
		} else {
			setData([...data, value]);
		}
  };

  // Delete the row.
  const removeRow = () => {
		const updatedRows = data.filter(row => row._id !== rows.row._id);
    deleteOrder(rows?.row._id)
		.then((response) => { 
      setData(updatedRows);
    	apiRef.current.updateRows(updatedRows);
    })
    .catch((err)=>{
      console.log(err)
    })  
    setOpenAlert(false)
  };

	// Call data
	const columns = React.useMemo(() => [
		{
      field: 'actions',
      headerName: 'Actions',
			width: 100,
      renderCell: (params) => {
        return (
          <div>
						<IconButton 
							aria-label="update"
							onClick={() => {return setOpenUpdate(true), setRows(params.row)}}
						>
							<EditIcon />
						</IconButton>
						<IconButton 
							aria-label="delete"
							onClick={() => {return setOpenAlert(true), setRows(params)}}
						>
							<DeleteIcon />
						</IconButton>
          </div>
        );
      },
    },
		{ field: '_id', headerName: 'ID', width: 100, },
    { field: 'username', headerName: 'Full name', width: 200, },
    { field: 'phoneNumber', headerName: 'Phone number', width: 150 },
		{ field: 'totalPrice', headerName: 'Total price', width: 100, },
    { field: 'status', headerName: 'Status', width: 100, },
		{ 
			field: 'user', 
			headerName: 'Create by',
			width: 200,
			valueGetter: (params) => params.row?.user.fullName,
		},
  ], []);

	return (
		<>
			<div className="flex justify-center">
				<div style={{ height: 600, width: '100%' }}>
				<DataGrid
					rows={data}
					columns={columns}
					getRowId={(row) => row._id}
					slots={{
						toolbar: GridToolbar,
					}}
					
					/>
				</div>
			</div>
			<UpdateOrder open={openUpdate} close={() => setOpenUpdate(false)} row={updateRow} data={rows} setData={setRows} />
			<AlertOrder open={openAlert} close={() => setOpenAlert(false)} handleRemove={() => removeRow()}/>
		</>
	)
}