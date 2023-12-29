import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { showFormattedDate } from '../utils/index';
import { FaTrash, FaFileDownload, FaFileUpload, FaInfoCircle } from 'react-icons/fa';

const LiCatatan = ({ note, onDelete, onArchiveToggle, onUnarchiveToggle }) => {
    const karakterTeks = (text, maxLength) => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    return (
        <li>
            <Link to={`/notes/${note.id}`}><h3>{note.title}</h3></Link>
            <p className='tanggal'>{showFormattedDate(note.createdAt)}</p>
            <p>{karakterTeks(note.body, 110)}</p>
            <div className='action'>
                <Link to={`/notes/${note.id}`}><FaInfoCircle /></Link>
                <button onClick={(event) => { onDelete(note.id); event.stopPropagation(); }}><FaTrash /></button>
                <button onClick={(event) => { note.archived ? onUnarchiveToggle(note.id) : onArchiveToggle(note.id); event.stopPropagation(); }}>
                    {note.archived ? <FaFileUpload /> : <FaFileDownload />}
                </button>
            </div>
        </li>
    );
};

LiCatatan.propTypes = {
    note: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchiveToggle: PropTypes.func.isRequired,
    onUnarchiveToggle: PropTypes.func.isRequired,
};

export default LiCatatan;
