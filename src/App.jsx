import { useState } from 'react';
import './App.css';
import { fetchImageAndGenerateContent } from './helpers/generator';

// Import the images from the assets folder
import image1 from './assets/image1.jpg';
import image2 from './assets/image2.jpg';
import image3 from './assets/image3.jpg';

const App = () => {
   const [chosenImage, setChosenImage] = useState(image1);
   const [prompt, setPrompt] = useState('How can I learn programming?');
   const [output, setOutput] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      setOutput('Generating...');

      try {
         const response = await fetchImageAndGenerateContent(
            chosenImage,
            prompt
         );
         setOutput(response);
      } catch (error) {
         setOutput('An error occurred: ' + error.message);
      }
   };

   const handleImageChange = (e) => {
      setChosenImage(e.target.value);
   };

   const handlePromptChange = (e) => {
      setPrompt(e.target.value);
   };

   return (
      <main>
         <h1>Baking with the Gemini API</h1>
         <form onSubmit={handleSubmit}>
            <div className='image-picker'>
               <label className='image-choice'>
                  <input
                     type='radio'
                     name='chosen-image'
                     value={image1}
                     checked={chosenImage === image1}
                     onChange={handleImageChange}
                  />
                  <img src={image1} alt='image1' />
               </label>
               <label className='image-choice'>
                  <input
                     type='radio'
                     name='chosen-image'
                     value={image2}
                     checked={chosenImage === image2}
                     onChange={handleImageChange}
                  />
                  <img src={image2} alt='image2' />
               </label>
               <label className='image-choice'>
                  <input
                     type='radio'
                     name='chosen-image'
                     value={image3}
                     checked={chosenImage === image3}
                     onChange={handleImageChange}
                  />
                  <img src={image3} alt='image3' />
               </label>
            </div>
            <div className='prompt-box'>
               <label>
                  <input
                     name='prompt'
                     placeholder='Enter instructions here'
                     type='text'
                     value={prompt}
                     onChange={handlePromptChange}
                  />
               </label>
               <button type='submit'>Go</button>
            </div>
         </form>
         <div
            dangerouslySetInnerHTML={{ __html: output }}
            className='output'
         ></div>
        
      </main>
   );
};

export default App;
