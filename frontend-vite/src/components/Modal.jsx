import { useEffect } from "react";
import { X } from "lucide-react";

function Modal({ isOpen, onClose, children }) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 border border-slate-700 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-700 rounded-lg transition text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;