import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils/index';
import { FaFileDownload, FaFileUpload, FaTrash } from 'react-icons/fa';
import { LocaleConsumer } from '../contexts/LocaleContext';

const DetailCatatan = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [noteData, setNoteData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await getNote(id);

                if (error) {
                    console.error('Error fetching note:', data);
                } else {
                    setNoteData(data);
                }
            } catch (error) {
                console.error('Error fetching note:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <p className='info-load'>Loading...</p>;
    }

    if (!noteData) {
        return (
            <LocaleConsumer>
                {
                    ({ locale }) => {
                        return (
                            <p className='info'>{locale === 'id' ? 'Catatan Tidak Ditemukan ...' : 'Notes Not Found'}</p>
                        )
                    }
                }
            </LocaleConsumer>
        );
    }

    const handleDelete = async () => {
        await deleteNote(id);
        navigate('/');
    };


    const handleArchiveToggle = async () => {
        if (noteData.archived) {
            await unarchiveNote(id);
        } else {
            await archiveNote(id);
        }
        navigate('/');
    };

    return (
        <LocaleConsumer>
            {
                ({ locale }) => {
                    return (
                        <div className='content'>
                            <h2>{locale === 'id' ? 'Detail Catatan' : 'Detailed Notes'}</h2>
                            <h3 className='judul-detail'>{noteData.title}</h3>
                            <p className='tanggal'>{showFormattedDate(noteData.createdAt)}</p>
                            <p className='p-detail'>{noteData.body}</p>
                            <div className='action-detail'>
                                <button onClick={handleDelete}>
                                    <FaTrash /> <br /> {locale === 'id' ? 'Hapus' : 'Delete'}
                                </button>
                                <button onClick={handleArchiveToggle}>
                                    {noteData.archived ? (
                                        <>
                                            <FaFileUpload /> <br /> {locale === 'id' ? 'Batal Arsipkan' : 'Unarchive'}
                                        </>
                                    ) : (
                                        <>
                                            <FaFileDownload /> <br /> {locale === 'id' ? 'Arsipkan' : 'Archive'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )
                }
            }
        </LocaleConsumer>
    );
};

export default DetailCatatan;
