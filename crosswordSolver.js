const crosswordSolver = (emptyPuzzle, words) => {
    // check emptyPuzzle
    // check words duplicates

    // create base (convert emptyPuzzle to 2d array)
    const base = intialize(emptyPuzzle)

    // create a variable hold paths 
        // path definsion {direction: "v" or "h", path: []int}
    const paths = getPaths(base)

    console.log(base)
    console.log(paths)

    // create a res var to hold the result (two deminsonal array)
}

const intialize = (emptyPuzzle) => {
    return emptyPuzzle.split("\n").map(item => item.split(""))
}

const getPaths = (puzzle) => {
    const paths = []
    let path = []

    for (let i = 0; i < puzzle.length; i++) {
        const row = puzzle[i]
        let start = false
        if (path.length > 1) {
            paths.push({path:[...path]})
            path = []
        } else {
            path = []
        }

        for (let k = 0; k < row.length; k++) {
            if (Number(row[k]) > 0 && !start) {
                start = true
                path.push({x: k, y: i})
            } else if (row[k] === "0" && start) {
                path.push({x: k, y: i})
            } else {
                start = false
                if (path.length > 1) {
                    paths.push({path:[...path]})
                }
                path = []
            }
        }
    }

    if (path.length > 1) {
        paths.push({path:[...path]})
        path = []
    }

    let row = 0
    
    while (row < puzzle[0].length) {
        let col = 0
        let start = false
        if (path.length > 1) {
            paths.push({path:[...path]})
            path = []
        } else {
            path = []
        }

        while (col < puzzle.length) {
            const item = puzzle[col][row]

            if (Number(item) > 0 && !start) {
                start = true
                path.push({x: row, y: col})
            } else if (item !== "." && start) {
                path.push({x: row, y: col})
            } else {
                start = false
                if (path.length > 1) {
                    paths.push({path:[...path]})
                }
                path = []
            }

            col++
        }

        row++
    }

    if (path.length > 1) {
        paths.push({path:[...path]})
        path = []
    }

    return paths
}

const puzzle = `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`

const words = ['casa', 'alan', 'ciao', 'anta']

crosswordSolver(puzzle, words)
console.log(puzzle.split("").filter(e => e === "1").length)

/* output:
`casa
i..l
anta
o..n`
*/