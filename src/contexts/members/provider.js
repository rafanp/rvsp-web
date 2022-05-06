// import { createNewMember } from '@/services/Members';
import { createNewMember } from '@/services/Members';
import {
  useReducer,
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

const MembersContext = createContext();

const defaultMember = {
  name: '',
  child: false,
  attending: false,
};

export function MembersProvider({ children }) {
  const [openMemberDialog, setOpenMemberDialog] = useState(false);
  const [member, setMember] = useState(defaultMember);

  const editMember = async (memberData) => {
    setOpenMemberDialog(true);
    setMember(memberData);
  };

  const clearMember = async () => {
    setMember(defaultMember);
  };

  const changeMember = async (field, data) => {
    // setMember(oldState => {
    //   ...oldState,
    //   [field]: data,
    // });

    setMember((prevState) => ({
      ...prevState,
      [field]: data,
    }));
  };

  const saveMember = async () => {
    console.log('member :', member);
    // await createNewMember(member);
    try {
      await createNewMember(member);
      setOpenMemberDialog(false);
      clearMember();
      console.log('Um');
    } catch (err) {
      alert(err.response.data.message);
      console.log('ERRO SAVE>> ', err.response.data.message);
      console.log('Dois');
    }
  };

  return (
    <MembersContext.Provider
      value={{
        editMember,
        setOpenMemberDialog,
        openMemberDialog,
        member,
        clearMember,
        changeMember,
        saveMember,
        // refreshData,
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
