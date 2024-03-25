import Link from "next/link";
const Footer = () => {
  return (
    <footer id="footer" className="bottom-0 w-full static">
      <div className="neoh_fn_footer">
        <div className="footer_bottom">
          <div className="container">
            <div className="fb_in">
              <div className="fb_left">
                <p>
                  Copyright {new Date().getFullYear()} - Designed &amp; Developed by{" "}
                  <a href="#" target="_blank" rel="noreferrer">
                    StreamWizard
                  </a>
                </p>
              </div>
              <div className="fb_right">
                <ul>
                  <li>
                    <Link href="/termsandconditions">Terms &amp; Conditions</Link>
                  </li>
                  <li>
                    <Link href="/privacypolicy">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
