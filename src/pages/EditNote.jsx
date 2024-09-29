//Link и useParams са от react-router-dom, използвани за навигация и извличане на параметри от URL.
import { Link, useParams, useNavigate } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useState } from "react" 
import useCreateDate from "../components/useCreateDate"


const EditNote = ({notes, setNotes}) => {
  //useParams извлича параметрите от URL (в случая id на бележката)
  const {id} = useParams();

  //note намира бележката, която ще бъде редактирана, използвайки id.
  const note = notes.find((item) => item.id == id);

  //useState инициализира състоянието на title и details с текущите стойности на бележката.
  const [title, setTitle] = useState(note.title)
  const [details, setDetails] = useState(note.details)

  //предоставя текущата дата, която ще бъде използвана при запазване на промените.
  const date = useCreateDate();

  //useNavigate е функция за навигация след запазване или изтриване на бележката
  const navigate = useNavigate();

  //save note changes 
  const handleForm = (e) => {
    //предотвратява презареждането на страницата при изпращане на формата.
    e.preventDefault();

    if(title && details) {
      // newNote - създава нов обект бележка с обновени данни и текущата дата.
      // newNote - обновява съществуващата бележка в масива с новите данни
      const newNote = {...note, title, details, date}

      const newNotes = notes.map(item => {
        if(item.id == id) {
          item = newNote;
        }
        return item;
      })
      // актуализира състоянието на бележките.
      setNotes(newNotes);
    }

    // redirect to home page
    navigate('/')

  }

  //delete note
  const handleDelete = () => {
    if(window.confirm('Are you sure you want to delete?')) {
      //item е текущият елемент (в случая бележка) от масива notes.
      //item.id != id е условието, което проверява дали id на текущия елемент е различен от id, който искаме да изтрием.
      const newNotes = notes.filter(item => item.id != id);

      //актуализира състоянието на бележките.
      setNotes(newNotes);
      navigate('/')
    }
  }



  return (
    <section>
      <header className="create-note__header">
        <Link to="/" className="btn"><IoIosArrowBack/></Link>
        <button className="btn lg primary" onClick={handleForm}>Save</button>
        <button className="btn danger" onClick={handleDelete}><RiDeleteBin6Line/></button>
      </header>
      <form className="create-note__form" onSubmit={handleForm}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
        <textarea rows="28" placeholder="Note details..." value={details} onChange={(e) => setDetails(e.target.value)}></textarea>
      </form>
    </section>
  )
}

export default EditNote