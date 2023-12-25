import * as React from 'react';
// import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { Combobox, Label, TextInput, Select, Textarea } from 'flowbite-react';
// import { createCategory } from '../../../api/apiServices';

export default function Tablet(props) {

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
							htmlFor="processorChip"
							value="Processor chip"
						/>
					</div>
					<TextInput
						id="processorChip"
						name="processorChip"
						required
						placeholder="Kirin 710A"
						type="text"
						defaultValue={data?.processorChip}
						onChange={handleChangeInput}
					/>
				</div>
			</div>

			<div className='grid grid-cols-2 gap-2'>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="graphicsChip"
							value="Graphics Chip"
						/>
					</div>
					<TextInput
						id="graphicsChip"
						name="graphicsChip"
						placeholder="Mali-G57"
						required
						type="text"
						defaultValue={data?.graphicsChip}
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
							htmlFor="wifi"
							value="Wi-fi"
						/>
					</div>
					<TextInput
						id="wifi"
						name="wifi"
						placeholder="Wi-Fi 802.11 a/b/g/n/ac, Dual-band"
						required
						type="text"
						defaultValue={data?.wifi}
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
							htmlFor="bluetooth"
							value="Bluetooth"
						/>
					</div>
					<TextInput
						id="bluetooth"
						name="bluetooth"
						required
						placeholder="v5.1, LE"
						type="text"
						defaultValue={data?.bluetooth}
						onChange={handleChangeInput}
					/>
				</div>
			</div>

			<div className='grid grid-cols-2 gap-2'>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="dimensionsNWeight"
							value="Dimensions and weight"
						/>
					</div>
					<TextInput
						id="dimensionsNWeight"
						name="dimensionsNWeight"
						placeholder="H 250.6 mm - W 174.1 mm - D 7.5 mm - Weight 487 g"
						required
						type="text"
						defaultValue={data?.dimensionsNWeight}
						onChange={handleChangeInput}
					/>
				</div>
			</div>
		</>
	);
}