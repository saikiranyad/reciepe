





import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RECIEPE_BACKEND_URL } from '../../utils/Paths';

function Addreciepe() {
  const { user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingreidients: '',
    images: [],
    // collabortors: '',
    steps: [''],  // Default with one empty step
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStepsChange = (e, index) => {
    const { value } = e.target;
    const updatedSteps = [...formData.steps];
    updatedSteps[index] = value;
    setFormData(prev => ({ ...prev, steps: updatedSteps }));
  };

  const handleAddStep = () => {
    setFormData(prev => ({ ...prev, steps: [...prev.steps, ''] }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, images: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const recipeData = new FormData();
      recipeData.append('title', formData.title);
      recipeData.append('description', formData.description);
      recipeData.append('ingreidients', formData.ingreidients);
      recipeData.append('userId', user._id);

      // if (formData.collabortors) {
      //   const names = formData.collabortors.split(',').map(name => name.trim());
      //   names.forEach(name => recipeData.append('collabortors', name)); // Sending names
      // }

      for (let i = 0; i < formData.images.length; i++) {
        recipeData.append('images', formData.images[i]);
      }

      // Append steps
      formData.steps.forEach(step => recipeData.append('steps', step));

      const response = await axios.post(`${RECIEPE_BACKEND_URL}/add`, recipeData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      if (response.data.success) {
        setSuccessMessage('Recipe added successfully!');
        setFormData({
          title: '',
          description: '',
          ingreidients: '',
          images: [],
          collabortors: '',
          steps: [''],  // Reset steps to one empty field
        });
      } else {
        setErrorMessage(response.data.message || 'Failed to add recipe');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to add recipe');
    }
  };

  return (
    <div className="max-w-2xl mt-16 sm:mt-20 px-4 md:ml-78 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-rose-600 mb-6 text-center">Add a New Recipe</h2>
        <hr className="border-rose-300" />
        
        {/* Show success/error messages */}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-5 mt-10">
          {/* Form Fields for Title, Description, Ingredients, Images, Collaborators */}
          <div>
            <label className="block text-sm font-medium text-rose-600 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-rose-600 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-base resize-none h-24 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-rose-600 mb-1">Ingredients</label>
            <textarea
              name="ingreidients"
              value={formData.ingreidients}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-base resize-none h-20 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-rose-600 mb-1">Upload Images</label>
            <input
              type="file"
              name="images"
              onChange={handleFileChange}
              multiple
              required
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:rounded file:border-rose-500 file:text-rose-500 hover:file:bg-rose-50"
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-rose-600 mb-1">Collaborator IDs (comma-separated)</label>
            <input
              type="text"
              name="collabortors"
              value={formData.collabortors}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium text-rose-600 mb-1">Steps</label>
            {formData.steps.map((step, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="text"
                  value={step}
                  onChange={(e) => handleStepsChange(e, index)}
                  placeholder={`Step ${index + 1}`}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
                <button
                  type="button"
                  onClick={handleAddStep}
                  className="ml-2 text-rose-600"
                >
                  Add Step
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-rose-600 text-white font-bold py-2 rounded-md"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addreciepe;
