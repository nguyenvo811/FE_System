import * as React from 'react';
// import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { Combobox, Label, TextInput, Select, Textarea } from 'flowbite-react';
// import { createCategory } from '../../../api/apiServices';

export default function Laptop(props) {

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
							htmlFor="resolution"
							value="Resolution"
						/>
					</div>
					<TextInput
						id="resolution"
						name="resolution"
						placeholder="4K"
						required
						type="text"
						defaultValue={data?.resolution}
						onChange={handleChangeInput}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="cpuNumber"
							value="CPU number"
						/>
					</div>
					<TextInput
						id="cpuNumber"
						name="cpuNumber"
						required
						placeholder="30g"
						type="text"
						defaultValue={data?.cpuNumber}
						onChange={handleChangeInput}
					/>
				</div>
			</div>

			<div className='grid grid-cols-2 gap-2'>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="baseClock"
							value="Base clock"
						/>
					</div>
					<TextInput
						id="baseClock"
						name="baseClock"
						placeholder="Updating"
						required
						type="text"
						defaultValue={data?.baseClock}
						onChange={handleChangeInput}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="operatingSystem"
							value="Operating system"
						/>
					</div>
					<TextInput
						id="operatingSystem"
						name="operatingSystem"
						required
						placeholder="Android 11"
						type="text"
						defaultValue={data?.operatingSystem}
						onChange={handleChangeInput}
					/>
				</div>
			</div>

			<div className='grid grid-cols-2 gap-2'>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="ram"
							value="RAM"
						/>
					</div>
					<TextInput
						id="ram"
						name="ram"
						placeholder="33mm"
						required
						type="text"
						defaultValue={data?.ram}
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
						placeholder="30g"
						type="text"
						defaultValue={data?.weight}
						onChange={handleChangeInput}
					/>
				</div>
			</div>

			<div className='grid gap-2'>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="dimensions"
							value="Dimensions"
						/>
					</div>
					<TextInput
						id="dimensions"
						name="dimensions"
						placeholder="32x44x67"
						required
						type="text"
						defaultValue={data?.dimensions}
						onChange={handleChangeInput}
					/>
				</div>
			</div>
		</>
	);
}