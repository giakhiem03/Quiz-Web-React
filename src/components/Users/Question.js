import _ from "lodash";
import { memo } from "react";

function Question({ data, index, handleCheckBoxData }) {
    if (_.isEmpty(data)) {
        return <></>;
    }

    const handleCheckBox = (event, aId, qId) => {
        // event.target.checked
        handleCheckBoxData(aId, qId);
    };

    return (
        <>
            {data?.image && data.image.trim() !== "" ? (
                <div className="q-image">
                    <img
                        src={`data:image/png;base64,${data.image}`}
                        alt="q-image"
                    />
                </div>
            ) : (
                <div className="q-image"></div>
            )}
            <div className="question">
                Question {index + 1}: {data.questionDescription} ?
            </div>
            <div className="answers">
                {data.answers &&
                    data.answers.length > 0 &&
                    data.answers.map((a, index) => (
                        <div key={index} className="a-child">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={a.isSelected}
                                    onChange={(e) =>
                                        handleCheckBox(e, a.id, data.questionId)
                                    }
                                />
                                <label className="form-check-label">
                                    {a.description}
                                </label>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default memo(Question);
