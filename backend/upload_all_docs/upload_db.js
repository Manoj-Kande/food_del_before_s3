import fs from 'fs';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data'; // Make sure to install form-data package
import food_list from './assets_clown.js';

// Create __dirname equivalent for ES Modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFoodItems = async (index = 0) => {
    if (index >= food_list.length) {
        console.log("All food items uploaded successfully");
        return;
    }

    const foodItem = food_list[index];
    const imagePath = path.join(__dirname, 'public/images', `food_${foodItem._id}.png`);

    if (!fs.existsSync(imagePath)) {
        console.error(`Image not found: ${imagePath}`);
        return;
    }

    const formData = new FormData();
    formData.append('name', foodItem.name);
    formData.append('description', foodItem.description);
    formData.append('price', foodItem.price);
    formData.append('category', foodItem.category);
    formData.append('image', fs.createReadStream(imagePath));

    try {
        const response = await axios.post('http://localhost:4000/api/food/add', formData, {
            headers: {
                ...formData.getHeaders() // Automatically sets 'Content-Type': 'multipart/form-data' and boundary
            }
        });

        console.log(`Food item ${index + 1} uploaded:`, response.data);

        // Call the function recursively to upload the next food item
        uploadFoodItems(index + 1);
    } catch (error) {
        console.error(`Error uploading food item ${index + 1}:`, error);
    }
};

// Start uploading from index 0
uploadFoodItems();
