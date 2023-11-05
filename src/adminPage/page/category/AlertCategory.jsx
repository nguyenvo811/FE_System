import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Typography from '@mui/joy/Typography';

export default function AlertCategory(props) {

	// Declare global variables to create product
	const { open, close, handleRemove } = props;

	return (
		<React.Fragment>
			<Modal open={open} onClose={close}>
				<ModalDialog
					variant="outlined"
					role="alertdialog"
					aria-labelledby="alert-dialog-modal-title"
					aria-describedby="alert-dialog-modal-description"
				>
					<Typography
						id="alert-dialog-modal-title"
						component="h2"
						startDecorator={<WarningRoundedIcon />}
					>
						Confirmation
					</Typography>
					<Divider />
					<Typography id="alert-dialog-modal-description" className="flex justify-center" textColor="text.tertiary">
						Are you sure you want to discard this category?
					</Typography>
					<Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
						<Button variant="plain" color="neutral" onClick={close}>
							Cancel
						</Button>
						<Button variant="solid" color="danger" onClick={handleRemove}>
							Discard
						</Button>
					</Box>
				</ModalDialog>
			</Modal>
		</React.Fragment>
	);
}