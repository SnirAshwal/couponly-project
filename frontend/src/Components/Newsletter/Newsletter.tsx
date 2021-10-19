import { SyntheticEvent, useState } from "react";
import "./Newsletter.css";
import newsletterBeforeSubmit from "../../assets/GraphicElements/Main/Newsletter/Newsletter.png";
import newsletterAfterSubmit from "../../assets/GraphicElements/Main/Newsletter/NewsletterSent.png";
import "font-awesome/css/font-awesome.min.css";
import { send } from "emailjs-com";
import { HiMail } from "react-icons/hi";
import { addNotification } from "../../utils/Notification";

interface NewsletterProps {
  setModalShow: Function;
}
function Newsletter(props: NewsletterProps): JSX.Element {
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e: SyntheticEvent) => {
    e.preventDefault();
    setToSend({
      ...toSend,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    });
  };

  const [toSend, setToSend] = useState({
    from_name: "couponly",
    to_name: "",
    message: "need to write this",
    reply_to: "",
    toEmail: "",
  });

  const handleNewsletterSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    send("gmail", "newsletter", toSend, "user_LpzbiU78ZFxaINcb2E14E")
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((err) => {
        addNotification(
          "Error",
          "Something Went Wrong, Please Try Again",
          "danger",
          "top",
          "center",
          160,
          ["animate__animated", "animate__fadeInDown"],
          ["animate__animated", "animate__fadeOutUp"],
          {
            duration: 3000,
          }
        );
      });

    setIsSubmit(true);
  };

  return (
    <div className="Newsletter">
      <div className="newsletter-center">
        <button
          className="close-btn"
          onClick={() => props.setModalShow(false)}
        ></button>
        {isSubmit ? (
          <img
            src={newsletterAfterSubmit}
            alt="newsletterPhoto"
            className="newsletterBeforeSubmit"
          />
        ) : (
          <img
            src={newsletterBeforeSubmit}
            alt="newsletterPhoto"
            className="newsletterBeforeSubmit"
          />
        )}
        {!isSubmit && (
          <form
            onSubmit={handleNewsletterSubmit}
            method="post"
            encType="text/plain"
            className="input-contaienr"
          >
            <div className="input-email-container">
              <input
                type="email"
                required
                className="input-email"
                name="toEmail"
                onChange={handleChange}
                placeholder="Your Email"
              />
              <HiMail className="mail-icon" size={25} />
            </div>

            <button type="submit" className="newletter-submit-btn">
              Submit
            </button>
          </form>
        )}
        {isSubmit && (
          <button
            className="back-home-btn"
            onClick={() => props.setModalShow(false)}
          >
            Take me back to the homepage
          </button>
        )}
      </div>
    </div>
  );
}

export default Newsletter;
