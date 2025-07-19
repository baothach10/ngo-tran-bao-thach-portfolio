import './TechnologyItem.css';

type TTechnologyItemProps = {
    image?: string;
    name: string;
    children?: React.ReactNode;
};

export const TechnologyItem = ({ image, name, children }: TTechnologyItemProps) => {
    return (
        <div className="technology-item">
            <div className="technology-wrapper">
                <div className="technology-image-container">
                    {children ? (
                        <div className="technology-image">{children}</div>
                    ) : (
                        <img
                            loading='lazy'
                            className="technology-image"
                            src={image}
                            alt={name}
                        />
                    )}
                </div>
                <div className="technology-name">{name}</div>
            </div>
        </div>
    );
}