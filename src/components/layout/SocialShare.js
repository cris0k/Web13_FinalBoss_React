import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

function SocialShare({ shareUrl, className }) {
  return (
    <div className={className}>
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
