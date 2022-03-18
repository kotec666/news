import React, {useState} from 'react'
import s from './Navbar.module.scss'
import {HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from '../../utils/consts'
import {NavLink} from 'react-router-dom'
import Modal from '../Modal/Modal'
import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import {userAPI} from '../../servicesAPI/UserService'
import { clearUser } from '../../store/reducers/UserSlice'
import {newsAPI} from '../../servicesAPI/NewsService'

const Navbar = () => {
    const [fileError, setFileError] = useState('')
    const [newsTitle, setNewsTitle] = useState('')
    const [newsBody, setNewsBody] = useState('')
    const [photoFile, setNewsFile] = useState<FileList | null>()
    const [fileName, setFileName] = useState('')
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [logoutUser] = userAPI.useLogoutUserMutation()
    const dispatch = useAppDispatch()

    const { isAuth, user } = useAppSelector(state => state.userReducer)
    const [createNews, {isLoading: isLoadingCreateNews}] = newsAPI.useCreateNewsMutation()

    const handleLogoutUser = async () => {
        await logoutUser('').unwrap()
        dispatch(clearUser())
    }

    const handleAddNews = async (e: React.FormEvent) => {
        e.preventDefault()
        setFileError('')
        if (photoFile) {
            const newsData = new FormData()
            newsData.append('newsTitle', newsTitle)
            newsData.append('newsBody', newsBody)
            newsData.append('userId', `${user.id}`)
            newsData.append('newsPicture', photoFile[0])
            await createNews(newsData)
            setIsModalOpened(false)
        } else {
            setFileError('Загрузите картинку')
        }
    }

    const setPhotoFileHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
       setNewsFile(e.target.files)
       if (e.target.files) {
           setFileName(e.target.files[0].name)
       }
    }

    return (
        <div className={s.wrapper}>
            <NavLink to={HOME_ROUTE} className={s.logo__wrapper}>
                <span>Новости</span>
            </NavLink>
            <div className={s.nav__wrapper}>
                {
                    isAuth
                        ?
                        <>
                            <div style={{cursor: 'pointer'}}>
                                {user && user?.role === 'ADMIN' && <span onClick={() => setIsModalOpened(!isModalOpened)}>Добавить новость</span>}
                            </div>
                            <div>
                                <span>{ user && user?.login }</span>
                            </div>
                            <div>
                                <span onClick={handleLogoutUser}>Выход</span>
                            </div>
                        </>
                        :
                        <>
                            <NavLink to={LOGIN_ROUTE}
                                     className={({isActive}) => isActive ? s.linkActive : s.linkWrapper}>
                                <span>Вход</span>
                            </NavLink>
                            <NavLink to={REGISTRATION_ROUTE}
                                     className={({isActive}) => isActive ? s.linkActive : s.linkWrapper}>
                                <span>Регистрация</span>
                            </NavLink>
                        </>
                }
            </div>
            <Modal isOpened={isModalOpened} setIsOpened={setIsModalOpened} title={'Добавьте информацию'}>

                <form onSubmit={handleAddNews} className={s.uploadForm} >
                    {fileError && <div style={{color: 'red'}}>{fileError}</div>}
                    <div className={s.inputActionWrapper}>
                        <label htmlFor='uploadNewsTitle'>Заголовок новости</label>
                        <input
                            type="text"
                            id={'uploadNewsTitle'}
                            placeholder={'Введите название заголовка'}
                            value={newsTitle}
                            onChange={(e) => setNewsTitle(e.target.value)}
                        />
                    </div>

                    <div className={s.inputActionWrapper}>
                        <label htmlFor='uploadNewsBody'>Текст новости</label>
                        <textarea
                            id={'uploadNewsBody'}
                            placeholder={'Введите текст новости'}
                            className={s.newsBody}
                            value={newsBody}
                            onChange={(e) => setNewsBody(e.target.value)}
                        />
                    </div>
                    <div className={s.inputActionWrapper}>
                        <label htmlFor='chooseFileBtn'>{fileName ? `${fileName}` : 'Изображение'}</label>
                        <label htmlFor='chooseFileBtn' className={s.actionBtn}>Выбрать</label>
                        <input
                            type="file"
                            hidden
                            id={'chooseFileBtn'}
                            onChange={e => setPhotoFileHandler(e)}
                        />
                    </div>

                    <button
                        className={s.actionBtn}
                        type="submit"
                        disabled={isLoadingCreateNews}
                    >
                        загрузить
                    </button>

                </form>

            </Modal>
        </div>
    )
}

export default Navbar
