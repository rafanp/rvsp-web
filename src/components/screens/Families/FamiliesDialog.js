import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useFamilies } from '@/contexts/families/provider';
import { Grid, Input, Stack, Typography } from '@mui/material';
import MembersField from './FamiliesDialog/MembersFields';

const FamiliesDialog = () => {
  const {
    openFamilyDialog,
    setOpenFamilyDialog,
    familyForm,
    clearFamilyData,
    changeFamily,
    saveFamily,
  } = useFamilies();

  const handleClickOpen = () => {
    setOpenFamilyDialog(true);
  };

  const handleClose = () => {
    setOpenFamilyDialog(false);
    clearFamilyData();
  };

  const handleTextfield = (event) => {
    changeFamily(event.target.name, event.target.value);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Create a new Family</Button>
      <Dialog
        open={openFamilyDialog}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {familyForm.id ? 'Edit Family' : 'Create new Family'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new family or edit a existing family.
          </DialogContentText>
          <Stack spacing={4}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Name"
              onChange={handleTextfield}
              value={familyForm.name}
              fullWidth
              variant="standard"
            />
            <MembersField />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFamily}>
            {familyForm.id ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FamiliesDialog;
