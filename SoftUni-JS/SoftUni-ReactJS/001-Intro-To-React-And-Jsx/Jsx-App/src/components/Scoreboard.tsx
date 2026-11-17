export default function Scoreboard({ scores }: { scores: Record<string, number> }) {
    return (
        <ul className="results">
            {Object.entries(scores).map(([player, score]) => (
                <li key={player}>
                    {player}: {score}
                </li>
            ))}
        </ul>
    );
}
