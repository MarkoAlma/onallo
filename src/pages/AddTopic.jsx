import React, { useEffect, useState } from 'react';
import { addTopic } from '../myBackend';
import { useNavigate } from 'react-router';

const AddTopic = () => {
    
    const navigate = useNavigate();
    const [nev, setNev] = useState("");

    const handleSubmit = async () => {
        if (!nev.trim()) return;
        await addTopic(nev);
        navigate("/");
    }

    return (
        <div className="addtopic-container">
            <div className="addtopic-box">

                <h1 className="addtopic-title">Új témakör hozzáadása</h1>

                <div className="input-group">
                    <label className={nev ? "filled" : ""}>Témakör neve</label>
                    <input 
                        type="text" 
                        value={nev} 
                        onChange={(e) => setNev(e.currentTarget.value)}
                    />
                </div>

                <button className="save-btn" onClick={handleSubmit}>Hozzáadás</button>
                <button className="back-btn" onClick={() => navigate("/")}>Vissza</button>

            </div>
        </div>
    )
}

export default AddTopic;
