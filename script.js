const game = {
    xTurn: true, // a flag to switch between turns
    xState: [],  // the state of X, represented with an array of strings
    oState: [],  // the state of Y, represented in the same way
    winningStates: [ // the possible combinations to win the game
        // Rows (horizontal wins)
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],

        // Columns (vertical wins)
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],

        // Diagonal Wins
        ['0', '4', '8'],
        ['2', '4', '6']
    ]
}

// added event listener on document to create single event listener for each cell
document.addEventListener('click', event => {
  // Get the target element that was clicked
  const target = event.target;

  // Check if the target element has a 'grid-cell' class
  const isCell = target.classList.contains('grid-cell');

  // Check if the target element has a 'disabled' class
  const isDisabled = target.classList.contains('disabled');

  // If the clicked element is a grid cell and not disabled
  if (isCell && !isDisabled) {
    // Get the 'value' attribute from the target element's dataset
    const cellValue = target.dataset.value;

    // Check if it's the X player's turn and push the cell value to the X player's state
    game.xTurn === true
        ? game.xState.push(cellValue)
        : // If it's the O player's turn, push the cell value to the O player's state
        game.oState.push(cellValue);

    // Add the 'disabled' class to the target element, disabling further interaction
    target.classList.add('disabled');

    // Add the current player's symbol (either 'x' or 'o') to the target element
    target.classList.add(game.xTurn ? 'x' : 'o');

    // Toggle the current player (X or O)
    game.xTurn = !game.xTurn;
    
    // If all cells are disabled, then its draw
    // Check if there are no cells in the grid that are not disabled
    if (!document.querySelectorAll('.grid-cell:not(.disabled)').length) {
      // Show the 'game-over' element by adding the 'visible' class
      document.querySelector('.game-over').classList.add('visible');
  
      // Set the text content of the 'game-over-text' element to 'Draw!'
      document.querySelector('.game-over-text').textContent = 'Draw!';
    }
    
    // Iterate through each winning state in the game.winningStates array
    game.winningStates.forEach(winningState => {
      // Check if all the states in the winningState array are included in the X player's state
      const xWins = winningState.every(state => game.xState.includes(state));
  
      // Check if all the states in the winningState array are included in the O player's state
      const oWins = winningState.every(state => game.oState.includes(state));

      // If either X or O has won, disable all grid cells by adding the 'disabled' class
      if (xWins || oWins) {
      // Select all elements with the 'grid-cell' class and disable them
      document.querySelectorAll('.grid-cell').forEach(cell => cell.classList.add('disabled'));
    
      // Show the 'game-over' element by adding the 'visible' class
      document.querySelector('.game-over').classList.add('visible');
    
      // Set the text content of the 'game-over-text' element based on the winner
      document.querySelector('.game-over-text').textContent =
        xWins
          ? 'X wins!'
          : 'O wins!';
  }
})
  }
});

// restart the game with a click of the button
document.querySelector('.restart').addEventListener('click', () => {
    // Remove the 'visible' class from the '.game-over' element to hide it
    document.querySelector('.game-over').classList.remove('visible')
    
    // Iterate through all the elements with the '.grid-cell' class and remove the 'disabled', 'x', and 'o' classes from each cell
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.classList.remove('disabled', 'x', 'o')
    })

    // Reset the game state by setting xTurn to true and resetting both game.xState and game.oState arrays
    game.xTurn = true
    game.xState = []
    game.oState = []
})