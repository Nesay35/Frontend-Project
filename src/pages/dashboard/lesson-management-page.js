import React, { useState } from "react";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import { Tab, Tabs } from "react-bootstrap";
import EducationTermList from "../../components/dashboard/lesson-management/education-term-list";
import NewEducationTermForm from "../../components/dashboard/lesson-management/new-education-term-form";
import { useSelector } from "react-redux";

const LessonManagementPage = () => {
    const [key, setKey] = useState('terms');
    const { currentOperation } = useSelector(state => state.misc);
    return (
        <>
            <PageHeader title="Lesson Management" />
            <Spacer />
            <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
                fill={true}
            >
                <Tab eventKey="terms" title="Education Terms">
                    <Spacer height={30} />
                    {currentOperation === "new" && <><NewEducationTermForm /><Spacer /></>}
                    <EducationTermList />
                </Tab>
                <Tab eventKey="lessons" title="Lessons">
                    <Spacer height={30} />
                    
                </Tab>
                <Tab eventKey="programs" title="Lesson Programs">
                    Tab content for Contact
                </Tab>
            </Tabs>
        </>
    );
};
export default LessonManagementPage;
