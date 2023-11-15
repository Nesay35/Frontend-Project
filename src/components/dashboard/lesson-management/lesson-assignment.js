import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";


import { getUnassignedPrograms } from "../../../api/lesson-program-service";
import { useSelector } from "react-redux";
import { getAllTeachers } from "../../../api/teacher-service";



const LessonAssignment = () => {
  const [list, setList] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  
 
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
            <span>Lesson Program List</span>
          </Card.Title>
          <DataTable
            lazy
            dataKey="lessonProgramId"
            value={list}
            loading={loading}
           
          >
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
                  <Form.Select aria-label="Default select example" >
                  
                    <option>Select Teacher</option>
                    {teachers.map( item => <option value={item.userId}>{item.name} {item.surname}</option> )}
                  </Form.Select>
                 
                </FloatingLabel>
            </Col>
            <Col md={2}>
                <Button variant="success" size="lg">Assign</Button>
            </Col>
          </Row>

        </Card.Body>
      </Card>
    </Container>
  );
};
export default LessonAssignment;