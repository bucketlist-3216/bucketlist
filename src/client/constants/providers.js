import GoogleIcon from '../../../assets/login/login-google.svg';
import FacebookIcon from '../../../assets/login/login-facebook.svg';

const PROVIDERS = {
  google: {
    id: 'google',
    providerName: 'Google',
    domain: 'google.com',
    logo: <GoogleIcon />
  },
  facebook: {
    id: 'facebook',
    providerName: 'Facebook',
    domain: 'facebook.com',
    logo: <FacebookIcon />
  }
};

export default PROVIDERS;
