import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import { ButtonChallenge, } from '../app/Styles';
import { getChallenges } from '../app/api/Challenge';
import { useUserContext } from '../app/UserProvider';
import Challenge from './Challenge';
import iconPlus from '../app/img/icons8-más-50.png'

const Challenges = () => {
    const [user] = useUserContext();
    const [challenges, setChallenges] = useState([]);

    const refetch = () => {
        getChallenges().then((data) => setChallenges(data.data));
    }

    const challenge = challenges.filter(video => video.videoUrl == null);

    const fetchData = async () => {
        const res = await getChallenges();
        setChallenges(res.data);
    }

    useEffect(() => {
        refetch();
    }, []);


    return (
        <>
            {challenge?.map((ch) =>
                <Challenge key={ch.id} ch={ch} refetch={refetch} />
            )}
            {
                user.rol === "watcher" && (
                    <ButtonChallenge to={"/createChallenge"}>
                        <img src={iconPlus} alt="" />
                    </ButtonChallenge>
                )
            }
            <NavBar />
        </>
    )
}

export default Challenges