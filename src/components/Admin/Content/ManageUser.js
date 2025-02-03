import ModelCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { CiSquarePlus } from "react-icons/ci";
import { useState } from "react";

function ManageUser() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    return (
        <div className={"manage-user-container"}>
            <div className={"title"}>ManageUser</div>
            <div className={"users-content"}>
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={handleShow}>
                        <CiSquarePlus />
                        Add new users
                    </button>
                </div>
                <div className="table-users-container">table users</div>
                <ModelCreateUser show={show} setShow={setShow} />
            </div>
        </div>
    );
}

export default ManageUser;
