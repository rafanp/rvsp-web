import { useFamilies } from '@/contexts/families/provider';
import {
  Button,
  Checkbox,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MembersField = () => {
  const {
    openFamilyDialog,
    setOpenFamilyDialog,
    familyForm,
    clearFamily,
    changeMember,
    saveFamily,
    addNewMemberField,
    removeMemberField,
  } = useFamilies();

  const handleTextfield = (index, event) => {
    const { name, value } = event.target;
    changeMember(index, name, value);
  };

  const handleCheckbox = (index, event) => {
    changeMember(index, event.target.name, event.target.checked);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs="8">
          <Typography>Member name</Typography>
        </Grid>
        <Grid item xs="1">
          <Typography>Child</Typography>
        </Grid>
        <Grid item xs="1">
          <Typography>Attending</Typography>
        </Grid>
      </Grid>
      {familyForm.members.map((member, index) => {
        return (
          <Grid container spacing={2} key={index}>
            <Grid item xs="8">
              <TextField
                id="name"
                name="name"
                onChange={(e) => handleTextfield(index, e)}
                value={member.name}
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs="1">
              <Checkbox
                onChange={(e) => handleCheckbox(index, e)}
                name="child"
                id="child"
              />
            </Grid>
            <Grid item xs="1">
              <Checkbox
                onChange={(e) => handleCheckbox(index, e)}
                name="attending"
                id="attending"
              />
            </Grid>
            <Grid item xs="2" justifyContent="right">
              <IconButton onClick={() => removeMemberField(index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
      <Button onClick={() => addNewMemberField()}>Add new member</Button>
    </div>
  );
};

export default MembersField;
