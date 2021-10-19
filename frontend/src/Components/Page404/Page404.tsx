import "./Page404.css";
import page404 from "../../assets/GraphicElements/PageNotFound/page404.png";

function Page404(): JSX.Element {
  return (
    <div className="Page404">
      <img src={page404} alt="page-not-found" className="page404-img" />
    </div>
  );
}

export default Page404;
