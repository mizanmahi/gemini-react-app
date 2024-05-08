import { useState } from 'react';
import './App.css';
import { fetchImageAndGenerateContent } from './helpers/generator';

const App = () => {
   const [chosenImage, setChosenImage] = useState('/baked_goods_1.jpg');
   const [prompt, setPrompt] = useState(
      'Provide a recipe for the baked goods in the image'
   );
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
                     value='/baked_goods_1.jpg'
                     checked={chosenImage === '/baked_goods_1.jpg'}
                     onChange={handleImageChange}
                  />
                  <img src='/baked_goods_1.jpg' alt='Baked Goods 1' />
               </label>
               <label className='image-choice'>
                  <input
                     type='radio'
                     name='chosen-image'
                     value='/baked_goods_2.jpg'
                     checked={chosenImage === '/baked_goods_2.jpg'}
                     onChange={handleImageChange}
                  />
                  <img src='/baked_goods_2.jpg' alt='Baked Goods 2' />
               </label>
               <label className='image-choice'>
                  <input
                     type='radio'
                     name='chosen-image'
                     value='/baked_goods_3.jpg'
                     checked={chosenImage === '/baked_goods_3.jpg'}
                     onChange={handleImageChange}
                  />
                  <img src='/baked_goods_3.jpg' alt='Baked Goods 3' />
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
         <p className='output'>{output}</p>
      </main>
   );
};

export default App;
