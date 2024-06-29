import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import { useUserContext } from '../app/UserProvider';
import { Link } from 'react-router-dom';
import { ButtonChallenge } from '../app/Styles';

const Challenges = () => {
    const [isPlayer, setIsPlayer] = useState();
    const [challenges, setChallenges] = useState([]);
    const { user } = useUserContext();

    useEffect(() => {
        settingRol();
        saveChallenge();
    }, [user]);


    const settingRol = () => {
        if (user?.rol === 0) {
            setIsPlayer(true);
        } else {
            setIsPlayer(false);
        }
    }

    const saveChallenge = async (challengeId) => {
        try {
            const response = await fetch(`/challenge/${challengeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.id }),
            });

            if (response.ok) {
                console.log('User enrolled in challenge:', challengeId);
            } else {
                console.error('Error enrolling in challenge:', response.status);
            }
        } catch (error) {
            console.error('Error enrolling in challenge:', error);
        }
    };
    return (
        <>
            {
                challenges.map((challenge) =>
                    <div key={challenge.id}>
                        <h2>{challenge.name}</h2>
                        <div className='challengeInfo'>
                            <p>{challenge.date}</p>
                            <p>{challenge.points}</p>
                        </div>
                        {
                            isPlayer &&
                            <button onClick={() =>
                                saveChallenge(challenge.id)
                            }>Apuntarse</button>
                        }
                    </div>
                )

            }
            {
                !isPlayer && (
                    <ButtonChallenge to={"/createChallenge"}>
                        <img src="../app/img/icons8-más-50.png" alt="" />
                    </ButtonChallenge>
                )
            }
            <NavBar />
        </>
    )
}

export default Challenges