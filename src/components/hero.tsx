import React from "react";
import AnimatedTitle from "./AnimatedTitle";

interface Props {
  subtitle: string;
  title: string;
  description: string;
}

export default function Hero({ subtitle, title, description }: Props) {
  return (
    <div className="neoh_fn_hero">
      {/* Overlay (of hero header) */}
      <div className="bg_overlay">
        {/* Overlay Color */}
        <div className="bg_color" />
        <div className="overlay_slider vegas-slide vegas-container" style={{ height: `100%` }}>
          <Backround mimeType="video/mp4" url="/website_background_video.mp4" />
        </div>
      </div>
      <div className="hero_content">
        <div className="container">
          <div className="content">
            <div id="magic" />
            <h4 className="fn_subtitle">{subtitle}</h4>

            <AnimatedTitle title={title} />
            <p className="fn_desc fn_animated_text">{description}</p>
          </div>
        </div>
      </div>
      <a href="#about" className="neoh_fn_down magic-hover magic-hover__square">
        <span className="text">Scroll Down</span>
        <span className="icon">
          <img src="svg/right-arr.svg" alt="right-arr" className="fn__svg" />
        </span>
      </a>
    </div>
  );
}

const Backround = ({ mimeType, url }: { mimeType: string; url: string }) => {
  if (mimeType === "video/mp4") {
    return (
      <video playsInline={true} autoPlay={true} muted={true} loop={true}>
        <source src={url} type="video/mp4" />
      </video>
    );
  }
  return <img src={url} alt="" />;
};
