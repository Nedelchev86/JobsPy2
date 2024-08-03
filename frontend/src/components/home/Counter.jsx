import {useState, useEffect} from "react";

const Counter = ({endValue, duration}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startValue = 0;
        const increment = endValue / (duration / 10);

        const animateCounter = () => {
            if (startValue < endValue) {
                startValue += increment;
                setCount(Math.min(Math.ceil(startValue), endValue));
                setTimeout(animateCounter, 10);
            }
        };

        animateCounter();
    }, [endValue, duration]);

    return <strong className="numberAnimated">{count}</strong>;
};

export default Counter;
