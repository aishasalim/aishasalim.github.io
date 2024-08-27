import React from 'react';

const PopupForm = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-dark p-5 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Name</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Email</label>
            <input type="email" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Message</label>
            <textarea className="w-full p-2 border border-gray-300 rounded-md" rows="4"></textarea>
          </div>
          <div className="flex justify-end">
            <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
