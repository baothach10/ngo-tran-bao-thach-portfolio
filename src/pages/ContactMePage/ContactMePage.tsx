import React from 'react';

import LazyOnScroll from '@/components/layout/LazyOnScroll';
import './ContactMePage.css';

// const LazyTesting = React.lazy(() => import('@/components/Testing/Testing'));

const ContactMePage: React.FC = () => {
  return (
    <div className="contact-me">
      {/* {[
        'lightblue',
        'lightgreen',
        'lightcoral',
        'lightgoldenrodyellow',
        'lightblue',
        'lightgreen',
        'lightcoral',
        'lightgoldenrodyellow'
      ].map((color, index) => (
        <LazyOnScroll
          key={index}
          Component={LazyTesting}
          componentProps={{ backgroundColor: color }}
          fallback={<GenericSectionSkeleton height={'5vh'} width={'5vw'} textLines={6} />}
          autoAdjustHeight={true}
          placeholder={<GenericSectionSkeleton height={'5vh'} width={'5vw'} textLines={6} />}
        />
      ))} */}
    </div>
  );
};
export default ContactMePage;

