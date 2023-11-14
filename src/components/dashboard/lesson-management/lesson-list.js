import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setListRefreshToken, setOperation } from "../../../store/slices/misc-slice";
import { swalAlert, swalConfirm } from "../../../helpers/functions/swal";
import { deleteLesson, getLessonsByPage } from "../../../api/lesson-service";


const LessonList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const dispatch = useDispatch();
  const { listRefreshToken } = useSelector(state=> state.misc);
  
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 0,
    sortField: null,
    sortOrder: null,
});
  const onPage = (event) => {
    setlazyState(event);
    };
  const loadData = async (page) => {
    try {
      const resp = await getLessonsByPage(page, lazyState.rows);
      setList(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => { 
    const resp = await swalConfirm("Are you sure to delete?")  ;
    if(!resp.isConfirmed) return;
    setLoading(true);
    try {
      await deleteLesson(id);
      dispatch(setListRefreshToken(Math.random()));
      swalAlert("Lesson was deleted", "success");
    } catch (err) {
      console.log(err)
    }
    finally{
      setLoading(false);
    }
  }
  const getOperationButtons = (row) => {
    if (row.built_in) return null;
    return (
      <div>
        <Button className="btn-link" onClick={()=> handleDelete(row.lessonId)}>
          <FaTimes />
        </Button>
      </div>
    );
  };
  const handleNewRecord = () => { 
    dispatch(setOperation("new"));
  }
  useEffect(() => {
    loadData(lazyState.page);
    // eslint-disable-next-line
  }, [lazyState, listRefreshToken]);
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <span>Lesson List</span>
            <Button onClick={handleNewRecord}>New Lesson</Button>
          </Card.Title>
          <DataTable
            lazy
            dataKey="lessonId"
            value={list}
            paginator
            rows={lazyState.rows}
            totalRecords={totalRows}
            loading={loading}
            first={lazyState.first}
            onPage={onPage}
          >
            <Column field="lessonName" header="Name"></Column>
            <Column field="creditScore" header="Credit"></Column>
            <Column field="compulsory" header="Compulsory"></Column>
            <Column body={getOperationButtons} headerStyle={{width: "120px"}}></Column>
          </DataTable>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default LessonList;