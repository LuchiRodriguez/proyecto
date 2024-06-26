import { useState } from 'react'
import desafios from '../components/desafios.json'
import NavBar from '../components/NavBar';
import { useUserContext } from '../app/UserProvider';
import { Link } from 'react-router-dom';

const Challenges = () => {
    const [isPlayer,] = useState(true);
    const [challenges] = useState(desafios);
    const [isWatcher,] = useState(true);
    const user = useUserContext();

    const handlePlayerAction = (challengeId) => {
        console.log('Player action: ', user.id, challengeId);
    };


    return (
        <>
            {
                challenges.map((challenge) =>
                    <div className='challengeItem' key={challenge.id}>
                        <h2>{challenge.name}</h2>
                        <div className='challengeInfo'>
                            <p>{challenge.date}</p>
                            <p>{challenge.points}</p>
                        </div>
                        {
                            isPlayer &&
                            <button onClick={() => handlePlayerAction(challenge.id)}>Apuntarse</button>
                        }
                    </div>
                )

            }
            {
                isWatcher &&
                <Link to={"/createChallenge"} />
            }
            <NavBar />
        </>
    )
}

export default Challenges