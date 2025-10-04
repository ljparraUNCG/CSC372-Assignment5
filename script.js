const game = () => {
    let player_score = 0;
    let cpu_score = 0;
    let tie_score = 0;
    let moves = 0;

    const playGame = () => {
        const rockBtn = document.querySelector('.rock');
        const paperBtn = document.querySelector('.paper');
        const scissorsBtn = document.querySelector('.scissors');
        const player_options = [rockBtn, paperBtn, scissorsBtn];
        const cpu_options = ['rock', 'paper', 'scissors'];
        const cpuImg = document.querySelector('.cpu-choice');

        player_options.forEach(option => {
            option.addEventListener('click', function () {

                if (option.disabled) return;

                player_options.forEach(btn => btn.disabled = true);

                player_options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');

                const movesLeft = document.querySelector('.movesleft');
                moves++;
                movesLeft.innerText = `Moves Left: ${5 - moves}`;

                const player_choice = this.alt.toLowerCase();

                let index = 0;
                const imagePaths = {
                    rock: 'images/rock.PNG',
                    paper: 'images/paper.PNG',
                    scissors: 'images/scissors.PNG'
                };

                const cycleInterval = setInterval(() => {
                    const keys = Object.keys(imagePaths);
                    cpuImg.src = imagePaths[keys[index]];
                    index = (index + 1) % keys.length;
                }, 500);

                setTimeout(() => {
                    clearInterval(cycleInterval);
                    const choice_number = Math.floor(Math.random() * 3);
                    const cpu_choice = cpu_options[choice_number];
                    cpuImg.src = imagePaths[cpu_choice];

                    winner(player_choice, cpu_choice);

                    if (moves < 5) {
                        player_options.forEach(btn => btn.disabled = false);
                    }

                    if (moves === 5) {
                        gameOver(player_options, movesLeft);
                    }
                }, 3000);
            });
        });
    };

    const winner = (player, cpu) => {
        const result = document.querySelector('.result');
        const player_Scoreboard = document.querySelector('.p-count');
        const cpu_Scoreboard = document.querySelector('.c-count');
        const tie_Scoreboard = document.querySelector('.t-count');

        if (player === cpu) {
            result.textContent = 'Tie';
            tie_score++;
            tie_Scoreboard.textContent = tie_score;
        } else if (
            (player === 'rock' && cpu === 'scissors') ||
            (player === 'scissors' && cpu === 'paper') ||
            (player === 'paper' && cpu === 'rock')
        ) {
            result.textContent = 'Player Won';
            player_score++;
            player_Scoreboard.textContent = player_score;
        } else {
            result.textContent = 'Computer Won';
            cpu_score++;
            cpu_Scoreboard.textContent = cpu_score;
        }
    };

    const gameOver = (player_options, movesLeft) => {
        const chooseMove = document.querySelector('.move');
        const result = document.querySelector('.result');
        const gameOverBox = document.querySelector('.game-over');
        const finalScoreText = document.querySelector('.final-score');
        const restartBtn = document.querySelector('.restart-btn');

        player_options.forEach(option => {
            option.style.display = 'none';
        });

        chooseMove.innerText = 'Game Over!!';
        movesLeft.style.display = 'none';
        result.textContent = '';

        let message = '';
        if (player_score > cpu_score) {
            message = `You Won!<br>Wins: ${player_score} | Losses: ${cpu_score} | Ties: ${tie_score}`;
        } else if (player_score < cpu_score) {
            message = `You Lost!<br>Wins: ${player_score} | Losses: ${cpu_score} | Ties: ${tie_score}`;
        } else {
            message = `It's a Tie!<br>Wins: ${player_score} | Losses: ${cpu_score} | Ties: ${tie_score}`;
        }

        finalScoreText.innerHTML = message;
        gameOverBox.style.display = 'flex';

        restartBtn.addEventListener('click', () => {
            window.location.reload();
        });
    };


    playGame();
};

game();





