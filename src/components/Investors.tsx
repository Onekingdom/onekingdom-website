import { InvestorStorage } from "@/types/Investors";
import { storage } from "@/lib/clientAppwrite";
import { database } from "@/utils/serverAppwrite";
import Image from "next/image";

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



  if (Investors && Investors.documents.length > 0)
    return (
      <section id="investor">
        {/* Dividers */}
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
                const image = storage.getFilePreview(Investor.InvestorLogo.bucketID, Investor.InvestorLogo.imageID);
                return (
                  <li key={Investor.$id}>
                    <div className="item">
                      <Image
                        src={image.href}
                        alt={Investor.InvestorName}
                        style={{
                          maxWidth: "100%",
                          height: "auto"
                        }} />
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
