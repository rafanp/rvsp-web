import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useMembers } from '@/contexts/members/provider';

export default function MembersDialog() {
  const {
    openMemberDialog,
    setOpenMemberDialog,
    memberData,
    clearMember,
    changeMember,
    saveMember,
  } = useMembers();

  const handleClickOpen = () => {
    setOpenMemberDialog(true);
  };

  const handleClose = () => {
    setOpenMemberDialog(false);
    clearMember();
  };

  const handleCheckbox = (event) => {
    console.log('event :', event);
    changeMember(event.target.name, event.target.checked);
  };

  const handleTextfield = (event) => {
    changeMember(event.target.name, event.target.value);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Create a new Member</Button>
      <Dialog
        open={openMemberDialog}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {memberData.id ? 'Edit Member' : 'Create new Member'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new member or edit a existing member.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            onChange={handleTextfield}
            value={memberData.name}
            fullWidth
            variant="standard"
          />
          <FormControl fullWidth margin="dense" variant="standard">
            <InputLabel id="family">Family</InputLabel>
            <Select labelId="family" id="family" label="Family">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={memberData.child}
                onChange={handleCheckbox}
                name="child"
                id="child"
              />
            }
            label="Is a child?"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={memberData.attending}
                onChange={handleCheckbox}
                name="attending"
              />
            }
            label="Attending?"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveMember}>
            {memberData.id ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
