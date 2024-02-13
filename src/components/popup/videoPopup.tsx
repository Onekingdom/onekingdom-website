import React from "react";

export default function videoPopup() {
  return (
    <div className="neoh_fn_video">
      <div className="bg_overlay">
        <div className="bg_image" data-bg-img="img/hero/bg.jpg" />
        <div className="bg_color" />
      </div>
      <div className="v_content">
        <a className="popup-youtube" href="//www.youtube.com/embed/7e90gBu4pas?autoplay=1">
          <img src="svg/play.svg" alt="" className="fn__svg" />
        </a>
      </div>
    </div>
  );
}
