import { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import _ from "lodash";
import { putUpdateProfile } from "../../../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doUpdateUser } from "../../../redux/action/userAction";

function ProfileTab({ user }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    };

    useEffect(() => {
        if (!_.isEmpty(user)) {
            setEmail(user.email);
            setUsername(user.username);
            setImage(user.image);
            if (user.image) {
                setPreviewImage(`data:image/png;base64,${user.image}`);
            }
        }
    }, [user]);

    const handleSubmitUpdateUser = (event) => {
        event.preventDefault();
        putUpdateProfile(username, image)
            .then((res) => {
                console.log("success");
                if (res && res.EC === 0) {
                    let data = { username, image };
                    dispatch(doUpdateUser(data));
                    toast.success("Update succeed");
                }
                if (res && res.EC !== 0) {
                    toast.error(res.EM);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                        disabled
                        value={email}
                        type="email"
                        className="form-control"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Username</label>
                    <input
                        value={username}
                        type="text"
                        className="form-control"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="col-md-12">
                    <label
                        className="form-label label-upload"
                        htmlFor="labelUpload"
                    >
                        <CiSquarePlus />
                        Upload File Image
                    </label>
                    <input
                        type="file"
                        id="labelUpload"
                        hidden
                        onChange={handleUploadImage}
                    />
                </div>
                <div className="col-md-12 img-preview">
                    {previewImage ? (
                        <img src={previewImage} alt="" />
                    ) : (
                        <span>Preview Image</span>
                    )}
                </div>
                <button
                    className="btn btn-primary"
                    onClick={handleSubmitUpdateUser}
                >
                    Save
                </button>
            </form>
        </>
    );
}

export default ProfileTab;
