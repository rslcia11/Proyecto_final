import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"
import "./TeamSection.css"

const TeamMember = ({ name, title, emails, github, linkedin }) => (
  <div className="team-member">
    <h3>{name}</h3>
    <p className="member-title">{title}</p>
    <div className="member-links">
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
      )}
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
      )}
      {emails.length > 0 && (
        <a href={`mailto:${emails[0]}`} aria-label="Email">
          <FaEnvelope />
        </a>
      )}
    </div>
    <div className="member-emails">
      {emails.map((email, index) => (
        <p key={index}>{email}</p>
      ))}
    </div>
  </div>
)

const TeamSection = () => {
  return (
    <section className="team-section">
      <h2>Nuestro Equipo</h2>
      <div className="team-members">
        <TeamMember
          name="Ing. Wilson Martinez"
          title="Ingeniero de Software"
          emails={["wm911m@gmail.com"]}
          github="https://github.com/rslcia11"
          linkedin="https://www.linkedin.com/in/wilson-martinez-50097a220"
        />
        <TeamMember
          name="Ing. Fabian Campoverde"
          title="Desarrollador Full Stack"
          emails={["fcampoverde881@gmail.com", "fabi22isra@yahoo.com"]}
          github="https://github.com/FabianSSJ"
          linkedin="https://www.linkedin.com/in/fabian-campoverde-821b7233b/"
        />
      </div>
    </section>
  )
}

export default TeamSection

