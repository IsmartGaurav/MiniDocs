import { useRef, useState } from "react";
import { useLocalStorage } from "../utils/useLocalStorage";
import Card from "./Card";
import { TbPlus } from "react-icons/tb";

const Foreground = () => {
  const ref = useRef(null);
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [usedColors, setUsedColors] = useState([]);

  // Function to generate random RGB color
  const generateRandomColor = () => {
    let color;
    do {
      color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    } while (usedColors.includes(color)); // Ensure it's a unique color
    setUsedColors([...usedColors, color]); // Add color to used colors list
    return color;
  };

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      text: "New note",
      desc: "Click to edit",
      tag: { text: "Copy to clipboard", color: generateRandomColor() }, // Assign random unique color here
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id, updatedData) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, ...updatedData } : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="fixed inset-0 z-[3] overflow-hidden bg-transparent">
      <div
        ref={ref}
        className="h-full max-h-screen w-full overflow-y-auto p-4 flex flex-wrap justify-start items-start"
      >
        {notes.map((item) => (
          <Card
            key={item.id}
            data={item}
            reference={ref}
            onUpdate={(updatedData) => updateNote(item.id, updatedData)}
            onDelete={() => deleteNote(item.id)}
          />
        ))}
      </div>
      <button
        onClick={addNote}
        className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
        aria-label="Add new note"
      >
        <TbPlus size={24} />
      </button>
    </div>
  );
};

export default Foreground;
