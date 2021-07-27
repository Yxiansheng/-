function add (a: number, b: number): number;
function add (a: string, b: string): string; 

function add (a: string | number, b: string | number): number | string {
    return typeof a === 'string' || typeof b === 'string' ? `${a}${b}` : a + b
}

add({}, 2)
add(1, 2) // 3
add('2', '3') // 5