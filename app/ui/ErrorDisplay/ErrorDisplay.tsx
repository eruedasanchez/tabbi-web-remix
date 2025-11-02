import style from "./ErrorDisplay.module.css"

interface ErrorDisplayProps {
    message: string
    details: string
    stack?: string
}

const ErrorDisplay = ({ message, details, stack }: ErrorDisplayProps) => {
    return (
        <main className={style.errorContainer}>
            <h1 className={style.errorTitle}>{message}</h1>
            <p className={style.errorDetails}>{details}</p>
            {stack && (
                <pre className={style.errorPre}>
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    )
}

export default ErrorDisplay