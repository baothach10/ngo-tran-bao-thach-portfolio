import { ReactNode } from 'react';

import styles from './ExpertiseBlock.module.css';

import GlareHover from '@/components/GlareHoverCard/GlareHoverCard';
import SpotlightCard from '@/components/SpotlightCard/SpotlightCard';

type TExpertiseBlock = {
    icon: ReactNode,
    title: string,
    description: string,
    tools: string[]
}

export const ExpertiseBlock = ({ icon, title, description, tools }: TExpertiseBlock) => {
    return (
        <div className={styles.container}>
            <SpotlightCard>
                <div className={styles.wrapper}>
                    <div className={styles.icon}>
                        <div className={styles.blurry}></div>
                        {icon}
                    </div>
                    <div className={styles.title}>
                        <h3>
                            {title}
                        </h3>
                    </div>
                    <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} >

                    </div>
                    <div className={styles.tools}>
                        {tools.map((tool, index) => (
                            <div className={styles.tool} key={index}>
                                <GlareHover>
                                    {tool}
                                </GlareHover>
                            </div>
                        ))}
                    </div>
                </div>
            </SpotlightCard>
        </div>
    )
}