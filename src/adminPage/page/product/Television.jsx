import * as React from 'react';
// import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { Combobox, Label, TextInput, Select, Textarea } from 'flowbite-react';
// import { createCategory } from '../../../api/apiServices';

export default function Television(props) {

	// Declare global variables to create product
	const { data, setData } = props;

	const handleChangeInput = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

	return (
		<>
			<div className='grid grid-cols-2 gap-2'>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="screenSize"
							value="Screen size"
						/>
					</div>
					<TextInput
						id="screenSize"
						name="screenSize"
						placeholder="65'"
						required
						type="text"
						value={data.screenSize}
						onChange={handleChangeInput}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="weight"
							value="Weight"
						/>
					</div>
					<TextInput
						id="weight"
						name="weight"
						required
						placeholder="With stand: 16kg"
						type="text"
						value={data.weight}
						onChange={handleChangeInput}
					/>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-2'>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="resolution"
							value="Resolution"
						/>
					</div>
					<TextInput
						id="resolution"
						name="resolution"
						required
						placeholder="4K"
						type="text"
						value={data.resolution}
						onChange={handleChangeInput}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="productType"
							value="Product type"
						/>
					</div>
					<TextInput
						id="productType"
						name="productType"
						required
						placeholder="SMART 4K TV"
						type="text"
						value={data.productType}
						onChange={handleChangeInput}
					/>
				</div>
			</div>
			<div className='grid gap-2'>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="port"
							value="Port"
						/>
					</div>
					<TextInput
						id="port"
						name="port"
						required
						placeholder="HDMI x 3 (1 port with eARC), USB 2.0 x 2, Ethernet (LAN) x 1, CI Slot x 1, 3.5mm Headphone port x 1"
						type="text"
						value={data.port}
						onChange={handleChangeInput}
					/>
				</div>
			</div>
		</>
	);
}