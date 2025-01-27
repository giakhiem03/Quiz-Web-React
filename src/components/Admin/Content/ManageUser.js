import ModelCreateUser from "./ModalCreateUser";

function ManageUser() {
    return (
        <div className={"manage-user-container"}>
            <div className={"title"}>ManageUser</div>
            <div className={"users-content"}>
                <div>
                    <button>Add new users</button>
                </div>
                <div>
                    table users
                    <ModelCreateUser />
                </div>
            </div>
        </div>
    );
}

export default ManageUser;
