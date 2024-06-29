import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import { useUserContext } from '../app/UserProvider';
import { ButtonChallenge } from '../app/Styles';
import { getChallenges } from '../app/api/Challenge';

const Challenges = () => {
    const [isPlayer, setIsPlayer] = useState();
    const [challenges, setChallenges] = useState([]);
    const { user } = useUserContext();

    useEffect(() => {
        if (user) {
            settingRol();
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        const res = await getChallenges();
        setChallenges(res.data);
    }

    const settingRol = () => {
        if (user?.rol === 0) {
            setIsPlayer(true);
        } else {
            setIsPlayer(false);
        }
    }

    const saveChallenge = async (challengeId) => {
        console.log('challengeId: ', challengeId)

        if (!challengeId) {
            console.log('challengeId is undefined')
            return;
        }

        try {
            const response = await fetch(`/challenges/${challengeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.id }),
            });

            if (response.ok) {
                console.log('User enrolled in challenge:', challengeId);
                fetchData();
            } else {
                console.error('Error enrolling in challenge:', response.status);
            }
        } catch (error) {
            console.error('Error enrolling in challenge:', error);
        }
    };
    return (
        <>
            {challenges.length > 0 && (
                <ul>
                    {
                        challenges.map((challenge) =>
                            <li key={challenge.id}>
                                <h2>{challenge.description}</h2>
                                <div className='challengeInfo'>
                                    <p>{challenge.date}</p>
                                    <p>{challenge.points}</p>
                                </div>
                                {
                                    isPlayer && challenge &&
                                    <button onClick={() =>
                                        saveChallenge(challenge.id)
                                    }>Apuntarse</button>
                                }
                            </li>
                        )

                    }
                </ul>
            )}
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