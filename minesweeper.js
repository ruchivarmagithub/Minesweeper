/* 

Let's play the minesweeper game!

You are given a 2D char matrix representing the game board. 
1. 'M' represents an unrevealed mine, 'E' represents an unrevealed empty square, 
2. 'B' represents a revealed blank square that has no adjacent
(above, below, left, right, and all 4 diagonals) mines, digit ('1' to '8')
represents how many mines are adjacent to this revealed square, 
and finally 'X' represents a revealed mine.

Now given the next click position (row and column indices)
 among all the unrevealed squares ('M' or 'E'), return the board after
  revealing this position according to the following rules:

1. If a mine ('M') is revealed, then the game is over - change it to 'X'.

2. If an empty square ('E') with no adjacent mines is revealed,
 then change it to revealed blank ('B') and all of its adjacent 
 unrevealed squares should be revealed recursively.

3. If an empty square ('E') with at least one adjacent mine is revealed, 
then change it to a digit ('1' to '8') representing the number of adjacent mines.

Return the board when no more squares will be revealed.

1st example:

[['E', 'E', 'E'],
 ['E', 'E', 'M'],
 ['E', 'E', 'E'],
 ['E', 'E', 'E']]


[['B', 1, 'E'],
 ['B', '1', 'M'],
 ['B', '1', '1'],
 ['B', 'B', 'B']]

next example:

[['E', 'E', 'E', 'E', 'E'],
 ['E', 'E', 'M', 'E', 'E'],
 ['E', 'E', 'E', 'E', 'E'],
 ['E', 'E', 'E', 'E', 'E']]

Click : [3,0]

Output: 

[['B', '1', 'E', '1', 'B'],
 ['B', '1', 'M', '1', 'B'],
 ['B', '1', '1', '1', 'B'],
 ['B', 'B', 'B', 'B', 'B']]

2nd example:
 Input: 

[['B', '1', 'E', '1', 'B'],
 ['B', '1', 'M', '1', 'B'],
 ['B', '1', '1', '1', 'B'],
 ['B', 'B', 'B', 'B', 'B']]

Click : [1,2]

Output:

[['B', '1', 'E', '1', 'B'],
 ['B', '1', 'X', '1', 'B'],
 ['B', '1', '1', '1', 'B'],
 ['B', 'B', 'B', 'B', 'B']]
*/

function minesweeper(matrix, row, col) {
    if (matrix[row][col] === "M") {
        // game over
        matrix[row][col] = "X";
        return matrix;
    }

    if (matrix[row][col] === "E") {
        // look for mines in the adjacent neighboring cells
        let count = 0;
        for (let i = row - 1; i <= row + 1 && i < M; i++) {
            for (let j = col - 1; j <= col + 1 && j < N; j++) {
                // check for Mines
                if (i >= 0 && j >= 0 && matrix[i][j] === "M") {
                    count++;
                }
            }
        }

        // if the count is 0 then that means that none of the neighbors of row and col are "M"
        if (count === 0) {
            matrix[row][col] = "B";

            // recursively use DFS to go down the adjacent / neigbors of row, col
            for (let i = row - 1; i <= row + 1 && i < M; i++) {
                for (let j = col - 1; j <= col + 1 && j < N; j++) {
                    // recursively call minesweeper on each neighbor iff its not already been revealed
                    if (i >= 0 && j >= 0 && matrix[i][j] === "E") {
                        minesweeper(matrix, i, j)
                    }
                }
            }
        } else {
            matrix[row][col] = count;
        }
    }

    return matrix;
}

var matrix = [['E', 'E', 'E', 'E', 'E'],
['E', 'E', 'M', 'E', 'E'],
['E', 'E', 'E', 'E', 'E'],
['E', 'E', 'E', 'E', 'E']];

var M = matrix.length;
var N = matrix[0].length;

console.log(minesweeper(matrix, 3, 0))