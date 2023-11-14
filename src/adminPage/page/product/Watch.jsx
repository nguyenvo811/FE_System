import * as React from 'react';
// import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { Combobox, Label, TextInput, Select, Textarea } from 'flowbite-react';
// import { createCategory } from '../../../api/apiServices';

export default function Watch(props) {

	// Declare global variables to create product
	const { data, setData } = props;

	const handleChangeInput = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

	return (
		<>
			<div className='grid grid-cols-3 gap-2'>
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
						placeholder="33mm"
						required
						type="text"
						value={data?.screenSize}
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
						value={data?.weight}
						onChange={handleChangeInput}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="batteryCapacity"
							value="Battery capacity"
						/>
					</div>
					<TextInput
						id="batteryCapacity"
						name="batteryCapacity"
						required
						placeholder="400mAh"
						type="text"
						value={data?.batteryCapacity}
						onChange={handleChangeInput}
					/>
				</div>
			</div>
		</>
	);
}