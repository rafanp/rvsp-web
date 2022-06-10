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
import useSWRInfinite from 'swr/infinite';
import ReactSelect from '@/components/UI/Selects/ReactSelect';
import AsyncSelect from '@/components/UI/Selects/AsyncSelect';
import loadFamilies from '@/components/UI/Selects/loadFamilies';

const getKey = (pageIndex, previousPageData) => {
  if (
    previousPageData &&
    previousPageData.currentPage > previousPageData.lastPage
  )
    return null;
  // if (previousPageData && !previousPageData.length) return null; // reached the end
  return {
    url: `/families/with/members`,
    params: { page: pageIndex, pageSize: PAGE_SIZE },
  }; // SWR key
};

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function MembersDialog() {
  const {
    data: families,
    error,
    size,
    setSize,
    isValidating,
    mutate,
  } = useSWRInfinite(getKey);
  const {
    openMemberDialog,
    setOpenMemberDialog,
    memberData,
    clearMemberData,
    changeMember,
    saveMember,
  } = useMembers();

  const handleClickOpen = () => {
    setOpenMemberDialog(true);
  };

  const handleClose = () => {
    setOpenMemberDialog(false);
    clearMemberData();
  };

  const handleCheckbox = (event) => {
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
          {/*           <FormControl fullWidth margin="dense" variant="standard">
            <InputLabel id="family">Family</InputLabel>

            <AsyncSelect method={loadFamilies} />

            <ReactSelect
              name="family_id"
              options={options}
              defaultValue={memberData.family_id}
              onChange={(e) => changeMember('family_id', e.value)}
            />
          </FormControl> */}

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
