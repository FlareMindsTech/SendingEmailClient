import React, { useEffect, useState } from 'react';
import {
    MDBContainer,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBBtn,
    MDBIcon,
    MDBBadge,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';


const UserModule = () => {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        fetch('https://sendingemailserver01.onrender.com/api/emails')
            .then(res => res.json())
            .then(data => setEmails(data))
            .catch(err => console.error(err));
    }, []);
    console.log(emails);
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this mail?")) return;

        try {
            const response = await fetch(`http://localhost:5000/api/emails/${id}`, {
                method: 'DELETE',
            });

            const result = await response.json();
            if (response.ok) {
                alert("Mail deleted successfully");
                // Remove deleted mail from state
                setEmails((prev) => prev.filter(mail => mail._id !== id));
            } else {
                alert(`Failed to delete: ${result.message}`);
            } 
        } catch (error) {
            console.error("Delete error:", error);
            alert("Something went wrong while deleting.");
        }
    };


    return (
        <MDBContainer fluid className="py-4 px-5">
            <MDBRow className="mb-4">
                <MDBCol size="6">
                    <h3 className="fw-bold text-primary">📧 Emails Management</h3>
                </MDBCol>
                <MDBCol size="6" className="text-end">
                    <Link to="/dashboard/composemail">
                        <MDBBtn className="rounded-pill">
                            <MDBIcon fas icon="plus" className="me-2" />
                            Compose Mail
                        </MDBBtn>
                    </Link>
                </MDBCol>
            </MDBRow>


            <MDBTable align="middle" bordered hover responsive>
                <MDBTableHead light>
                    <tr className="text-primary">
                        <th>No</th>
                        <th>Date & Time</th>
                        <th>To</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Scheduled At</th>
                        <th>Sent At</th>
                        <th className="text-center">Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {emails.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="text-center text-muted">
                                No email records found
                            </td>
                        </tr>
                    ) : (
                        emails.map((mail, index) => (
                            <tr key={mail._id}>
                                <td>{index + 1}</td>
                                <td>{new Date(mail.createdAt).toLocaleString()}</td>
                                <td>{mail.to}</td>
                                <td>{mail.subject}</td>
                                <td>
                                    <MDBBadge color={mail.status === 'sent' ? 'success' : 'warning'} pill>
                                        {mail.status}
                                    </MDBBadge>
                                </td>
                                <td>{mail.scheduledAt ? new Date(mail.scheduledAt).toLocaleString() : '-'}</td>
                                <td>{mail.sentAt ? new Date(mail.sentAt).toLocaleString() : '-'}</td>
                                <td className="text-center">
                                    {/* <MDBIcon
                    fas
                    icon="eye"
                    className="text-primary me-3"
                    title="View"
                    style={{ cursor: 'pointer' }}
                  /> */}
                                    <MDBBtn
                                        color='danger'
                                        size='sm'
                                        onClick={() => handleDelete(mail._id)}
                                    >
                                        Delete
                                    </MDBBtn>

                                </td>
                            </tr>
                        ))
                    )}
                </MDBTableBody>
            </MDBTable>
        </MDBContainer>
    );
};

export default UserModule;
