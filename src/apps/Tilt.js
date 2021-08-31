import { useEffect } from "react";
import { useRef } from "react";
import VanillaTilt from "vanilla-tilt";

const Tilt = ({ children }) => {
    const tiltRef = useRef();


    useEffect(() => {
        const { current: tiltNode } = tiltRef
        const vanillaTiltOptions = {
            max: 50,
            speed: 100,
            glare: true,
            'max-glare': 0.5,
        }

        VanillaTilt.init(tiltNode, vanillaTiltOptions)
        return () => tiltNode.vanillaTilt.destroy()
    }, [])
    return (
        <div ref={tiltRef} className="tilt-root">
            <div className="tilt-child">{children}</div>
        </div>
    )
}

export default Tilt;
