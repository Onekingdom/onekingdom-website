import React from "react";
import SocialIcon from "./SocialIcon";

export default function Share() {
  return (
    <div className="neoh_fn_share">
      <h5 className="label">Share:</h5>
      <ul>
        <li>
          <a href="#">
            <SocialIcon value="twitter" />
          </a>
        </li>
        <li>
          <a href="#">
          <SocialIcon value="facebook" />
          </a>
        </li>
        <li>
          <a href="#">
          <SocialIcon value="instagram" />
          </a>
        </li>
        <li>
          <a href="#">
          <SocialIcon value="twitch" />
          </a>
        </li>
        <li>
          <a href="#">
          <SocialIcon value="discord" />
          </a>
        </li>
      </ul>
    </div>
  );
}
