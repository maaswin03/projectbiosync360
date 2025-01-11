import { SignIn } from '@clerk/clerk-react';
import './Login.css';

const Login: React.FC = () => {

  return (
    <div>
      <div className='login1'>
        <SignIn />
      </div>
    </div>
  );
};

export default Login;
