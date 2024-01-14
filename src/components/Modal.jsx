import React,{useState,useRef,forwardRef,useImperativeHandle} from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

const Modal=forwardRef(({children,buttonCaption,...props},ref)=>{

    const dialog=useRef();
    useImperativeHandle(ref,()=>{
        return {
            open(){
                dialog.current.showModal();
            }
        }
    });

    const handleClose=()=>{
        dialog.current.close();
    }

    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md">
            {children}
            <form method="dialog" className='mt-4 text-right '>
                <Button onClick={handleClose}>{buttonCaption || 'Close'}</Button>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    )
})

export default Modal;