import React, { useContext, useEffect, useState } from 'react';
import { readTopicsOnce } from '../myBackend';
import { useNavigate } from 'react-router';
import { MyUserContext } from '../context/MyUserProvider';
import { Button, Spinner, Card, CardBody } from 'reactstrap';
import { FaPlus} from "react-icons/fa";
import MyModal from '../components/MyModal';
import { MyAuthContext } from '../context/AuthContext';

const Home = () => {

    const [open, setOpen] = React.useState(false);

    const {hasAccess} = useContext(MyAuthContext)

    const [topics, setTopics] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        readTopicsOnce(setTopics, setLoading);
    }, []);

    const navigate = useNavigate();
    const { setValasztottTopic } = useContext(MyUserContext);

    const handleSubmit = (obj) => {
        setValasztottTopic(obj);
        navigate("/topic");
    };

    return (
        <div className="home-container">      
            <div className="header-row">
                <h1 className="main-title"> Témakörök</h1>
                <Button 
                    color="primary" 
                    className="add-btn"
                    onClick={
                        // () => navigate("/addtopic"),
                      ()=>{
                        hasAccess ? navigate("/addtopic") : setOpen(true)
                      }
                    }
                >
                    <FaPlus /> Új témakör
                </Button>
            </div>
            <MyModal open={open} setOpen={setOpen}/>

            {isLoading ? (
                <div className="loading-box">
                    <Spinner color="light" />
                    <p>Töltés...</p>
                </div>
            ) : (
                <div className="topics-grid">
                    {topics.length > 0 ? (
                        topics.map(obj => (
                            <Card 
                                key={obj.id} 
                                className="topic-card"
                                onClick={() => handleSubmit(obj)}
                            >
                                <CardBody>
                                    <h3>{obj.name}</h3>
                                </CardBody>
                            </Card>
                        ))
                    ) : (
                        <h2 className="empty-text">Nincs még témakör</h2>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
