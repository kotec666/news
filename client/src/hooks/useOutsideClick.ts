import {Dispatch, SetStateAction, useEffect} from 'react'

const useOutsideClick = (ref:string, callback:Dispatch<SetStateAction<boolean>>) => {
    const handleClick = (e: any) => {
        if (e.target.className === ref) {
            callback(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    })
}

export default useOutsideClick
