import { memberStorage } from "@/types/database/members";
import TeamCard from "./TeamCard";

interface Props {
  title: string;
  description: string;
  members?: memberStorage[];
}
export default function TeamSection({ title, description, members }: Props) {
  return (
    <section id="team">
      <div className="container">
        {/* Main Title */}
        <div className="neoh_fn_title">
          <h3 className="fn_title">{title}</h3>
          <div className="line">
            <span />
          </div>
        </div>
        {/* !Main Title */}
        <div className="mw_650 fn_description"></div>
        {/* Team List Shortcode */}
        <div className="neoh_fn_team">
          <ul className="team_list">
            {members &&
              members.map((member) => (
                <li className="team_item">
                  <TeamCard key={member.$id} socials={member.socialMedia} name={member.name} description={member.description} img={member.image} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
