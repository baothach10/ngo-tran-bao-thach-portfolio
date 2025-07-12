import './RoleIntroduction.css';

const RoleIntroduction = () => {
    return (
        <>
            <h1 aria-label="Hi! I'm a developer">
                Hi! I'm a&nbsp;<span className="typewriter"></span>
            </h1>

            <h1 aria-label="Hi! I'm a developer">
                Hi! I'm a&nbsp;<span className="typewriter thick"></span>
            </h1>

            <h1 aria-label="Hi! I'm a developer">
                Hi! I'm a&nbsp;<span className="typewriter nocaret"></span>
            </h1>
        </>
    );
};

export default RoleIntroduction;