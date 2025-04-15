import IconTextFormInput from '@/components/form/IconTextFormInput';
import { useState } from 'react';
import { BsEnvelopeFill, BsPhoneFill } from 'react-icons/bs';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useSignIn from '../useSignIn';
const SignIn = () => {
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [otpSent, setOtpSent] = useState(false);
  const {
    loading,
    login,
    control
  } = useSignIn();

  const handleSendOTP = (e) => {
    e.preventDefault();
    // TODO: Implement OTP sending logic
    setOtpSent(true);
  };

  return <form onSubmit={login}>
      <div className="mb-4 d-flex gap-3">
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="emailLogin"
            checked={loginMethod === 'email'}
            onChange={() => setLoginMethod('email')}
          />
          <label className="form-check-label" htmlFor="emailLogin">
            Login with Email
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="phoneLogin"
            checked={loginMethod === 'phone'}
            onChange={() => setLoginMethod('phone')}
          />
          <label className="form-check-label" htmlFor="phoneLogin">
            Login with Phone
          </label>
        </div>
      </div>

      {loginMethod === 'email' ? (
        <>
          <div className="mb-4">
            <IconTextFormInput control={control} icon={BsEnvelopeFill} placeholder="E-mail" label="Email address *" name="email" />
          </div>
          <div className="mb-4">
            <IconTextFormInput type='password' control={control} icon={FaLock} placeholder="password" label="Password *" name="password" />
            <div id="passwordHelpBlock" className="form-text">
              Your password must be 8 characters at least
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4">
            <IconTextFormInput control={control} icon={BsPhoneFill} placeholder="Phone Number" label="Phone Number *" name="phone" />
          </div>
          {otpSent ? (
            <div className="mb-4">
              <IconTextFormInput control={control} placeholder="Enter OTP" label="OTP *" name="otp" />
            </div>
          ) : (
            <div className="mb-4">
              <button className="btn btn-secondary" onClick={handleSendOTP}>
                Send OTP
              </button>
            </div>
          )}
        </>
      )}
      <div className="mb-4 d-flex justify-content-between">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Remember me
          </label>
        </div>
        <div className="text-primary-hover">
          <Link to="/auth/forgot-password" className="text-secondary">
            <u>Forgot password?</u>
          </Link>
        </div>
      </div>
      <div className="align-items-center mt-0">
        <div className="d-grid">
          <button 
            className="btn btn-primary mb-0" 
            disabled={loading || (loginMethod === 'phone' && !otpSent)} 
            type="submit"
          >
            Login
          </button>
        </div>
      </div>
    </form>;
};
export default SignIn;
