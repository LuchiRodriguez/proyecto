import challenges from '../components/desafios.json'

const Challenges = () => {
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
                </>
                )
            }
        </>
    )
}

export default Challenges