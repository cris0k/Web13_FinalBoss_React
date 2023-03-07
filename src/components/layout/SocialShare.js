import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

function SocialShare({ shareUrl }) {
  return (
    <div className="social-sharing-card">
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={50} />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl}>
        <TwitterIcon size={50} />
      </TwitterShareButton>
      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon size={50} />
      </LinkedinShareButton>
    </div>
  );
}

export default SocialShare;
