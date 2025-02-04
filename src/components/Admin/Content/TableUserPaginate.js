import ReactPaginate from "react-paginate";

function TableUserPaginate({
    listUser,
    handleClickBtnUpdate,
    handleClickBtnView,
    handleShowDeleteUser,
    fetchListUsersWithPaginate,
    pageCount,
    currentPage,
    setCurrentPage,
}) {
    const handlePageClick = (event) => {
        console.log(`User requested page number ${event.selected}`);
        fetchListUsersWithPaginate(+event.selected + 1);
        setCurrentPage(+event.selected + 1);
    };
    return (
        <>
            <table className="table table-dark table table-hover table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser &&
                        listUser.length > 0 &&
                        listUser.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => handleClickBtnView(item)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="btn btn-warning mx-3"
                                        onClick={() =>
                                            handleClickBtnUpdate(item)
                                        }
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            handleShowDeleteUser(item)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    {listUser && listUser.length === 0 && (
                        <tr>
                            <td colSpan={"4"}>Not found data</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage - 1}
                />
            </div>
        </>
    );
}
export default TableUserPaginate;
