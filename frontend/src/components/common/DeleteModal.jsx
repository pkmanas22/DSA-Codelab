// components/DeleteModal.tsx
import React from 'react';

const DeleteModal = ({
  modalId,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  onDelete,
}) => {
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            <button className="btn btn-outline">Cancel</button>
            <button
              className="btn btn-error "
              onClick={() => {
                onDelete();
                document.getElementById(modalId).close();
              }}
              type="button"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModal;
