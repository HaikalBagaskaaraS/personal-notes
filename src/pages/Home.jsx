import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/network-data';
import LiCatatan from '../components/LiCatatan';
import { LocaleConsumer } from '../contexts/LocaleContext';

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParam = new URLSearchParams(location.search).get('search') || '';
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(searchParam);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const activeNotes = await getActiveNotes();
                setNotes(activeNotes.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch notes:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const queryParams = searchTerm ? `?search=${searchTerm}` : '';
        navigate({ search: queryParams });

    }, [searchTerm, navigate]);

    if (loading) {
        return <p className='info-load'>Loading...</p>;
    }

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = async (id) => {
        try {
            await deleteNote(id);
            const activeNotes = await getActiveNotes();
            setNotes(activeNotes.data);
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    };


    const handleArchiveToggle = async (id) => {
        try {
            await archiveNote(id);
            const activeNotes = await getActiveNotes();
            setNotes(activeNotes.data);
        } catch (error) {
            console.error("Failed to archive note:", error);
        }
    };


    return (
        <LocaleConsumer>
            {
                ({ locale }) => {
                    return (
                        <div className='content'>
                            <h2>{locale === 'id' ? 'Daftar Catatan' : 'Notes List'}</h2>
                            <input
                                className='pencarian'
                                type="text"
                                placeholder={locale === 'id' ? 'Pencarian Catatan' : 'Note Search'}
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            {filteredNotes.length === 0 ? (
                                <p className='info'>{locale === 'id' ? 'Tidak Ada Catatan' : 'Empty Notes'}</p>
                            ) : (
                                <ul>
                                    {filteredNotes.map((note) => (
                                        <LiCatatan
                                            key={note.id}
                                            note={note}
                                            onDelete={() => handleDelete(note.id)}
                                            onArchiveToggle={() => handleArchiveToggle(note.id)}
                                            onUnarchiveToggle={() => handleArchiveToggle(note.id)}
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

export default Home;