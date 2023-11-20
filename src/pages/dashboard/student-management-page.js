import React from 'react'
import PageHeader from '../../components/common/page-header'
import Spacer from '../../components/common/spacer'
import { useSelector } from 'react-redux'
import StudentList from '../../components/dashboard/student-management/student-list';
import NewStudentForm from '../../components/dashboard/student-management/new-student-form';



const StudentManagementPage = () => {
  const {currentOperation} = useSelector(state => state.misc);

  return (
    <>
        <PageHeader title="Student Management"/>
        <Spacer/>
        {currentOperation==="new" && <><NewStudentForm/><Spacer/></>}
        {/*currentOperation==="edit" && <><EditTeacherForm/><Spacer/></>*/}
        <StudentList/>
        <Spacer/>
    </>
  );
};

export default StudentManagementPage
