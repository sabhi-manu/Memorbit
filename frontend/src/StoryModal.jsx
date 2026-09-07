import React, { useState } from 'react'
import Modal from 'react-modal'

// Required once, somewhere near your app root (App.jsx or main.jsx)
Modal.setAppElement('#root')

const StoryModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>View story</button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="bg-white rounded-lg p-6 max-w-lg w-full mx-auto mt-24 outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex items-start justify-center z-50"
        shouldCloseOnOverlayClick={true}
      >
        <h2 className="text-lg font-semibold mb-2">Sunrise over the Himalayas</h2>
        <p className="text-sm text-gray-600">Woke up at 4am to catch the first light...</p>

        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 text-sm text-cyan-600"
        >
          Close
        </button>
      </Modal>
    </div>
  )
}

export default StoryModal