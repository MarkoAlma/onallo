import React, { useContext, useState } from 'react';
import { MyUserContext } from '../context/MyUserProvider';
import { useNavigate } from 'react-router';
import { addCard } from '../myBackend';

const AddCard = () => {

    const { valasztottTopic } = useContext(MyUserContext);
    const navigate = useNavigate();
    const [kerdes, setKerdes] = useState("");
    const [valasz, setValasz] = useState("");

    const handleSubmit = () => {
        if (!kerdes.trim() || !valasz.trim()) return;
        addCard(valasztottTopic.id, { question: kerdes, answer: valasz });
        navigate("/topic");
    };

    return (
        <div className="addcard-container">

            <div className="addcard-box">

                <h1 className="addcard-title">
                    Új kártya – {valasztottTopic.name}
                </h1>

                {/* Question */}
                <div className="input-group">
                    <label className={kerdes ? "filled" : ""}>Kérdés</label>
                    <input 
                        type="text"
                        value={kerdes}
                        onChange={e => setKerdes(e.target.value)}
                    />
                </div>

                {/* Answer */}
                <div className="input-group">
                    <label className={valasz ? "filled" : ""}>Válasz</label>
                    <input 
                        type="text"
                        value={valasz}
                        onChange={e => setValasz(e.target.value)}
                    />
                </div>

                <button 
                    className="save-btn"
                    onClick={handleSubmit}
                >
                    Mentés
                </button>

                <button 
                    className="back-btn"
                    onClick={() => navigate("/topic")}
                >
                    Vissza
                </button>

            </div>
        </div>
    );
};

export default AddCard;
