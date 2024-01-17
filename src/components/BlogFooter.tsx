import Link from "next/link";
import React from "react";
import SocialIcon from "./SocialIcon";
import Share from "./Share";

export default function BlogFooter() {
  return (
    <div className="neoh_fn_footer">
      {/* Footer Top */}
      <div className="footer_top">
        <div className="container">
          <div className="ft_in">
            <div className="desc">
              <div className="flex justify-center text-8xl">
                <SocialIcon value="discord" />
              </div>
              <h3 className="fn_title">Join The Discord Now</h3>
              <p className="fn_desc">
                One Kingdom is a community of gamers, streamers, and content creators. We are a group of like-minded people that share a passion for
                gaming, streaming, and creating content. We are a community that is focused on helping each other grow and succeed.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="buttons">
                <Link href="https://discord.gg/onekingdom" target="_blank" className="neoh_fn_button" rel="noreferrer">
                  <span className="icon">
                    <SocialIcon value="discord" />
                  </span>
                  <span className="text">Join Discord</span>
                </Link>
              </div> 
            </div>
            <div className="neoh_fn_social_list mt-8 flex justify-center">
              <Share />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
