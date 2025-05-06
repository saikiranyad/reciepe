






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RECIEPE_BACKEND_URL } from '../../utils/Paths';
import { useNavigate, useParams } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

const StepItem = ({ step, index, moveStep, handleStepChange, removeStep }) => {
  const [, ref] = useDrag({
    type: 'STEP',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'STEP',
    hover(item) {
      if (item.index !== index) {
        moveStep(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="flex items-center space-x-2 mb-2">
      <textarea
        value={step}
        onChange={(e) => handleStepChange(index, e.target.value)}
        className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
      />
      <button type="button" onClick={() => removeStep(index)} className="text-red-500 font-bold px-2">
        ✕
      </button>
    </div>
  );
};

const Updaterecipe = () => {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingreidients: '',
    newImages: [],
    collabortors: '',
    steps: []
  });

  const [existingImages, setExistingImages] = useState([]);

  const fetchreciepe = async () => {
    try {
      const response = await axios.get(`${RECIEPE_BACKEND_URL}/${id}`, { withCredentials: true });
      if (response.data.success) {
        const { title, description, ingreidients, images, collaborators, steps } = response.data.recipe;
        setFormData({
          title,
          description,
          ingreidients,
          newImages: [],
          collabortors: collaborators?.join(',') || '',
          steps: steps || []
        });
        setExistingImages(images || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchreciepe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, newImages: Array.from(e.target.files) }));
  };

  const handleRemoveImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addStep = () => {
    setFormData((prev) => ({ ...prev, steps: [...prev.steps, ''] }));
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData((prev) => ({ ...prev, steps: newSteps }));
  };

  const removeStep = (index) => {
    setFormData((prev) => ({ ...prev, steps: prev.steps.filter((_, i) => i !== index) }));
  };

  const moveStep = (fromIndex, toIndex) => {
    const updatedSteps = update(formData.steps, {
      $splice: [
        [fromIndex, 1],
        [toIndex, 0, formData.steps[fromIndex]]
      ]
    });
    setFormData((prev) => ({ ...prev, steps: updatedSteps }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const recipeData = new FormData();
      recipeData.append('title', formData.title);
      recipeData.append('description', formData.description);
      recipeData.append('ingreidients', formData.ingreidients);
      recipeData.append('userId', user._id);

      existingImages.forEach((img) => recipeData.append('existingImages', JSON.stringify(img)));

      if (formData.collabortors) {
        formData.collabortors.split(',').map((id) => id.trim()).forEach((id) => {
          recipeData.append('collabortors', id);
        });
      }

      formData.steps.forEach((step) => {
        if (step.trim() !== '') recipeData.append('steps', step);
      });

      formData.newImages.forEach((file) => {
        recipeData.append('images', file);
      });

      const response = await axios.put(`${RECIEPE_BACKEND_URL}/${id}`, recipeData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (response.data.success) {
        alert('Recipe updated successfully!');
        navigate('/card');
      } else {
        console.log(response.data.error);
      }
    } catch (err) {
      console.log(err);
      alert('Failed to update recipe');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-2xl mt-16 sm:mt-20 px-4 md:ml-78 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-rose-600 mb-6 text-center">
            Update your current recipe
          </h2>
          <hr className="border-rose-300" />
          <div className='mt-10'>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-rose-600 mb-1">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-rose-600 mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-rose-600 mb-1">Ingredients (comma-separated)</label>
                <textarea name="ingreidients" value={formData.ingreidients} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 h-20 resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-rose-600 mb-1">Steps</label>
                {formData.steps.map((step, index) => (
                  <StepItem
                    key={index}
                    index={index}
                    step={step}
                    moveStep={moveStep}
                    handleStepChange={handleStepChange}
                    removeStep={removeStep}
                  />
                ))}
                <button type="button" onClick={addStep} className="mt-2 text-rose-600 underline">+ Add Step</button>
              </div>

              <div>
                <label className="block text-sm font-medium text-rose-600 mb-1">Upload New Images</label>
                <input type="file" name="images" onChange={handleFileChange} multiple className="block w-full text-sm text-gray-600" />
              </div>

              <div>
                <label className="block text-sm font-medium text-rose-600 mb-1">Collaborator IDs (comma-separated)</label>
                <input type="text" name="collabortors" value={formData.collabortors} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              <button type="submit" className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 rounded">
                Submit
              </button>
            </form>

            {existingImages.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-rose-600 mb-2">Existing Images</h3>
                <div className="grid grid-cols-3 gap-2">
                  {existingImages.map((img, index) => (
                    <div key={index} className="relative">
                      <img src={img.imageurl} alt={`existing-${index}`} className="w-full h-32 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Updaterecipe;












