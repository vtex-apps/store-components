import * as Social from 'react-share'

export const SOCIAL_NAME_MAP = {
  facebook: 'Facebook',
  whatsapp: 'WhatsApp',
  twitter: 'Twitter',
  telegram: 'Telegram',
  email: 'E-mail',
  pinterest: 'Pinterest',
}

export const SOCIAL_LIST = Object.values(SOCIAL_NAME_MAP)

export const SOCIAL_COMPONENT_MAP = {
  [SOCIAL_NAME_MAP.facebook]: {
    SocialNetworkName: SOCIAL_NAME_MAP.facebook,
    SocialComponent: Social.FacebookShareButton,
    SocialIcon: Social.FacebookIcon,
  },
  [SOCIAL_NAME_MAP.whatsapp]: {
    SocialNetworkName: SOCIAL_NAME_MAP.whatsapp,
    SocialComponent: Social.WhatsappShareButton,
    SocialIcon: Social.WhatsappIcon,
  },
  [SOCIAL_NAME_MAP.twitter]: {
    SocialNetworkName: SOCIAL_NAME_MAP.twitter,
    SocialComponent: Social.TwitterShareButton,
    SocialIcon: Social.TwitterIcon,
  },
  [SOCIAL_NAME_MAP.telegram]: {
    SocialNetworkName: SOCIAL_NAME_MAP.telegram,
    SocialComponent: Social.TelegramShareButton,
    SocialIcon: Social.TelegramIcon,
  },
  [SOCIAL_NAME_MAP.email]: {
    SocialNetworkName: SOCIAL_NAME_MAP.email,
    SocialComponent: Social.EmailShareButton,
    SocialIcon: Social.EmailIcon,
  },
  [SOCIAL_NAME_MAP.pinterest]: {
    SocialNetworkName: SOCIAL_NAME_MAP.pinterest,
    SocialComponent: Social.PinterestShareButton,
    SocialIcon: Social.PinterestIcon,
  },
}
