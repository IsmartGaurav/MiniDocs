import { useState } from "react";
import { FaFileAlt, FaEdit } from "react-icons/fa";
import { MdDeleteForever,MdEdit  } from "react-icons/md";
import { motion } from "framer-motion";

const Card = ({ data, reference, onUpdate, onDelete }) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDesc, setEditedDesc] = useState(data.desc);

  const addToClipboard = () => {
    navigator.clipboard.writeText(data.desc);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate({ ...data, desc: editedDesc });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.1 }}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 500, bounceDamping: 30 }}
      className="relative w-56 h-60 sm:h-60 bg-slate-700 rounded-3xl text-white m-5 flex flex-col overflow-hidden p-6 items-start sm:p-4 lg:p-4 lg:w-60 lg:h-72 xl:p-4 2xl:p-4 mx-auto"
    >
      <FaFileAlt className="w-4 h-4" />
      {isEditing ? (
        <textarea
          value={editedDesc}
          onChange={(e) => setEditedDesc(e.target.value)}
          className="mt-2 flex-grow w-full bg-slate-600 text-white p-2 rounded"
        />
      ) : (
        <p className="mt-2 flex-grow">{data.desc}</p>
      )}
      <div className="absolute top-2 right-2 flex space-x-2">
        {isEditing ? (
          <button onClick={handleSave} className="text-green-500">
            Save
          </button>
        ) : (
          <MdEdit onClick={handleEdit} className="cursor-pointer text-blue-400 h-6 w-6 m-1" />
        )}
        <MdDeleteForever  onClick={handleDelete} className="cursor-pointer text-red-400 h-6 w-6 m-1" />
      </div>
      <div className="footer absolute bottom-0 left-0 w-full">
        <div
          style={{ backgroundColor: data.tag.color }} // Apply random color as inline style
          className="w-full h-12 flex justify-center items-center"
        >
          <button className="text-red-50 w-full h-full" onClick={addToClipboard}>
            {copied ? "Copied!" : data.tag.text}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
