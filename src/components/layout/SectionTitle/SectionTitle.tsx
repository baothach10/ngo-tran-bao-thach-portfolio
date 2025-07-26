import './SectionTitle.css';

type TSectionTitle = {
    content: string
}

export const SectionTitle = ({ content }: TSectionTitle) => {
    return (
        <div className="section-title-container">
            <h2 className="section-title-content">{content}</h2>
        </div>
    )
}