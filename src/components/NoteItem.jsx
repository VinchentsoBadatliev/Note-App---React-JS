import React from 'react';
import { Link } from 'react-router-dom';

const NoteItem = ({ note }) => {
  return (
    // to={/edit-note/${note.id}} - Този адрес води до страницата за редактиране на бележката с конкретното id.
    //note.color е предварително дефиниран в данните, които се подават на компонента
    <Link to={`/edit-note/${note.id}`} className="note" style={{ backgroundColor: note.color }}>
    {/* ${note.title.substr(0, 20)}... - Ако е по-дълго, показва само първите 20 символа, последвани от многоточие (...), за да се избегне прекалено дългото заглавие. note.title: Ако заглавието е по-кратко от 20 символа, се показва изцяло. */}
      <h4>{note.title.length > 20 ? `${note.title.substr(0, 20)}...` : note.title}</h4>
      <p>{note.date}</p>
    </Link>
  );
};

export default NoteItem;
