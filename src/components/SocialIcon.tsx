import React from "react";
import { Socialmedia } from "@/types/payload";
import { FaDiscord, FaFacebook, FaInstagram, FaTiktok, FaTwitch, FaTwitter, FaYoutube } from "react-icons/fa";

interface Props {
  value: string;
}
export default function SocialIcon({ value }: Props) {
  switch (value) {
    case Socialmedia.Twitter:
      return (
        <span>
          <FaTwitter />
        </span>
      );
    case Socialmedia.Facebook:
      return (
        <span>
          <FaFacebook />
        </span>
      );
    case Socialmedia.Instagram:
      return (
        <span>
          <FaInstagram />
        </span>
      );
    case Socialmedia.Discord:
      return (
        <span>
          <FaDiscord />
        </span>
      );
    case Socialmedia.TikTok:
      return (
        <span>
          <FaTiktok />
        </span>
      );
    case Socialmedia.Twitch:
      return (
        <span>
          <FaTwitch />
        </span>
      );
    case Socialmedia.YouTube:
      return (
        <span>
          <FaYoutube />
        </span>
      );

    default:
      return <></>;
  }


}
