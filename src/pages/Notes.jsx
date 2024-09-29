import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import NoteItem from "../components/NoteItem";
import { useEffect, useState } from "react";



const Notes = ({notes}) => {
  //showSearch:Променлива на състоянието, която контролира дали полето за търсене е видимо. Първоначално е зададена на false, което означава, че полето за търсене не е видимо.setShowSearch: Функция, която позволява актуализиране на showSearch.
  const [showSearch, setShowSearch] = useState(false);

  //text: Съхранява текста, въведен в полето за търсене. Първоначалната стойност е празен стринг ('').
  //setText: Функция за актуализиране на стойността на text.
  const [text, setText] = useState('')

  //filterNotes: Съхранява филтрирания списък с бележки, които ще бъдат показани на потребителя.
  //setFilteredNotes: Функция за актуализиране на filterNotes с нов списък от бележки след търсене.
  const [filterNotes, setFilteredNotes] = useState(notes)

  //handleSearch: Функция, която филтрира бележките въз основа на текста, въведен в полето за търсене. Тя сравнява всяка бележка, като търси съвпадение в заглавието (title) на бележката.
  const handleSearch = () => {
    setFilteredNotes(notes.filter(note => {
      if(note.title.toLowerCase().match(text.toLocaleLowerCase())){
        return note;
      }
    }))
  }

  //run hadleSearch on every type on keyboar in input
  useEffect(handleSearch, [text]) 


  return (
    <section>
      <header className="notes__header">
        {/* if showsearch is false show My Notes */}
        {!showSearch && <h2>My Notes</h2>}
        {/* if showsearch is true show input field, setText. След всяка промяна в текста, също така се извиква функцията 
         handleSearch за филтриране на бележките.*/}
       {showSearch && <input type="text" value={text} onChange={(e) => {setText(e.target.value); handleSearch();}} autoFocus placeholder='Keyword...' /> }
        {/* if showsearch is true show show close else show search icon */}
        <button className="btn" onClick={() => setShowSearch(prevState => !prevState)}>{showSearch ? 
          <MdClose/> : <IoSearchOutline />}</button>
      </header>
      <div className="notes__container">
        {filterNotes.length == 0 && <p className="empty__notes">No notes found.</p>}
        {
          filterNotes.map(note => <NoteItem key={note.id} note={note}/>)
        }
      </div>
      <Link to="create-note" className="btn add__btn"><BsPlusLg/></Link>
    </section>
  )
}

export default Notes