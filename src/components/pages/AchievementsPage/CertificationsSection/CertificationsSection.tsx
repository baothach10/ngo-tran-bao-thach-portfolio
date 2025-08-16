import { certifications, certificationCategories } from '@public/data/data.json';
import React, { Suspense, lazy, useRef } from 'react';

import CertificationCategorySectionSkeleton from '../CertificationCategorySection/CertificationCategorySectionSkeleton';
import './CertificationsSection.css';

import { SectionTitle } from '@/components/layout/SectionTitle/SectionTitle';

// Lazy load the CertificationCategorySection component
const CertificationCategorySection = lazy(
  () => import('../CertificationCategorySection/CertificationCategorySection')
);

type TCertificationCategory = {
  title: string;
  description: string;
};

type TCertificationSpecification = {
  category: string;
  title: string;
  issuer: string;
  issuerImage: string;
  issueDate: string;
  description: string;
  skillsLearned: string[];
};

const CertificationsSection = () => {
  const certificationsSectionRef = useRef<HTMLElement>(null);
  const categories = Object.keys(certificationCategories as Record<string, TCertificationCategory>);

  const renderCategory = (category: string) => {
    const { title, description } = (
      certificationCategories as Record<string, TCertificationCategory>
    )[category]!;

    const certificationsInformation = Object.fromEntries(
      Object.entries(certifications).filter(
        ([, certification]) => certification.category === category
      )
    ) as Record<string, TCertificationSpecification>;

    return (
      <Suspense
        key={category}
        fallback={<CertificationCategorySectionSkeleton certificationCount={2} />}
      >
        <CertificationCategorySection
          title={title}
          description={description}
          certifications={certificationsInformation}
        />
      </Suspense>
    );
  };

  return (
    <section ref={certificationsSectionRef} className="certifications-section-container">
      <div className="certifications-section-title">
        <SectionTitle content="My Certifications" />
      </div>
      <div className="certifications-section-content">{categories.map(renderCategory)}</div>
    </section>
  );
};

export default CertificationsSection;
