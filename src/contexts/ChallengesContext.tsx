import { setUncaughtExceptionCaptureCallback } from 'process';
import {createContext, ReactNode, useEffect, useState} from 'react';
import Cookies from 'js-cookie'
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount:number;
}

interface ChallengesContextData{
    level: number;
    currentExpirience: number;
    expirienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: ()=> void;
    startNewChallenge: () =>void;
    resetChallenge:() =>void;
    completeChallenge:() =>void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps{
    children:ReactNode

    level:number,
    currentExpirience:number,
    challengesCompleted:number
    
      

}

export const ChallengesContext = createContext({}as ChallengesContextData);


export function ChallengesProvider ({children, ...rest}:ChallengesProviderProps){

    const [level, setLevel] = useState(rest.level ?? 1);
    const[currentExpirience,setCurrentExpirience] = useState(rest.currentExpirience ??0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setisLevelUpModalOpen] = useState(false)


    const expirienceToNextLevel = Math.pow((level +1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        
        Cookies.set('level', String(level));
        Cookies.set('currentExpirience', String(currentExpirience));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    }, [level, currentExpirience, challengesCompleted] )


    function levelUp()   {
       setLevel(level+1);
       setisLevelUpModalOpen(true)
    }

    function closeLevelUpModal(){
        setisLevelUpModalOpen(false);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge (challenge)

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio',{
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if(!activeChallenge){
            return;
        }

        const{ amount } = activeChallenge;

        let finalExpirience = currentExpirience + amount;

        if(finalExpirience>= expirienceToNextLevel){
            
            finalExpirience = finalExpirience -expirienceToNextLevel;
            levelUp();

        }

        setCurrentExpirience(finalExpirience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted+1);
    }

    return(



        <ChallengesContext.Provider 
        value={{
            level,
            
            expirienceToNextLevel,
            challengesCompleted, 
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            currentExpirience,
            completeChallenge,
            closeLevelUpModal}}>

            {children}
            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>   
    );
}

