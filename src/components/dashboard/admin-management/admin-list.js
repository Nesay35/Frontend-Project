import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { deleteAdmin, getAdminsByPage } from "../../../api/admin-service";
import { FaTimes } from "react-icons/fa";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch } from "react-redux";
import { setOperation } from "../../../store/slices/misc-slice";
import { swalAlert, swalConfirm } from "../../../helpers/functions/swal";


const AdminList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const dispatch = useDispatch();
  
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
      const resp = await getAdminsByPage(page, lazyState.rows);
      console.log(resp);
      setUsers(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const getFullName = (row) => {
    return `${row.name} ${row.surname}`;
  };

  const handleDelete = async (id) => {
     const resp = await swalConfirm("Are you sure to delete?");
     if(!resp.isConfirmed) return;
     try {
      await deleteAdmin(id);
      swalAlert("Admin was deleted", "success");
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
        <Button className="btn-link"  onClick={() => handleDelete(row.id)}>
          <FaTimes />
        </Button>
      </div>
    );
  };

  const handleNewAdmin = () => {
    dispatch(setOperation("new"));
  }
  useEffect(() => {
    loadData(lazyState.page);
    // eslint-disable-next-line
  }, [lazyState]);
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <span>Admin List</span>
            <Button onClick={handleNewAdmin}>New Admin</Button>
          </Card.Title>
          <DataTable
            lazy
            dataKey="id"
            value={users}
            paginator
            rows={lazyState.rows}
            totalRecords={totalRows}
            loading={loading}
            first={lazyState.first}
            onPage={onPage}
          >
          <Column body={getFullName} header="Name"></Column>
            <Column field="gender" header="Gender"></Column>
            <Column field="phoneNumber" header="Phone Number"></Column>
            <Column field="ssn" header="SSN"></Column>
            <Column field="username" header="User Name"></Column>
            <Column body={getOperationButtons}></Column>
          </DataTable>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default AdminList
