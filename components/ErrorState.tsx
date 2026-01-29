interface ErrorStateProps {
    message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
    return (
        <div className="error">
            {message}
        </div>
    );
}