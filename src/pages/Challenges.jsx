import { useEffect, useState } from 'react'
import desafios from '../components/desafios.json'
import NavBar from '../components/NavBar';
import { useUserContext } from '../app/UserProvider';
import { Link } from 'react-router-dom';

const Challenges = () => {
    const [isPlayer, setIsPlayer] = useState();
    const [challenges] = useState(desafios);
    const user = useUserContext();

    useEffect(() => {
        settingRol();
    }, [user]);


    const settingRol = () => {
        if (user?.rol === 0) {
            setIsPlayer(true);
        } else {
            setIsPlayer(false);
        }
    }

    const challengeSave = () => {
        //id del desafio para que busque cuál es, y el id del usuario con un put
    }
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
                                challengeSave()
                            }>Apuntarse</button>
                        }
                    </div>
                )

            }
            {
                !isPlayer &&
                <Link to={"/createChallenge"} />
            }
            <NavBar />
        </>
    )
}

export default Challenges