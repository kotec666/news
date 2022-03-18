import React, {Dispatch, SetStateAction} from 'react'
import s from './Modal.module.scss'
import useOutsideClick from '../../hooks/useOutsideClick'

interface IModalProps {
    isOpened: boolean
    setIsOpened: Dispatch<SetStateAction<boolean>>
    title:string
}

const Modal:React.FC<IModalProps> = ({children, isOpened, setIsOpened, title}) => {
    useOutsideClick(s.modal, setIsOpened)

    return (
        <div style={{display: `${isOpened ? '' : 'none'}`}} className={s.modal}>
            <div className={s.modal__content}>
                <div className={s.modal__head}>
                    {title} <span className={s.close} onClick={() => setIsOpened(false)}>&times;</span>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal
