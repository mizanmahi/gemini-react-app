import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import Base64 from 'base64-js';
import MarkdownIt from 'markdown-it';

// Your API key for Gemini API
const API_KEY = 'TODO';

const fetchImageAndGenerateContent = async (imageUrl, prompt) => {
  const imageBase64 = await fetch(imageUrl)
    .then((r) => r.arrayBuffer())
    .then((a) => Base64.fromByteArray(new Uint8Array(a)));

  const contents = [
    {
      role: 'user',
      parts: [
        {
          inline_data: { mime_type: 'image/jpeg', data: imageBase64 },
        },
        { text: prompt },
      ],
    },
  ];

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({
    model: 'gemini-pro-vision',
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ],
  });

  const result = await model.generateContentStream({ contents });

  let buffer = [];
  const md = new MarkdownIt();
  for await (const response of result.stream) {
    buffer.push(response.text());
  }

  return md.render(buffer.join(''));
};

export { fetchImageAndGenerateContent };
