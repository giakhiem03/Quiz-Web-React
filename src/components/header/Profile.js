import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import ProfileTab from "./Tabs/ProfileTab";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PasswordTab from "./Tabs/PasswordTab";
import HistoryTab from "./Tabs/HistoryTab";

function Profile({ showModalProfile, setShowModalProfile }) {
    const user = useSelector((state) => state.user.account);

    const handleClose = () => {
        setShowModalProfile(false);
    };

    // const handleSubmitUpdateUser = () => {
    //     putUpdateUser(dataUpdate.id, username, role, image)
    //         .then((res) => {
    //             if (res && res.EC === 0) {
    //                 toast.success("Update succeed");
    //                 handleClose();
    //                 fetchListUsersWithPaginate(currentPage);
    //             }
    //             if (res && res.EC !== 0) {
    //                 toast.error(res.EM);
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    return (
        <Modal
            className="modal-add-user"
            backdrop="static"
            show={showModalProfile}
            onHide={handleClose}
            size="xl"
        >
            <Modal.Header closeButton>
                <Modal.Title>Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="profile" title="Main Infor">
                        <ProfileTab user={user} />
                    </Tab>
                    <Tab eventKey="password" title="Password">
                        <PasswordTab />
                    </Tab>
                    <Tab eventKey="history" title="History">
                        <HistoryTab />
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {/* <Button
                    variant="primary"
                    // onClick={handleSubmitUpdateUser}
                >
                    Save
                </Button> */}
            </Modal.Footer>
        </Modal>
    );
}

export default Profile;
