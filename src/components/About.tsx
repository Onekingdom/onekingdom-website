import Link from "next/link";
import { blockTypes, Content } from "@/types/payload";
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
                  <h3 className="fn_title">One KingDom</h3>
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

interface Render {
  props: Content;
}
const Render = ({ props }: Render) => {
  switch (props.blockType) {
    case blockTypes.Discord:

    case blockTypes.Paragraph:
      return (
        <Paragraph
          Buttons={props.Buttons}
          button={props.button}
          paragraph={props.paragraph}
          id={props.id}
          blockType={props.blockType}
          Title={props.Title}
        />
      );

    default:
      return <></>;
  }
};

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

const Paragraph = ({ Title, Buttons, paragraph, button }: Content) => {
  return (
    <div className="content_item">
      <div className="neoh_fn_title" data-align="left">
        <h3 className="fn_title">One KingDom</h3>
        <div className="line">
          <span />
        </div>
      </div>
      <div className="desc">
        <p>{paragraph![0].children[0].text}</p>
      </div>
      {button && (
        <div className="buttons">
          {Buttons!.map((x) => {
            return (
              <Link href={x.link} target="_blank" className="neoh_fn_button" rel="noreferrer" key={x.id}>
                <span className="icon">
                  <SocialIcon value={x.buttons.toLowerCase()} />
                </span>
                <span className="text">{x.buttons}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
