import React from 'react';
import './SingleCertificationSummary.css';
import { Link, useLocation } from 'react-router-dom';

interface ISingleCertificationSectionProps {
  readMoreLink: string;
  certificateInformation: TCertificationSpecification;
}

type TCertificationSpecification = {
  category: string;
  title: string;
  issuer: string;
  issuerImage: string;
  issueDate: string;
  description: string;
  skillsLearned: string[];
};

const SingleCertificationSummary: React.FC<ISingleCertificationSectionProps> = ({
  certificateInformation,
  readMoreLink
}) => {
  const location = useLocation();
  const fullPath = `${location.pathname}${readMoreLink}`;

  return (
    <div className="single-certification-summary-container">
      <div className="single-certification-image">
        <img
          src={certificateInformation.issuerImage}
          alt={certificateInformation.issuer}
          loading="lazy"
        />
      </div>
      <div className="single-certification-content">
        <h4 className="single-certification-title">{certificateInformation.title}</h4>
        <p className="single-certification-issuer">{certificateInformation.issuer}</p>
        <div className="read-more-button">
          <Link aria-label={`Read more about ${certificateInformation.title}`} to={fullPath}>READ MORE</Link>
        </div>
      </div>
    </div>
  );
};

export default SingleCertificationSummary;
