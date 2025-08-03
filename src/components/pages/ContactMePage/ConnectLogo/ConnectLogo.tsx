import { isMobileDevice } from '@/utils';
import './ConnectLogo.css'
type TConnectLogo = {
    width?: number | string;
    height?: number | string;
    className?: string;
}
const ConnectLogo = ({ width = 173, height = 19, className }: TConnectLogo) => {
    return (
        <div className='connect-logo-container'>
            <svg preserveAspectRatio="xMidYMid meet" data-bbox="0.16 0.792 172.355 17.616" className={`animated-name-graphic ${className}`} width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 173 19" data-type="ugc" role="presentation" aria-hidden="true" aria-label="">
                <path className='connect-logo' fill="url(#linear-gradient-contact-black-to-white)" d="M9.663 18H.16V1.2h2.76v14.208h6.744zm12.45 0h-9.696V1.2h9.696v2.472h-6.936v4.752h6.936v2.472h-6.936v4.632h6.936zm9.077 0h-2.76V3.792h-4.872V1.2h12.528v2.592H31.19zm8.933-16.872q-.216.84-.552 1.824a33 33 0 0 1-.744 1.968q-.384.96-.768 1.824h-1.56q.168-.672.336-1.44.192-.768.336-1.536.168-.792.288-1.536.144-.744.24-1.368h2.256zm7.123 17.28c-3.888 0-6.12-2.136-6.12-5.904h2.76c0 2.184 1.248 3.504 3.336 3.504 1.824 0 2.832-.84 2.832-2.352 0-1.272-.6-1.92-2.496-2.688l-2.736-1.104c-2.112-.816-3.216-2.328-3.216-4.464 0-2.736 2.208-4.608 5.376-4.608 3.336 0 5.544 2.088 5.544 5.256h-2.76c0-1.848-1.008-2.904-2.88-2.904-1.584 0-2.496.816-2.496 2.088 0 1.152.816 1.92 2.784 2.712l2.472 1.008c2.112.864 3.168 2.352 3.168 4.632 0 2.88-2.232 4.824-5.568 4.824m21.978 0c-5.472 0-8.736-3.672-8.736-8.808S63.752.792 69.224.792c4.632 0 7.632 2.616 8.136 6.168h-3.024c-.528-2.28-2.304-3.696-5.088-3.696-3.72 0-5.856 2.496-5.856 6.336s2.136 6.336 5.856 6.336c2.784 0 4.56-1.416 5.088-3.696h3.024c-.504 3.552-3.504 6.168-8.136 6.168m18.515 0c-5.448 0-8.688-4.008-8.688-8.808S82.29.792 87.739.792 96.427 4.8 96.427 9.6s-3.24 8.808-8.688 8.808m0-2.472c3.72 0 5.808-2.856 5.784-6.336.024-3.48-2.064-6.336-5.784-6.336S81.93 6.12 81.955 9.6c-.024 3.48 2.064 6.336 5.784 6.336M101.706 18h-2.64V1.2h2.904l6.648 12.192V1.2h2.64V18h-2.904l-6.648-12.192zm15.797 0h-2.64V1.2h2.904l6.648 12.192V1.2h2.64V18h-2.904l-6.648-12.192zm22.852 0h-9.696V1.2h9.696v2.472h-6.936v4.752h6.936v2.472h-6.936v4.632h6.936zm11.135.408c-5.472 0-8.736-3.672-8.736-8.808S146.018.792 151.49.792c4.632 0 7.632 2.616 8.136 6.168h-3.024c-.528-2.28-2.304-3.696-5.088-3.696-3.72 0-5.856 2.496-5.856 6.336s2.136 6.336 5.856 6.336c2.784 0 4.56-1.416 5.088-3.696h3.024c-.504 3.552-3.504 6.168-8.136 6.168M167.619 18h-2.76V3.792h-4.872V1.2h12.528v2.592h-4.896z"></path>
                <defs fill="none">
                    <linearGradient gradientUnits="userSpaceOnUse" y2="29" x2="85.5" y1="-8" x1="85.5" id="linear-gradient-contact-black-to-white">
                        <stop stopColor="#E6E6E6"></stop>
                        <stop stopColor="#090A0D" offset={isMobileDevice() ? '.6' : ".5"}></stop>
                        <stop stopColor="#000000" offset={isMobileDevice() ? '.7' : ".6"}></stop>
                    </linearGradient>
                </defs>
            </svg>
        </div>
    )
}

export default ConnectLogo