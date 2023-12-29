import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getArchivedNotes, deleteNote, archiveNote, unarchiveNote, } from '../utils/network-data';
import LiCatatan from '../components/LiCatatan';
import { LocaleConsumer } from '../contexts/LocaleContext';

const Archive = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParam = new URLSearchParams(location.search).get('search') || '';
    const [loading, setLoading] = useState(true);
    const [archivedNotes, setArchivedNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState(searchParam);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const { error, data } = await getArchivedNotes();

                if (!error && Array.isArray(data)) {
                    setArchivedNotes(data);
                } else {
                    console.error("Failed to fetch archived notes.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchTerm, navigate]);

    if (loading) {
        return <p className='info-load'>Loading...</p>;
    }

    const handleDelete = (id) => {
        deleteNote(id);
        setArchivedNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    };

    const handleArchiveToggle = (id) => {
        archiveNote(id);
        setArchivedNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    };

    const handleUnarchive = (id) => {
        unarchiveNote(id);
        setArchivedNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    };

    const filteredNotes = archivedNotes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <LocaleConsumer>
            {
                ({ locale }) => {
                    return (
                        <div className='content'>
                            <h2>{locale === 'id' ? 'Arsip Catatan' : 'Note Archive'}</h2>
                            <input
                                className='pencarian'
                                type="text"
                                placeholder={locale === 'id' ? 'Pencarian Catatan' : 'Note Search'}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {filteredNotes.length === 0 ? (
                                <p className='info'>{locale === 'id' ? 'Arsip Kosong' : 'Empty Archive'}</p>
                            ) : (
                                <ul>
                                    {filteredNotes.map((note) => (
                                        <LiCatatan
                                            key={note.id}
                                            note={note}
                                            onDelete={() => handleDelete(note.id)}
                                            onArchiveToggle={() => handleArchiveToggle(note.id)}
                                            onUnarchiveToggle={() => handleUnarchive(note.id)}
                                        />
                                    ))}
                                </ul>
                            )}
                        </div>
                    )
                }
            }
        </LocaleConsumer>
    );
};

export default Archive;
