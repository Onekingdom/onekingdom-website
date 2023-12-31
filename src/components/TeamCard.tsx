import React from "react";
import SocialIcon from "./SocialIcon";

export default function TeamCard() {
  return (
    <div className="t_item">
      <div className="person_info">
        <div className="img_holder">
          <img src="/teamMembers/Jochemwhite-320x320.png" alt="person Placeholder" />
        </div>
        <div className="title_holder">
          <h3 className="fn_title">Jochemwhite</h3>
          <p className="fn_desc">Jochem Van Der Wit</p>
        </div>
      </div>
      <div className="person_social">
        <ul>
          <li>
            <a href="" target="_blank">
              <SocialIcon value="discord" />
            </a>
          </li>
          <li>
            <a href="" target="_blank">
              <SocialIcon value="youtube" />
            </a>
          </li>
          <li>
            <a href="" target="_blank">
              <SocialIcon value="tiktok" />
            </a>
          </li>
          <li>
            <a href="" target="_blank">
              <SocialIcon value="twitch" />
            </a>
          </li>
          <li>
            <a href="" target="_blank">
              <SocialIcon value="instagram" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
