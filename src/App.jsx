import { BrowserRouter, Route, Routes } from "react-router-dom"
import Notes from "./pages/Notes"
import CreateNote from './pages/CreateNote';
import EditNote from './pages/EditNote';


import { useEffect, useState } from "react";

//Използване на useState, за да се създаде състояние notes, което съдържа списък с бележки. Тези бележки се извличат от localStorage, ако съществуват, или започват с празен масив.
export const App = () => {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || [])
  
  // save note to local storage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  return (
    <main id="app">
      {/*използват за управление на навигацията и определяне кои компоненти да се рендерират в зависимост от URL адреса, който потребителят посещава в приложението. browserrouter - обгражда цялото приложение , routes - контейнер за мнж.маршути, route - път = url адреса  */}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Notes notes={notes}/>} />
        <Route path="/create-note" element={<CreateNote setNotes={setNotes}/>} />
        <Route path="/edit-note/:id" element={<EditNote notes={notes} setNotes={setNotes}/>} />
      </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App