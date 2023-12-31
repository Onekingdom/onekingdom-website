import { InvestorStorage } from "@/types/Investors";
import { database } from "@/utils/serverAppwrite";

interface Props {
  Title: string;
}

async function getInvestors() {
  try {
    const res = await database.listDocuments<InvestorStorage>("658fabb7b076a84d06d2", "65908242b96cb2d7d7e1");
    return res;
  } catch (error) {}
}

const Investors = async ({ Title }: Props) => {
  const Investors = await getInvestors();
  if (Investors)
    return (
      <section id="investor">
        {/* Dividers */}
        <img src="svg/divider.svg" alt="" className="fn__svg fn__divider top_divider" />
        <img src="svg/divider.svg" alt="" className="fn__svg fn__divider bottom_divider" />
        {/* !Dividers */}
        <div className="container">
          {/* Main Title */}
          <div className="neoh_fn_title">
            <h3 className="fn_title">{Title}</h3>
            <div className="line">
              <span />
            </div>
          </div>
          <div className="neoh_fn_investor">
            <ul>
              {Investors.documents.map((Investor) => {
                return (
                  <li key={Investor.$id}>
                    <div className="item">
                      <img src={Investor.InvestorLogo.imageURL} alt={Investor.InvestorLogo.imageALT} />
                      <a href={Investor.InvestorURL} target="_blank" className="full_link" />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* !Investor List Shortcode */}
        </div>
      </section>
    );
};
export default Investors;
