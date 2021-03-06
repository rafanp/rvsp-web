// import { createNewMember } from '@/services/Members';
import {
  createNewMember,
  listAllMembers,
  updateMember,
  deleteMember as deleteMemberApi,
} from '@/services/Members';
import swr from '@/services/swr';
import {
  useReducer,
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useMatchMutate } from 'src/hooks/useMatchMutate';

const MembersContext = createContext();

const defaultMember = {
  name: '',
  child: false,
  attending: false,
  family_id: null,
};

export function MembersProvider({ children }) {
  const [openMemberDialog, setOpenMemberDialog] = useState(false);
  const [memberData, setMemberData] = useState(defaultMember);

  const matchMutate = useMatchMutate();

  const editMember = async (memberData) => {
    setOpenMemberDialog(true);
    setMemberData(memberData);
  };

  const clearMemberData = async () => {
    setMemberData(defaultMember);
  };

  const changeMember = async (field, data) => {
    // setMemberData(oldState => {
    //   ...oldState,
    //   [field]: data,
    // });

    setMemberData((prevState) => ({
      ...prevState,
      [field]: data,
    }));
  };

  const saveMember = async () => {
    // console.log('memberData :', memberData);
    // await createNewMember(memberData);
    try {
      if (memberData.id) {
        await updateMember(memberData);
      } else {
        await createNewMember(memberData);
      }
      setOpenMemberDialog(false);
      clearMemberData();
      refreshData();
    } catch (err) {
      alert(err.message);
      // console.log('ERRO SAVE>> ', err.message);
      // console.log('Dois');
    }
  };

  const deleteMember = async (member) => {
    try {
      await deleteMemberApi(member.id);
      refreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  const refreshData = async () => {
    matchMutate(/members/);
  };

  return (
    <MembersContext.Provider
      value={{
        editMember,
        setOpenMemberDialog,
        openMemberDialog,
        memberData,
        clearMemberData,
        changeMember,
        saveMember,
        deleteMember,
        refreshData,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
}

export function useMembers() {
  const context = useContext(MembersContext);

  return context;
}
