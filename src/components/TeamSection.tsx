import TeamCard from "./TeamCard";

interface Props {
  title: string;
  description: string;
}
export default function TeamSection({ title, description }: Props) {
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
        <div className="mw_650 fn_description">
        </div>
        {/* Team List Shortcode */}
        <div className="neoh_fn_team">
          <ul className="team_list">
            <li className="team_item">
              <TeamCard />
            </li>
            <li className="team_item">
              <TeamCard />
            </li>
            <li className="team_item">
              <TeamCard />
            </li>
            <li className="team_item">
              <TeamCard />
            </li>
            <li className="team_item">
              <TeamCard />
            </li>
            <li className="team_item">
              <TeamCard />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
