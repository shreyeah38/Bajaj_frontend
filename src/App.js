import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [filter, setFilter] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedInput = JSON.parse(jsonInput);
            const res = await axios.post('https://bajaj-backend-2-gzy9.onrender.com/bfhl', { ...parsedInput });
            setResponse(res.data);
        } catch (error) {
            alert('Invalid JSON input or API error!');
        }
    };

    const filteredResponse = () => {
        if (!response) return {};
        const result = {};
        if (filter.includes('Alphabets')) result.alphabets = response.alphabets;
        if (filter.includes('Numbers')) result.numbers = response.numbers;
        if (filter.includes('Highest Lowercase Alphabet')) result.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        return result;
    };

    return (
        <div>
            <h1>Your Roll Number</h1>
            <textarea 
                rows="5" 
                placeholder="Enter JSON" 
                value={jsonInput} 
                onChange={(e) => setJsonInput(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
            {response && (
                <>
                    <div>
                        <label>Filter Response:</label>
                        <select multiple onChange={(e) => setFilter([...e.target.selectedOptions].map(opt => opt.value))}>
                            <option value="Alphabets">Alphabets</option>
                            <option value="Numbers">Numbers</option>
                            <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
                        </select>
                    </div>
                    <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
                </>
            )}
        </div>
    );
};

export default App;
