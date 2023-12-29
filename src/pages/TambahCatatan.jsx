import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';
import { LocaleConsumer } from '../contexts/LocaleContext';

const TambahCatatan = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === '') {
            alert('Judul catatan tidak boleh kosong');
            return;
        }

        addNote({
            title,
            body,
        });

        navigate('/');
    };

    return (
        <LocaleConsumer>
            {
                ({ locale }) => {
                    return (
                        <div className='content'>
                            <h2>{locale === 'id' ? 'Tambah Catatan Baru' : 'Add New Note'}</h2>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    {locale === 'id' ? 'Judul :' : 'Title :'}
                                </label>
                                <input type="text" value={title} onChange={handleTitleChange} />
                                <br />
                                <label>
                                    {locale === 'id' ? 'Isi Catatan :' : 'Fill In Note :'}
                                </label>
                                <textarea value={body} onChange={handleBodyChange} />
                                <br />
                                <button type="submit">{locale === 'id' ? 'Tambah Catatan' : 'Add Notes'}</button>
                            </form>
                        </div>
                    )
                }
            }
        </LocaleConsumer>
    );
};

export default TambahCatatan;