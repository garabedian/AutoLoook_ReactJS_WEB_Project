import projectLogo from "/images/seat.png";
import FileUpload from "./fileupload.jsx";
import { Routes, Route, Link } from "react-router-dom";

export default function Landing() {
    return (
      <>
          <div>
              <a href="/#" target="_blank">
                  <img src={projectLogo} className="logo picture-background" alt="Car logo"/>
              </a>
          </div>
          <h1 className="emboss">Auto Loook</h1>
          <FileUpload />
      </>
    )
}
