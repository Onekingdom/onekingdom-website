import Link from "next/link";
import SlideLeft from "./Framer/SlideLeft";
import SlideRight from "./Framer/SlideRight";
import SocialIcon from "./SocialIcon";

const AboutComponent = () => {
  return (
    <section id="about">
      <div className="container">
        {/* About Item #1 */}
        <div className="neoh_fn_about_item">
          <div className="flex">
            <SlideRight>
              <Discord serverID="706492500096974900" />
            </SlideRight>
            <SlideLeft>
              <div className="content_item">
                <div className="neoh_fn_title" data-align="left">
                  <h3 className="fn_title">One Kingdom</h3>
                  <div className="line">
                    <span />
                  </div>
                </div>
                <div className="desc">
                  <p>
                    One Kingdom is a community of gamers, streamers, and content creators. We are a group of like-minded people that share a passion
                    for gaming, streaming, and creating content. We are a community that is focused on helping each other grow and succeed.
                  </p>
                </div>
                <div className="buttons">
                  <Link href="https://discord.gg/onekingdom" target="_blank" className="neoh_fn_button" rel="noreferrer">
                    <span className="icon">
                      <SocialIcon value="discord" />
                    </span>
                    <span className="text">Join Discord</span>
                  </Link>
                </div>
              </div>
            </SlideLeft>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutComponent;



const Discord = ({ serverID }: { serverID: string }) => {
  return (
    <>
      <div
        className="img_item"
        style={{
          width: "100%",
        }}
      >
        <iframe
          src={`https://discord.com/widget?id=${serverID}&theme=dark`}
          width={500}
          height={500}
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          className="iframe"
        />
      </div>
    </>
  );
};


