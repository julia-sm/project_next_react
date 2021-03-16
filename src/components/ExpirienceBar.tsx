import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExpirienceBar.module.css';

export function ExpirienceBar(){

    const{ currentExpirience, expirienceToNextLevel } = useContext(ChallengesContext);

    const percentToNextLevel = Math.round((currentExpirience*100))/expirienceToNextLevel

    return(
        <header className={styles.expirienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width:`${percentToNextLevel}%`}}/>

                <span className={styles.currentExpirience} style={{ left: `${percentToNextLevel}%` }}>
                    {currentExpirience}xp
                </span> 

            </div>

            <span>
                {expirienceToNextLevel} xp
            </span>
        </header>
    );
}