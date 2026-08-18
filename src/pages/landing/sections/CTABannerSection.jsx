import iphoneImg from '../../../assets/images/iPhone.png';
import './ctabannersection.css';

function PlayStoreIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3.5L13.5 12 3 20.5V3.5Z" fill="#4CAF50" />
      <path d="M3 3.5L13.5 12 8.5 17 3 3.5Z" fill="#2196F3" />
      <path d="M3 20.5L8.5 7 13.5 12 3 20.5Z" fill="#F44336" />
      <path d="M13.5 12L20 8.5 20 15.5 13.5 12Z" fill="#FFC107" />
    </svg>
  );
}

function AppleStoreIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 2C16.5 2 16.8 4.8 15 6.5C13.2 8.2 11 7.8 11 7.8C11 7.8 10.6 5.1 12.5 3.4C14.3 1.7 16.5 2 16.5 2Z" fill="#1a8fe3" />
      <path d="M20.5 16.5C20.5 16.5 19.2 19.8 17.5 21C16 22 15 21.5 13.5 21.5C12 21.5 11 22 9.5 21C7.8 19.8 6.5 16.5 6.5 16.5C6.5 16.5 5 13 6 10.5C7 8 9 7.5 10.5 7.5C12 7.5 12.5 8.5 13.5 8.5C14.5 8.5 15.2 7.5 16.8 7.5C18.4 7.5 20 8.5 20.8 10.5C21 11 21.2 11.5 21.2 12C21.2 13.5 20.5 16.5 20.5 16.5Z" fill="#1a8fe3" />
    </svg>
  );
}

export default function CTABannerSection() {
  return (
    <section className="cta">
      {/* Grid pattern overlay */}
      <div className="cta__grid-pattern" aria-hidden="true" />

      <div className="lp-container cta__inner">

        {/* ── Text — centered ── */}
        <div className="cta__text">
          <h2 className="cta__h2">Start Learning with P-School Today</h2>
          <p className="cta__sub">
            Whether you're a student, working professional, or school administrator, P-SCHOOL
            has a learning path for you.
          </p>

          {/* Store buttons */}
          <div className="cta__btns">
            <button className="cta__btn">
              <PlayStoreIcon />
              <span>Play Store</span>
            </button>
            <button className="cta__btn">
              <AppleStoreIcon />
              <span>Apple Store</span>
            </button>
          </div>
        </div>

        {/* ── 3 phones ── */}
        <div className="cta__phones">
          <div className="cta__phone cta__phone--left">
            <img src={iphoneImg} alt="P-School App" />
          </div>
          <div className="cta__phone cta__phone--center">
            <img src={iphoneImg} alt="P-School App" />
          </div>
          <div className="cta__phone cta__phone--right">
            <img src={iphoneImg} alt="P-School App" />
          </div>
        </div>

      </div>
    </section>
  );
}
