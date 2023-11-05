import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { getAdminsByPage } from "../../../api/admin-service";
import { FaTimes } from "react-icons/fa";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";


const AdminList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 3,
    page: 0,
    sortField: null,
    sortOrder: null,
});
  console.log(users);
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
  const getOperationButtons = (row) => {
    if (row.built_in) return null;
    return (
      <div>
        <Button className="btn-link">
          <FaTimes />
        </Button>
      </div>
    );
  };
  useEffect(() => {
    loadData(lazyState.page);
  }, [lazyState]);
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <span>Admin List</span>
            <Button>New Admin</Button>
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
