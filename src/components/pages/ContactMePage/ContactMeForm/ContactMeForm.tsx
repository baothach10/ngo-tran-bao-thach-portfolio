import './ContactMeForm.css';
import { send, init } from '@emailjs/browser';
import DOMPurify from 'dompurify';
import { gsap } from 'gsap';
import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContentProps, toast } from 'react-toastify';

import CustomProgressBar from '../CustomProgressBar/CustomProgressBar';

type TFormResponse = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

(function () {
  init({
    publicKey: import.meta.env.VITE_REACT_APP_PUBLIC_KEY,
    blockHeadless: true
  });
})();

const ContactMeForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TFormResponse>();
  const [isDisabled, setIsDisabled] = useState(false);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const scrollToTop = useCallback(() => {
    // Cancel any ongoing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Smooth scroll to top using GSAP for better control
    animationRef.current = gsap.to(window, {
      duration: 0.5,
      scrollTo: { y: 0 },
      ease: 'power2.out'
    });
  }, []);

  // Function that displays a success toast on bottom right of the page when form submission is successful
  const toastifySuccess = () => {
    toast.success(
      toastProps => (
        <CustomComponent
          {...toastProps}
          animationTime={4000}
          content="Sent your request to Thomas!"
        />
      ),
      {
        position: 'top-right',
        autoClose: 4000,
        customProgressBar: true,
        hideProgressBar: false,
        progressClassName: 'progress-bar',
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'submit-feedback success',
        toastId: 'success-toast'
      }
    );
  };

  const toastifyError = (errorMessage: string) => {
    toast.error(
      toastProps => <CustomComponent {...toastProps} animationTime={4000} content={errorMessage} />,
      {
        position: 'top-right',
        autoClose: 4000,
        customProgressBar: true,
        hideProgressBar: false,
        progressClassName: 'progress-bar',
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'submit-feedback error',
        toastId: 'error-toast'
      }
    );
  };

  // Function called on submit that uses emailjs to send email of valid contact form
  const onSubmit = async (data: TFormResponse) => {
    // Destrcture data object
    const { firstName, lastName, email, subject, message } = data;

    const cleanedFirstName = DOMPurify.sanitize(firstName);
    const cleanedLastName = DOMPurify.sanitize(lastName);
    const cleanedEmail = DOMPurify.sanitize(email);
    const cleanedSubject = DOMPurify.sanitize(subject);
    const cleanedMessage = DOMPurify.sanitize(message);

    const now = new Date();
    const readableDateTime = now.toLocaleString();

    try {
      // Disable form while processing submission
      setIsDisabled(true);

      // Define template params
      const templateParams = {
        name: cleanedFirstName + ' ' + cleanedLastName,
        email: cleanedEmail,
        subject: cleanedSubject,
        message: cleanedMessage,
        time: readableDateTime
      };
      scrollToTop();

      // Use emailjs to email contact form data
      await send(
        import.meta.env.VITE_REACT_APP_SERVICE_ID as string,
        import.meta.env.VITE_REACT_APP_TEMPLATE_ID as string,
        templateParams
      );

      // Reset contact form fields after submission
      reset({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });

      // Display success toast
      toastifySuccess();
      // Re-enable form submission
      setIsDisabled(false);
    } catch (error) {
      // Re-enable form submission on error
      setIsDisabled(false);

      // Extract error message
      let errorMessage = 'Failed to send message. Please try again.';

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object' && 'text' in error) {
        errorMessage = (error as { text?: string }).text || errorMessage;
      }

      // Reset contact form fields after submission
      reset({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });

      toastifyError(errorMessage);
    }
  };

  return (
    <div className="contact-form-container">
      <div className="contact-form-wrapper">
        <form id="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Row 1 of form */}
          <div className="input-container horizontal-container">
            <div className="input-wrapper">
              <label htmlFor="firstName" className="input-title">
                First name
              </label>
              <input
                type="text"
                {...register('firstName', {
                  required: {
                    value: true,
                    message: 'Please enter your first name'
                  },
                  maxLength: {
                    value: 30,
                    message: 'Please use 30 characters or less'
                  }
                })}
                className="form-control form-input"
                placeholder="First Name"
              ></input>
              {errors.firstName && (
                <span className="error-message">{errors.firstName.message?.toString()}.</span>
              )}
            </div>
          </div>
          <div className="input-container horizontal-container">
            <div className="input-wrapper">
              <label htmlFor="lastName" className="input-title">
                Last name
              </label>
              <input
                type="text"
                {...register('lastName', {
                  required: {
                    value: true,
                    message: 'Please enter your last name'
                  },
                  maxLength: {
                    value: 30,
                    message: 'Please use 30 characters or less'
                  }
                })}
                className="form-control form-input"
                placeholder="Last Name"
              ></input>
              {errors.lastName && (
                <span className="error-message">{errors.lastName.message?.toString()}.</span>
              )}
            </div>
          </div>

          <div className="input-container">
            <div className="input-wrapper">
              <label htmlFor="email" className="input-title">
                Email
              </label>
              <input
                type="email"
                {...register('email', {
                  required: true,
                  pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                })}
                className="form-control form-input"
                placeholder="Email address"
              ></input>
              {errors.email && (
                <span className="error-message">
                  Please enter a valid email address like "example@mysite.com".
                </span>
              )}
            </div>
          </div>

          {/* Row 2 of form */}
          <div className="input-container">
            <div className="input-wrapper">
              <label htmlFor="subject" className="input-title">
                Your requirements
              </label>
              <input
                type="text"
                {...register('subject', {
                  required: {
                    value: true,
                    message: 'Please enter something here'
                  },
                  maxLength: {
                    value: 75,
                    message: 'Subject cannot exceed 75 characters'
                  }
                })}
                className="form-control form-input"
                placeholder="Your requirements"
              ></input>
              {errors.subject && (
                <span className="error-message">{errors.subject.message?.toString()}.</span>
              )}
            </div>
          </div>

          {/* Row 3 of form */}
          <div className="input-container">
            <div className="input-wrapper">
              <label htmlFor="message" className="input-title">
                How can I help?
              </label>
              <textarea
                rows={5}
                {...register('message', {
                  required: true
                })}
                className="form-control form-input textarea"
                placeholder="Please feel free to outline your ideas and needs..."
              ></textarea>
              {errors.message && <span className="error-message">Please enter your message.</span>}
            </div>
          </div>

          <button className="submit-btn" disabled={isDisabled} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

type TCustomComponentProps = ToastContentProps & {
  content: string;
  animationTime?: number;
};

function CustomComponent({ isPaused, content, closeToast, animationTime }: TCustomComponentProps) {
  return (
    <div>
      <span>{content}</span>

      <CustomProgressBar
        duration={animationTime}
        isPaused={isPaused}
        onAnimationEnd={() => closeToast()}
      />
    </div>
  );
}

export default ContactMeForm;

