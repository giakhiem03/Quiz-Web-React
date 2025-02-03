import ModelCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { CiSquarePlus } from "react-icons/ci";

import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiServices";

import { toast } from "react-toastify";
import ModalUpdateUser from "./ModalUpdateUser";
function ManageUser() {
    const [show, setShow] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});

    const handleShow = () => setShow(true);
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        fetchListUsers();
    }, []);
    const fetchListUsers = () => {
        getAllUsers()
            .then((res) => {
                console.log(res);
                if (res.EC === 0) {
                    console.log("goi lai API", res.DT);
                    setListUser(res.DT);
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    };

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
                <div className="table-users-container">
                    <TableUser
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        listUser={listUser}
                    />
                </div>
                <ModelCreateUser
                    show={show}
                    setShow={setShow}
                    fetchListUsers={fetchListUsers}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShowModalUpdateUser={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                />
            </div>
        </div>
    );
}

export default ManageUser;
