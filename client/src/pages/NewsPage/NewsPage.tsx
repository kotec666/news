import React, {useState} from 'react'
import s from './NewsPage.module.scss'
import {newsAPI} from '../../servicesAPI/NewsService'
import {useAppSelector} from '../../hooks/redux'

const NewsPage = () => {
    const {data: news, isLoading, isError} = newsAPI.useGetAllQuery('')
    const {user} = useAppSelector(state => state.userReducer)
    const [deleteNews] = newsAPI.useDeleteNewsMutation()
    const [updateNews, {isLoading: isLoadingUpdate}] = newsAPI.useUpdateNewsMutation()

    const [photoFile, setNewsFile] = useState<FileList | null>()
    const [fileName, setFileName] = useState('')
    const [fileError, setFileError] = useState('')
    const [newsTitle, setNewsTitle] = useState('')
    const [newsBody, setNewsBody] = useState('')
    const [isActive, setIsActive] = useState(0)

    const handleDeleteNews = async (newsId: number) => {
        await deleteNews({newsId: newsId}).unwrap()
    }

    const handleSetActiveNews = (newsId: number) => {
        setIsActive(newsId)
    }

    const handleUpdateNews = async () => {
            setFileError('')
            if (photoFile) {
                const newsData = new FormData()
                newsData.append('newsTitle', newsTitle)
                newsData.append('newsBody', newsBody)
                newsData.append('newsId', `${isActive}`)
                newsData.append('newsPicture', photoFile[0])
                await updateNews(newsData)
                setIsActive(0)
            } else {
                setFileError('Загрузите картинку')
            }
    }

    const setPhotoFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewsFile(e.target.files)
        if (e.target.files) {
            setFileName(e.target.files[0].name)
        }
    }

    return (
        <div className={s.newsPageWrapper}>
            <div className={s.wrapper}>
                <div>
                    <span className={s.allNews}>Все новости</span>
                </div>
                <div className={s.newsWrapper}>
                    {isLoading && <div>Загрузка...</div>}
                    {isError && <div>Произошла ошибка при загрузке...</div>}
                    {
                        news && news.map(item => {
                            return (
                                <div className={s.news} key={item.id}
                                     onDoubleClick={() => handleSetActiveNews(item.id)}>
                                    <div className={s.newsHeader}>
                                        {fileError && <div style={{color: 'red'}}>{fileError}</div>}
                                        { user && user.role === 'ADMIN' &&
                                            isActive === item.id
                                                ?
                                                <input
                                                    value={newsTitle}
                                                    onChange={(e) => setNewsTitle(e.target.value)}
                                                    placeholder="Заголовок новости"
                                                >
                                                </input>

                                                : <span>{item.title}</span>
                                        }
                                    </div>
                                    <div className={s.newsBody}>

                                        <div className={s.imgWrapper}>
                                            { user && user.role === 'ADMIN' &&
                                                isActive === item.id
                                                    ?
                                                    <>
                                                        <label htmlFor="chooseFile" className={s.chooseFileBtn}>{fileName ? `${fileName}` : 'Изображение'}</label>
                                                        <input
                                                            id={'chooseFile'}
                                                            type="file"
                                                            hidden
                                                            onChange={(e) => setPhotoFileHandler(e)}
                                                        >
                                                        </input>
                                                    </>

                                                    : <img src={`http://localhost:5000/${item.imageUrl}`}
                                                           alt={item.title}/>
                                            }
                                        </div>
                                        { user && user.role === 'ADMIN' &&
                                            isActive === item.id
                                                ?
                                                <textarea
                                                    value={newsBody}
                                                    onChange={(e) => setNewsBody(e.target.value)}
                                                    placeholder="Описание новости"
                                                    className={s.changeInfoArea}
                                                >
                                                </textarea>

                                                : <span className={s.description}>
                                                     {item.body}
                                                  </span>
                                        }
                                        { user && user.role === 'ADMIN' &&
                                            isActive === item.id
                                                ? <>
                                                    <button className={s.chooseFileBtn} onClick={() => setIsActive(0)}>Отменить</button>
                                                    <button className={s.chooseFileBtn} onClick={handleUpdateNews} disabled={isLoadingUpdate} >Сохранить</button>
                                                 </>
                                                : null
                                        }
                                    </div>
                                    {
                                        user && user.role === 'ADMIN' &&
                                        <div className={s.newsFooter}>
                                            <button className={s.deleteButton}
                                                    onClick={() => handleDeleteNews(item.id)}>Удалить
                                            </button>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default NewsPage
