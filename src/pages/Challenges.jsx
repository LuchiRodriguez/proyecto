import { useState } from 'react'
import challenges from '../components/desafios.json'

const Challenges = () => {
    const [isPlayer, ] = useState(true);
    return (
        <>
            {
                challenges.map((challenge) => 
                <>
                    <h2>{challenge.name}</h2>
                    <div>
                        <p>{challenge.date}</p>
                        <p>{challenge.points}</p>
                    </div>
                    {
                        isPlayer ?
                        <button>Apuntarse</button>
                        :
                        <button>Crear</button>
                    }
                </>
                )
            }
        </>
    )
}

export default Challenges