import head from 'next/head'
import {GetServerSideProps} from 'next'

import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExpirienceBar } from '../components/ExpirienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';

import { CountdownProvider } from '../contexts/CountdownContext';

import Head from 'next/head';

import styles from '../styles/Pages/Home.module.css';

import {ChallengesProvider} from '../contexts/ChallengesContext'

interface HomeProps{
  level:number,
  currentExpirience:number,
  challengesCompleted:number
}

export default function Home(props) {

  return (
    <ChallengesProvider level={props.level} 
      currentExpirience={props.currentExpirience} 
      challengesCompleted={props.challengesCompleted}
    >
        
      <div className={styles.container}>
      
      <Head>
        <title>Inicio | move.it</title>
      </Head>
      
      <ExpirienceBar />

      <CountdownProvider>
        <section>
          <div >
              <Profile />
              <CompletedChallenges />
              <Countdown />
          </div>

          <div>
              <ChallengeBox />
          </div>
        </section>
      
      </CountdownProvider>
      </div>
    </ChallengesProvider>
    
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>{

    const {level, currentExpirience,challengesCompleted} = ctx.req.cookies;

    return{
        props: {
          level: Number(level),
          currentExpirience: Number(currentExpirience),
          challengesCompleted: Number(challengesCompleted)}
    }
}