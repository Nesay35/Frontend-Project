import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getUnassignedPrograms } from "../../../api/lesson-program-service";
import { useSelector } from "react-redux";
import { chooseLesson, getAllTeachers } from "../../../api/teacher-service";
import { swalAlert } from "../../../helpers/functions/swal";
import { setListRefreshToken } from "../../../store/slices/misc-slice";



const LessonAssignment = () => {
  const [list, setList] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrograms, setSelectedPrograms] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const { listRefreshToken } = useSelector(state=> state.misc);
  
  
  
  const loadPrograms = async () => {
    try {
      const data = await getUnassignedPrograms();
      setList(data);
      
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadTeachers = async () => {
    try {
      const data = await getAllTeachers();
      setTeachers(data);
      
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getLessonNames = (row) => {
    return row.lessonName.map(item => item.lessonName).join("-")
  }

  const assignTeacherPrograms =async () => {
    setLoading(true);
    try {
        if(!selectedTeacher) throw new Error("Select a teacher");
        if(!selectedPrograms || selectedPrograms.length <= 0 ) throw new Error("Select at least a program");
        
        const payload = {
            lessonProgramId: selectedPrograms.map(item => item.lessonProgramId),
            teacherId : selectedTeacher     
        }

        await chooseLesson(payload);
        dispatchEvent(setListRefreshToken(Math.random()));
        swalAlert("The programs was assigned", "success");

        const data = await getAllTeachers();
        setTeachers(data);   
      } catch (err) {
        console.log(err);

        const errMsg = err.message || err.response.data.message;
        swalAlert(errMsg, "error");
      } finally {
        setLoading(false);
      }
  }
  
  useEffect(() => {
    loadPrograms();
    loadTeachers();
    // eslint-disable-next-line
  }, [listRefreshToken]);
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <span>Unassigned Lesson Program List</span>
          </Card.Title>
          <DataTable
            lazy
            dataKey="lessonProgramId"
            value={list}
            loading={loading}
            selection = {selectedPrograms}
            onSelectionChange={(e) => setSelectedPrograms(e.value)}
          >
            <Column selectionMode="multiple"/>
            <Column body={getLessonNames} header="lessons"></Column>
            <Column field="day" header="day"></Column>
            <Column field="startTime" header="Start Time"></Column>
            <Column field="stopTime" header="Stop Time"></Column>
          </DataTable>

          <Row>
            <Col md={10}>
            <FloatingLabel 
                  controlId="term"
                  label="Term"
                  className="mb-3"
                >
                  <Form.Select aria-label="Default select example"
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                  >
                  
                    <option value="">Select Teacher</option>
                    {teachers.map( item => <option value={item.userId} key={item.userId}>{item.name} {item.surname}</option> )}
                  </Form.Select>
                 
                </FloatingLabel>
            </Col>
            <Col md={2}>
                <Button variant="success" size="lg" onClick={assignTeacherPrograms}>Assign</Button>
            </Col>
          </Row>

        </Card.Body>
      </Card>
    </Container>
  );
};
export default LessonAssignment;