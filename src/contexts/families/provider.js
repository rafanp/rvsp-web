import {
  useReducer,
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { createFamilyWithMembers } from '@/services/Families';
import { mutate } from 'swr';

const FamiliesContext = createContext();

const defaultMember = {
  name: '',
  attending: false,
  child: false,
};

const defaultFamily = {
  name: '',
  members: [defaultMember],
};

export function FamiliesProvider({ children }) {
  const [openFamilyDialog, setOpenFamilyDialog] = useState(false);
  const [familyForm, setFamilyForm] = useState(defaultFamily);

  // const editFamily = async (familyForm) => {
  //   setOpenFamilyDialog(true);
  //   setFamilyForm(familyForm);
  // };

  const clearFamilyData = async () => {
    setFamilyForm(defaultFamily);
  };

  const changeFamily = async (field, data) => {
    setFamilyForm((prevState) => ({
      ...prevState,
      [field]: data,
    }));
  };

  const changeMember = async (index, field, data) => {
    const updatedForm = { ...familyForm };
    updatedForm.members[index] = {
      ...updatedForm.members[index],
      [field]: data,
    };

    setFamilyForm(updatedForm);
  };

  const addNewMemberField = async () => {
    setFamilyForm((prevState) => ({
      ...prevState,
      members: [...prevState.members, defaultMember],
    }));
  };

  const removeMemberField = async (index) => {
    const removedForm = { ...familyForm };
    removedForm.members.splice(index, 1);
    setFamilyForm(removedForm);
  };

  const saveFamily = async () => {
    try {
      if (familyForm.id) {
        await updateFamily(familyForm);
      } else {
        await createFamilyWithMembers(familyForm);
      }
      setOpenFamilyDialog(false);
      clearFamilyData();
      refreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  // const deleteFamily = async (family) => {
  //   try {
  //     await deleteFamilyApi(family.id);
  //     refreshData();
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };

  const refreshData = async () => {
    mutate('/families/with/members');
  };

  return (
    <FamiliesContext.Provider
      value={{
        // editFamily,
        setOpenFamilyDialog,
        openFamilyDialog,
        familyForm,
        changeMember,
        clearFamilyData,
        changeFamily,
        addNewMemberField,
        removeMemberField,
        saveFamily,
        // deleteFamily,
        // refreshData,
      }}
    >
      {children}
    </FamiliesContext.Provider>
  );
}

export function useFamilies() {
  const context = useContext(FamiliesContext);

  return context;
}
