//Link и useNavigate: Импортират се от react-router-dom за навигация и връзки в приложението.
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
// Генерира уникални идентификатори за новите бележки
import { v4 as uuid } from 'uuid';
import useCreateDate from "../components/useCreateDate";

// Utility function to get a random color
const getRandomColor = () => {
  const rootStyles = getComputedStyle(document.documentElement);
  const colorVariables = [
    '--color-note-1', '--color-note-2', '--color-note-3', '--color-note-4', '--color-note-5',
    '--color-note-6', '--color-note-7', '--color-note-8', '--color-note-9', '--color-note-10'
  ];
  //randomIndex: Генерира случаен индекс за избор на цвят.
  const randomIndex = Math.floor(Math.random() * colorVariables.length);
  //Връща стойността на избраната CSS променлива и премахва допълнителни интервали.
  return rootStyles.getPropertyValue(colorVariables[randomIndex]).trim();
}

const CreateNote = ({ setNotes }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const date = useCreateDate();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    //преминаване към нова страница
    e.preventDefault();
    //Проверява дали и двете полета са попълнени (title и details).
    if (title && details) {
      const color = getRandomColor(); // Get a random color
      // Създава нов обект за бележка.
      const note = { id: uuid(), title, details, date, color };
      // Add this note to the Notes array and show the latest notes first
      setNotes(prevNotes => [note, ...prevNotes]);
      // Redirect to homepage 
      navigate('/');
    }
  }

  return (
    <section>
      <header className="create-note__header">
        <Link to="/" className="btn"><IoIosArrowBack /></Link>
        <button className="btn lg primary" onClick={handleSubmit}>Save</button>
      </header>
      <form className="create-note__form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
        <textarea rows="28" placeholder="Note details..." value={details} onChange={(e) => setDetails(e.target.value)}>
        </textarea>
      </form>
    </section>
  );
}

export default CreateNote;
