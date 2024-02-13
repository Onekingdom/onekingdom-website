import React from "react";
import SocialIcon from "./SocialIcon";
import { database } from "@/utils/serverAppwrite";
import { GlobalStorage } from "@/types/database/globals";

async function getSocialMedia() {
  const response = await database.getDocument<GlobalStorage>("658fabb7b076a84d06d2", "65cb8829068faba84505", "65cb9004b80c8a26af33");
  return response.socialMedia;
}

export default async function Share() {
  const socialMedia = await getSocialMedia();

  return (
    <div className="neoh_fn_share">
      <h5 className="label">Share:</h5>
      <ul>
        {socialMedia.map((item, index) => (
          <li key={index}>
            <a href={item.href} target="_blank">
              <SocialIcon value={item.value.toLowerCase()} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
