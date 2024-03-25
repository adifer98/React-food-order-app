import {createPortal} from "react-dom";
import {useRef, useEffect} from "react";

export default function Modal({children, open, onClose, className = ''}) {
    const dialog= useRef();

    useEffect(() => {
        const modal = dialog.current
        if (open) {
            modal.showModal();
        }
        // needs to continue with the else case
        else {
            modal.close();
        }

        // return () => modal.close();
    }, [open])

    return createPortal(
    <dialog /*open={open}*/
        ref={dialog}
        className={`modal ${className}`}
        onClose={onClose}
    >{children}</dialog>,
        document.getElementById('modal'));
}
