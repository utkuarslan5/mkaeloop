import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, LoginForm } from 'wasp/client/auth';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthWrapper } from './authWrapper';

type LoginPopUpProps = {
  setShowLoginPopUp: (show: boolean) => void;
};

export default function LoginPopUp({ setShowLoginPopUp }: LoginPopUpProps) {
  const history = useHistory();
  const { data: user } = useAuth();

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg relative'>
        <button
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
          onClick={() => setShowLoginPopUp(false)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
        <AuthWrapper>
          <LoginForm />
          <br />
          <span className='text-sm font-medium text-gray-900 dark:text-gray-900'>
            Don't have an account yet?{' '}
            <Link to='/signup' className='underline'>
              go to signup
            </Link>
            .
          </span>
          <br />
          <span className='text-sm font-medium text-gray-900'>
            Forgot your password?{' '}
            <Link to='/request-password-reset' className='underline'>
              reset it
            </Link>
            .
          </span>
        </AuthWrapper>
      </div>
    </div>
  );
}
