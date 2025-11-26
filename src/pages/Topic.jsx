import React, { useContext, useEffect, useState } from 'react';
import { MyUserContext } from '../context/MyUserProvider';
import { useNavigate } from 'react-router';
import { readCardsOnce } from '../myBackend';
import HomeButton from '../components/HomeButton';

const Topic = () => {

    const { valasztottTopic } = useContext(MyUserContext);
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        readCardsOnce(valasztottTopic.id, setTopics);
    }, []);

    return (
        <div className="topic-container">
            
            <HomeButton />

            <div className="topic-header">
                <h1>{valasztottTopic.name}</h1>
                <button className="new-card-btn" onClick={() => navigate("/addcard")}>
                    Új kártya
                </button>
            </div>

            <div className="topic-grid">
                {topics && topics.length > 0 &&
                    topics.map(obj =>
                        <FlipCard key={obj.id} obj={obj} />
                    )
                }
            </div>
        </div>
    );
};

export default Topic;



// --- Flip Card Component ---
const FlipCard = ({ obj }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div 
            className={`flip-card ${flipped ? "flipped" : ""}`} 
            onClick={() => setFlipped(!flipped)}
        >
            <div className="flip-inner">
                
                {/* FRONT = Question */}
                <div className="flip-front">
                    <h3>{obj.question}</h3>
                </div>

                {/* BACK = Answer */}
                <div className="flip-back">
                    <h3>{obj.answer}</h3>
                </div>

            </div>
        </div>
    );
};
