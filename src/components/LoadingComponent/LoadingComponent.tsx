import styles from './LoadingComponent.module.css'

const LoadingComponent = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loader}></div>
        </div>
    )
}

export default LoadingComponent