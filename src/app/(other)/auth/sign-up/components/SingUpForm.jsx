import IconTextFormInput from '@/components/form/IconTextFormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { BsEnvelopeFill, BsPersonFill, BsPhoneFill } from 'react-icons/bs';
import { FaLock } from 'react-icons/fa';
import * as yup from 'yup';
const SingUpForm = () => {
  const signUpFormSchema = yup.object({
    fullName: yup.string().required('Please enter your Full Name'),
    phone: yup.string().matches(/^[0-9]{10}$/, 'Please enter valid phone number').required('Please enter your Phone Number'),
    email: yup.string().email('Please enter valid email').required('Please enter your Email'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Please enter your Password'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Please confirm your Password')
  });
  const {
    control,
    handleSubmit
  } = useForm({
    resolver: yupResolver(signUpFormSchema)
  });
  return <form onSubmit={handleSubmit(() => {})}>
      <div className="mb-4">
        <IconTextFormInput control={control} icon={BsPersonFill} placeholder="Full Name" label="Full Name *" name="fullName" />
      </div>
      <div className="mb-4">
        <IconTextFormInput control={control} icon={BsPhoneFill} placeholder="Phone Number" label="Phone Number *" name="phone" />
      </div>
      <div className="mb-4">
        <IconTextFormInput control={control} icon={BsEnvelopeFill} placeholder="E-mail" label="Email address *" name="email" />
      </div>
      <div className="mb-4">
        <IconTextFormInput type="password" control={control} icon={FaLock} placeholder="*********" label="Password *" name="password" />
      </div>
      <div className="mb-4">
        <IconTextFormInput type="password" control={control} icon={FaLock} placeholder="*********" label="Confirm Password *" name="confirmPassword" />
      </div>
      <div className="mb-4">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="checkbox-1" />
          <label className="form-check-label" htmlFor="checkbox-1">
            By signing up, you agree to the<a href="#"> terms of service</a>
          </label>
        </div>
      </div>
      <div className="align-items-center mt-0">
        <div className="d-grid">
          <button className="btn btn-primary mb-0" type="submit">
            Sign Up
          </button>
        </div>
      </div>
    </form>;
};
export default SingUpForm;
