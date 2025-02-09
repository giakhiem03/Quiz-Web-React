import { useEffect, useState } from "react";
import "./CountDown.scss";

function CountDown({ onTimeUp }) {
    const [count, setCount] = useState(10);

    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10);
        const hours = Math.floor(sec_num / 3600);
        const minutes = Math.floor(sec_num / 60) % 60;
        const seconds = sec_num % 60;
        return [hours, minutes, seconds]
            .map((v) => (v < 10 ? "0" + v : v))
            .filter((v, i) => v !== "00" || i > 0)
            .join(":");
    };

    useEffect(() => {
        if (count === 0) {
            onTimeUp();
            return;
        }
        let timer = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [count]);

    return <div className="countdown-container">{toHHMMSS(count)}</div>;
}

export default CountDown;
