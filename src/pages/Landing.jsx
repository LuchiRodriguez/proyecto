import {LandingPage} from '../app/Styles'
const Landing = () => {
  return (
    <LandingPage>
      <h1>Welcome to final-project</h1>
      <div>
        <a href="/jugador">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          PLAYER
        </a>
        <a href="/observador">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          WATCHER
        </a>
      </div>
    </LandingPage>
  )
}

export default Landing