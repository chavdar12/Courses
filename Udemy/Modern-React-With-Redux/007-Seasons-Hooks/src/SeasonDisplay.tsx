export type Season = 'summer' | 'winter';

const config = {
    summer: { text: "Let's hit the beach!", icon: '☀️' },
    winter: { text: 'Brr, it is cold!', icon: '❄️' },
};

// month is 0-based like Date#getMonth; April-September is summer in the northern hemisphere
export function getSeason(lat: number, month: number): Season {
    const northernSummer = month > 2 && month < 9;
    return northernSummer === lat > 0 ? 'summer' : 'winter';
}

export default function SeasonDisplay({
    lat,
    month = new Date().getMonth(),
}: {
    lat: number;
    month?: number;
}) {
    const season = getSeason(lat, month);
    const { text, icon } = config[season];
    return (
        <div className={`season-display ${season}`}>
            <span aria-hidden="true">{icon}</span>
            <h1>{text}</h1>
        </div>
    );
}
