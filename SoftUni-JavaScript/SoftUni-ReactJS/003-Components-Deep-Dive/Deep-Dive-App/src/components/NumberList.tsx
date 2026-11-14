function ListItem({value}: {value: number}) {
    return <li>{value}</li>;
}

export default function NumberList({numbers}: {numbers: number[]}) {
    // The key stays on the element inside the array, not inside ListItem
    return <ul>{numbers.map(n => <ListItem key={n} value={n * 2}/>)}</ul>;
}
