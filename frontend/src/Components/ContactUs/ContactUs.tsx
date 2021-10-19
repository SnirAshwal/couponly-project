import "./ContactUs.css";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import { AiFillPhone } from "react-icons/ai";

function ContactUs(): JSX.Element {
  return (
    <div className="ContactUs" id="contact-us">
      <h1 className="contact-us-title">CONTACT-US</h1>
      <div className="photos-container">
        <div className="personal-info">
          <div className="img-circle img-circle-ori"></div>
          <div className="personal-name">Ori Erez Blushtien</div>
          <div className="personal-job">Full Stack Developer</div>
          <p>Orierezblu@gmail.com</p>
          <p className="personal-about">
            My name is Ori Erez Blushtein from Ramat-Gan, Israel.
            <br />
            I am a Full stack developer specializes in server side and client
            side development.
            <br />
            Two years ago I finished my military service as a company commander.
            During my military service I commanded over 3000 soldiers.
            <br />
            I like to learn new things, work great under pressure, solve
            problems creatively and work well in a team.
            <br />
            Feel free to view my projects on github or contact me on LinkedIn,
            email or my cell phone.
            <br />
            Would be nice to cooperate in the future.
          </p>
          <div className="wrapper">
            <a href="mailto:orierezblu@gmail.com" className="link-to">
              <div className="icon mail contact">
                <div className="tooltip">Mail</div>
                <span>
                  <BsFillEnvelopeFill size={30} />
                </span>
              </div>
            </a>
            <a
              className="link-to"
              href="https://www.linkedin.com/in/orierezblu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icon linkedIn contact">
                <div className="tooltip">LinkedIn</div>
                <span>
                  <FaLinkedin size={30} />
                </span>
              </div>
            </a>
            <a
              className="link-to"
              href="https://github.com/OriErezBlu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icon gitHub contact">
                <div className="tooltip">GitHub</div>
                <span>
                  <AiFillGithub size={35} />
                </span>
              </div>
            </a>
            <a href="tel:+972504746450" className="link-to">
              <div className="icon phone contact">
                <div className="tooltip">Phone</div>
                <span>
                  <AiFillPhone size={30} />
                </span>
              </div>
            </a>
          </div>
        </div>
        <div className="personal-info">
          <div className="img-circle img-circle-snir"></div>
          <div className="personal-name">Snir Ashwal</div>
          <div className="personal-job">Full Stack Developer</div>
          <p>Snirashwal@gmail.com</p>
          <p className="personal-about">
            Hi, my name is Snir.
            <br />
            i am a full stack developer based in Israel.
            <br />I specialize with different technologies on both front-end and
            back-end sides.
            <br />
            very passionate about coding and expanding my existing knowledge in
            different spectrums of the coding world.
            <br />
            you can check out my recent projects on my github and also contact
            me through my email or social networks in regard of different
            interests you have to work together.
          </p>
          <div className="wrapper">
            <a href="mailto:snirashwal@gmail.com" className="link-to">
              <div className="icon mail contact">
                <div className="tooltip">Mail</div>
                <span>
                  <BsFillEnvelopeFill size={30} />
                </span>
              </div>
            </a>
            <a
              className="link-to"
              href="https://www.linkedin.com/in/snirashwal/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icon linkedIn contact">
                <div className="tooltip">LinkedIn</div>
                <span>
                  <FaLinkedin size={30} />
                </span>
              </div>
            </a>

            <a
              className="link-to"
              href="https://github.com/snirashwal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icon gitHub contact">
                <div className="tooltip">GitHub</div>
                <span>
                  <AiFillGithub size={35} />
                </span>
              </div>
            </a>
            <a href="tel:+972505444154" className="link-to">
              <div className="icon phone contact">
                <div className="tooltip">Phone</div>
                <span>
                  <AiFillPhone size={30} />
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
