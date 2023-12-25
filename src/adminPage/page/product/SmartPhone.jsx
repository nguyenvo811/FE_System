import * as React from 'react';
// import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { Combobox, Label, TextInput, Select, Textarea } from 'flowbite-react';
// import { createCategory } from '../../../api/apiServices';

export default function SmartPhone(props) {

	// Declare global variables to create product
	const { data, setData } = props;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<>
			<div className='grid grid-cols-2 gap-2'>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="screenTech"
							value="Screen technology"
						/>
					</div>
					<TextInput
						id="screenTech"
						name="screenTech"
						placeholder="Super Retina XDR"
						required
						type="text"
						defaultValue={data?.screenTech}
						onChange={handleChangeInput}
					/>
				</div>
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
						placeholder="1290 x 2796"
						type="text"
						defaultValue={data?.resolution}
						onChange={handleChangeInput}
					/>
				</div>
			</div>

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
						placeholder="6.7'"
						required
						type="text"
						defaultValue={data?.screenSize}
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
						placeholder="iOS 17"
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
							htmlFor="processor"
							value="Processor"
						/>
					</div>
					<TextInput
						id="processor"
						name="processor"
						placeholder="A17 Pro"
						required
						type="text"
						defaultValue={data?.processor}
						onChange={handleChangeInput}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="internalMemory"
							value="Internal memory"
						/>
					</div>
					<TextInput
						id="internalMemory"
						name="internalMemory"
						required
						placeholder="512GB"
						type="text"
						defaultValue={data?.internalMemory}
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
						placeholder="8GB"
						required
						type="text"
						defaultValue={data?.ram}
						onChange={handleChangeInput}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="mobileNetwork"
							value="Mobile network"
						/>
					</div>
					<TextInput
						id="mobileNetwork"
						name="mobileNetwork"
						required
						placeholder="2G, 3G, 4G, 5G"
						type="text"
						defaultValue={data?.mobileNetwork}
						onChange={handleChangeInput}
					/>
				</div>
			</div>

			<div className='grid grid-cols-2 gap-2'>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="simSlot"
							value="Sim slot"
						/>
					</div>
					<TextInput
						id="simSlot"
						name="simSlot"
						placeholder="Dual SIM (nano SIM and eSIM), Supports two eSIMs"
						required
						type="text"
						defaultValue={data?.simSlot}
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
						placeholder="6500 mAh"
						type="text"
						defaultValue={data?.batteryCapacity}
						onChange={handleChangeInput}
					/>
				</div>
			</div>
		</>
	);
}