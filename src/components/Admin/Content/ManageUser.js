import ModelCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { CiSquarePlus } from "react-icons/ci";

// import TableUser from "./TableUser";
import { useEffect, useState } from "react";
// import { getAllUsers } from "../../../services/apiServices";

import { toast } from "react-toastify";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
import { getUserWithPaginate } from "../../../services/apiServices";

function ManageUser() {
    const LIMIT_USERS = 6;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [show, setShow] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [dataDetail, setDataDetail] = useState({});
    const handleShow = () => setShow(true);
    // delete user
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const handleShowDeleteUser = (item) => {
        setShowModalDeleteUser(true);
        setDataDelete(item);
    };

    const [listUser, setListUser] = useState([]);
    const resetUpdateData = () => {
        setDataUpdate({});
    };
    const resetViewData = () => {
        setDataDetail({});
    };

    useEffect(() => {
        fetchListUsersWithPaginate(1);
    }, []);

    // const fetchListUsers = () => {
    //     getAllUsers()
    //         .then((res) => {
    //             console.log(res);
    //             if (res.EC === 0) {
    //                 setListUser(res.DT);
    //             }
    //         })
    //         .catch((error) => {
    //             toast.error(error);
    //         });
    // };

    const fetchListUsersWithPaginate = (page) => {
        getUserWithPaginate(page, LIMIT_USERS)
            .then((res) => {
                console.log(res);
                if (res.EC === 0) {
                    setListUser(res.DT.users);
                    setPageCount(res.DT.totalPages);
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

    const handleClickBtnView = (user) => {
        setShowModalViewUser(true);
        setDataDetail(user);
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
                    {/* <TableUser
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleShowDeleteUser={handleShowDeleteUser}
                    /> */}
                    <TableUserPaginate
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleShowDeleteUser={handleShowDeleteUser}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModelCreateUser
                    show={show}
                    setShow={setShow}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShowModalUpdateUser={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    resetUpdateData={resetUpdateData}
                    currentPage={currentPage}
                />
                <ModalViewUser
                    show={showModalViewUser}
                    setShowModalViewUser={setShowModalViewUser}
                    dataDetail={dataDetail}
                    resetViewData={resetViewData}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShowModalDeleteUser={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default ManageUser;
