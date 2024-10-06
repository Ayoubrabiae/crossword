const crosswordSolver = (emptyPuzzle, words) => {
    // check emptyPuzzle
    // check words duplicates
    // check mismatch between words and paths
    if (!checkMismatch(emptyPuzzle, words)) {
        console.log("Error")
        return
    }

    // create base (convert emptyPuzzle to 2d array)
    const base = intialize(emptyPuzzle)

    // create a variable hold paths 
        // path definsion {path: [{x,y}]}
    const paths = getPaths(base)

    const puzzle = base.map(e => e.map(e => ""))

    const res = goTroughPaths(paths, [...puzzle], words)

    if (!res) {
        console.log("Error")
        return
    }

    const formatedResult = res.map(row => {
        return row.map(item => {
            if (item === "") {
                return "."
            } else {
                return item
            }
        }).join("")
    }).join("\n")

    console.log("%c"+formatedResult, "color: crimson; font-size: 25px;")
}

const intialize = (emptyPuzzle) => {
    return emptyPuzzle.split("\n").map(item => item.split(""))
}

const getPaths = (puzzle) => {
    const paths = []

    const rowPaths = getRowPaths(puzzle)
    paths.push(...rowPaths)

    const colPaths = getColPaths(puzzle)
    paths.push(...colPaths)

    return paths
}

const getRowPaths = (puzzle) => {
    const paths = []
    let path = []

    for (let i = 0; i < puzzle.length; i++) {
        const row = puzzle[i]
        let start = false
        
        if (path.length > 1) {
            paths.push([...path])
            path = []
        } else {
            path = []
        }

        for (let k = 0; k < row.length; k++) {
            if (Number(row[k]) > 0 && !start) {
                start = true
                path.push({x: k, y: i})
            } else if (row[k] !== "." && start) {
                path.push({x: k, y: i})
            } else {
                start = false
                if (path.length > 1) {
                    paths.push([...path])
                }
                path = []
            }
        }
    }

    if (path.length > 1) {
        paths.push([...path])
        path = []
    } else {
        path = []
    }

    return paths
}

const getColPaths = (puzzle) => {
    const paths = []
    let path = []

    let row = 0
    while (row < puzzle[0].length) {
        let col = 0
        let start = false

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
                    paths.push([...path])
                }
                path = []
            }

            col++
        }

        row++
    }

    if (path.length > 1) {
        paths.push([...path])
        path = []
    }

    return paths
}

const goTroughPaths = (paths, puzzle, words) => {
    // loop over the paths 
        // loop over the words and pick one
        // add it to the puzzle in the specific path
        // call goTroughPaths and send the paths without the chosen path and word and with new puzzle

    for (let i = 0; i < paths.length; i++) {
        for (let k = 0; k < words.length; k++) {
            const word = words[k]
            const path = paths[i]

            if (checker(path, word, puzzle)) {
                const newPaths = removeItem(paths, i)
                const newPuzzel = fillPath(paths[i], [...puzzle], words[k])
                const newWords = removeItem(words, k)

                const result = goTroughPaths(newPaths, newPuzzel, newWords)
                if (result === null) {
                    continue
                } else {
                    return result
                }
            }
        }
    }

    // return null if the paths or the words not finish
    // else return the puzzle
    if (paths.length !== 0 || words.length !== 0) {
        return null
    }
    return puzzle
}

// fill a path in the puzzle with a word
const fillPath = (path, puzzle, word) => {
    if (word.length != path.length) {
        return null
    }

    puzzle = puzzle.map(e => e.map(e => e))

    for (let i = 0; i < path.length; i++) {
        const [x, y] = [path[i].x, path[i].y]

        puzzle[y][x] = word[i]
    }

    return puzzle
}

// check if the word can be added to a specfic path in the puzzle
    // check if the length is the same
    // check if the fill cells in the path in the puzzle are the same in the word
const checker = (path, word, puzzle) => {
    if (path.length !== word.length) {
        return false
    }

    for (let i = 0; i < path.length; i++) {
        const [x, y] = [path[i].x, path[i].y]

        const cell = puzzle[y][x]
        if (cell !== "" && cell !== word[i]) {
            return false
        }
    }

    return true
}

const removeItem = (arr, i) => {
    return arr.filter((v, index) => index != i)
}

// Check if the words length doesn't match the word paths in the puzzle
const checkMismatch = (puzzle, words) => {
    let count = 0
    puzzle.split("").forEach(char => {
        if (Number(char) > 0) {
            count += Number(char)
        }
    })

    return words.length === count
}

const puzzle = '2001\n0..0\n2000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']

crosswordSolver(puzzle, words)