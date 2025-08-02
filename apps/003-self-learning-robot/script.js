document.addEventListener('DOMContentLoaded', () => {
    // Canvas setup
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Get info panel elements
    const robotPosDisplay = document.getElementById('robot-pos');
    const targetPosDisplay = document.getElementById('target-pos');
    const robotStatusDisplay = document.getElementById('robot-status');
    const resetButton = document.getElementById('reset-button');
    const newTargetButton = document.getElementById('new-target-button');

    // Game constants
    const CELL_SIZE = 20; // Size of each grid cell for discrete movement
    const ROBOT_SIZE = CELL_SIZE * 0.8; // Robot size, slightly smaller than cell
    const OBSTACLE_SIZE = CELL_SIZE * 2; // Obstacles are larger squares
    const GAME_WIDTH = 500; // Matches CSS max-width
    const GAME_HEIGHT = 400; // Matches CSS height
    const BORDER_THICKNESS = 2; // From CSS

    // Set canvas dimensions
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    // Robot properties
    let robot = {
        x: 0,
        y: 0,
        size: ROBOT_SIZE,
        color: '#ff5722', // Deep orange
        dx: 0, // Delta X for movement
        dy: 0, // Delta Y for movement
        // Learned movements: Maps intended action (e.g., 'move_up') to observed (dx, dy)
        // Initially empty, robot learns these through trial and error.
        learnedMoves: {},
        // Array to store past attempts and their outcomes for learning
        moveAttempts: [],
        status: 'Learning', // Current state: 'Learning', 'Navigating', 'Reached Target', 'Idle'
        learningRate: 0.1, // How quickly the robot updates its belief in moves
        explorationRate: 0.8, // Initial chance of trying a random move (decreases over time)
        minExplorationRate: 0.1,
        explorationDecay: 0.995, // Decay rate per step
        target: null, // Current target position
        path: [], // To store the path taken for visualization (optional)
        memory: {}, // To store associations between states and effective actions
        // Example: memory[{x: 100, y: 100}][action] = {effective_dx: 0, effective_dy: -20, outcome: 'clear'}
    };

    // Target properties
    let target = {
        x: 0,
        y: 0,
        size: ROBOT_SIZE * 0.7, // Slightly smaller than robot
        color: '#4CAF50' // Green
    };

    // Obstacle properties
    let obstacles = [];

    // --- Utility Functions ---

    /**
     * Clamps a value between a min and max.
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    function clamp(value, min, max) {
        return Math.max(min, Math.min(value, max));
    }

    /**
     * Converts world coordinates to canvas coordinates (top-left origin).
     * This simulation uses grid cells, so it's simpler:
     * (0,0) is top-left, (canvas.width, canvas.height) is bottom-right.
     * @param {number} x
     * @param {number} y
     * @returns {{canvasX: number, canvasY: number}}
     */
    function worldToCanvas(x, y) {
        // For a simple grid, world coords can directly map to grid cell top-left
        return { canvasX: x, canvasY: y };
    }

    /**
     * Generates a random position within the canvas boundaries, snapped to the grid.
     * @returns {{x: number, y: number}}
     */
    function getRandomGridPosition() {
        // Ensure positions are snapped to CELL_SIZE grid
        const randX = Math.floor(Math.random() * (canvas.width / CELL_SIZE)) * CELL_SIZE;
        const randY = Math.floor(Math.random() * (canvas.height / CELL_SIZE)) * CELL_SIZE;
        return { x: randX, y: randY };
    }

    /**
     * Generates random obstacles, ensuring they don't overlap.
     * For simplicity, they are fixed for now.
     */
    function generateObstacles() {
        obstacles = [];
        const numObstacles = 3; // Let's have a few fixed obstacles for now
        const minX = CELL_SIZE;
        const maxX = canvas.width - OBSTACLE_SIZE - CELL_SIZE;
        const minY = CELL_SIZE;
        const maxY = canvas.height - OBSTACLE_SIZE - CELL_SIZE;

        for (let i = 0; i < numObstacles; i++) {
            let newObstacle;
            let overlapping;
            do {
                overlapping = false;
                newObstacle = {
                    x: Math.floor(Math.random() * (maxX - minX + 1) / CELL_SIZE) * CELL_SIZE + minX,
                    y: Math.floor(Math.random() * (maxY - minY + 1) / CELL_SIZE) * CELL_SIZE + minY,
                    width: OBSTACLE_SIZE,
                    height: OBSTACLE_SIZE,
                    color: '#607d8b' // Blue-grey
                };

                // Check for overlap with existing obstacles and robot/target initial positions
                for (const existingObstacle of obstacles) {
                    if (checkCollision(newObstacle, existingObstacle)) {
                        overlapping = true;
                        break;
                    }
                }
                // Also ensure it doesn't overlap with initial robot or target (once set)
                // For now, robot and target are initialized after obstacles, so they can be placed clear.

            } while (overlapping); // Regenerate if overlaps
            obstacles.push(newObstacle);
        }
    }

    /**
     * Checks for AABB (Axis-Aligned Bounding Box) collision between two objects.
     * Assumes objects have x, y, width, height properties.
     * @param {{x: number, y: number, width: number, height: number}} rect1
     * @param {{x: number, y: number, width: number, height: number}} rect2
     * @returns {boolean}
     */
    function checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }

    /**
     * Checks if a potential robot position collides with any obstacle or canvas boundary.
     * @param {number} x - Proposed new robot X
     * @param {number} y - Proposed new robot Y
     * @param {number} size - Robot size
     * @returns {boolean} True if collision, false otherwise.
     */
    function isColliding(x, y, size) {
        // Boundary collision
        if (x < BORDER_THICKNESS || x + size > canvas.width - BORDER_THICKNESS ||
            y < BORDER_THICKNESS || y + size > canvas.height - BORDER_THICKNESS) {
            return true;
        }

        // Obstacle collision
        const robotBounds = { x: x, y: y, width: size, height: size };
        for (const obs of obstacles) {
            if (checkCollision(robotBounds, obs)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Calculates the Euclidean distance between two points.
     * @param {{x: number, y: number}} p1
     * @param {{x: number, y: number}} p2
     * @returns {number}
     */
    function getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    // --- Drawing Functions ---

    /**
     * Draws the robot on the canvas.
     */
    function drawRobot() {
        ctx.fillStyle = robot.color;
        ctx.fillRect(robot.x, robot.y, robot.size, robot.size);

        // Draw a small indicator for robot's "front" (e.g., in direction of dx, dy if it has a consistent one)
        // For learning, this might not be immediately meaningful, but useful for visual debugging.
        if (robot.dx !== 0 || robot.dy !== 0) {
            ctx.fillStyle = '#fff'; // White indicator
            const centerX = robot.x + robot.size / 2;
            const centerY = robot.y + robot.size / 2;
            // Simple arrow pointing in general direction of dx/dy
            if (robot.dx > 0) ctx.fillRect(centerX + ROBOT_SIZE / 4, centerY - ROBOT_SIZE / 8, ROBOT_SIZE / 4, ROBOT_SIZE / 4);
            else if (robot.dx < 0) ctx.fillRect(centerX - ROBOT_SIZE / 2, centerY - ROBOT_SIZE / 8, ROBOT_SIZE / 4, ROBOT_SIZE / 4);
            if (robot.dy > 0) ctx.fillRect(centerX - ROBOT_SIZE / 8, centerY + ROBOT_SIZE / 4, ROBOT_SIZE / 4, ROBOT_SIZE / 4);
            else if (robot.dy < 0) ctx.fillRect(centerX - ROBOT_SIZE / 8, centerY - ROBOT_SIZE / 2, ROBOT_SIZE / 4, ROBOT_SIZE / 4);
        }
    }

    /**
     * Draws the target on the canvas.
     */
    function drawTarget() {
        ctx.fillStyle = target.color;
        // Draw as a circle for differentiation
        ctx.beginPath();
        ctx.arc(target.x + target.size / 2, target.y + target.size / 2, target.size / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    /**
     * Draws all obstacles on the canvas.
     */
    function drawObstacles() {
        ctx.fillStyle = obstacles[0].color; // All obstacles have same color for now
        for (const obs of obstacles) {
            ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        }
    }

    /**
     * Clears the entire canvas.
     */
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * Updates the UI display elements.
     */
    function updateUI() {
        robotPosDisplay.textContent = `(${robot.x}, ${robot.y})`;
        targetPosDisplay.textContent = `(${target.x}, ${target.y})`;
        robotStatusDisplay.textContent = robot.status;
    }

    // --- Robot Learning and Movement Logic ---

    /**
     * Defines possible raw actions the robot can 'try'.
     * These are abstract labels, the robot learns what they *do*.
     */
    const possibleActions = ['up', 'down', 'left', 'right', 'stay'];

    /**
     * Chooses an action based on exploration/exploitation.
     * @param {{x: number, y: number}} currentPosition
     * @returns {string} The chosen action.
     */
    function chooseAction(currentPosition) {
        if (Math.random() < robot.explorationRate) {
            // Explore: Pick a random action
            return possibleActions[Math.floor(Math.random() * possibleActions.length)];
        } else {
            // Exploit: Pick the best known action towards the target
            return getBestKnownAction(currentPosition);
        }
    }

    /**
     * Determines the best known action based on stored learning (and target proximity).
     * @param {{x: number, y: number}} currentPosition
     * @returns {string} The action perceived to be best.
     */
    function getBestKnownAction(currentPosition) {
        let bestAction = 'stay';
        let minDistance = getDistance(currentPosition, target); // Current distance to target
        let bestPotentialPos = { x: currentPosition.x, y: currentPosition.y };

        // For each action, predict outcome based on learned moves
        for (const action of possibleActions) {
            if (robot.learnedMoves[action]) {
                const { effective_dx, effective_dy } = robot.learnedMoves[action];
                const potentialX = clamp(currentPosition.x + effective_dx, BORDER_THICKNESS, canvas.width - ROBOT_SIZE - BORDER_THICKNESS);
                const potentialY = clamp(currentPosition.y + effective_dy, BORDER_THICKNESS, canvas.height - ROBOT_SIZE - BORDER_THICKNESS);

                // Check if this potential move leads to a collision (if it's a known bad move)
                if (!isColliding(potentialX, potentialY, ROBOT_SIZE)) {
                    const potentialDistance = getDistance({ x: potentialX, y: potentialY }, target);
                    if (potentialDistance < minDistance) {
                        minDistance = potentialDistance;
                        bestAction = action;
                        bestPotentialPos = { x: potentialX, y: potentialY };
                    }
                }
            }
        }
        return bestAction;
    }


    /**
     * The robot attempts a raw action and observes the outcome for learning.
     * @param {string} action - The abstract action string (e.g., 'up', 'down')
     */
    function performTrialAndLearn(action) {
        const oldX = robot.x;
        const oldY = robot.y;

        let potentialDx = 0;
        let potentialDy = 0;

        // Apply a raw, unknown effect based on action string
        // This is where the "learning" happens - mapping these actions to actual movement
        // Initially, these are just fixed deltas. The robot will *learn* that 'up' implies dy < 0.
        switch (action) {
            case 'up':
                potentialDy = -CELL_SIZE;
                break;
            case 'down':
                potentialDy = CELL_SIZE;
                break;
            case 'left':
                potentialDx = -CELL_SIZE;
                break;
            case 'right':
                potentialDx = CELL_SIZE;
                break;
            case 'stay':
                // No movement
                break;
        }

        let newX = oldX + potentialDx;
        let newY = oldY + potentialDy;

        const collided = isColliding(newX, newY, ROBOT_SIZE);

        if (collided) {
            // Revert to old position if collided
            newX = oldX;
            newY = oldY;
            // Negative reinforcement for this move in this direction
            // For simplicity, we just won't update learnedMoves for bad moves.
            // A more complex system would reduce its "Q-value" for this state-action pair.
            robot.status = `Learning (Collision for ${action})`;
        } else {
            // Update robot's position
            robot.x = newX;
            robot.y = newY;

            // If a substantial move happened, reinforce learning
            const actualDx = robot.x - oldX;
            const actualDy = robot.y - oldY;

            if (Math.abs(actualDx) > 0 || Math.abs(actualDy) > 0) {
                // Update learnedMoves for this action
                // Use a simple average or weighted average to update knowledge
                if (!robot.learnedMoves[action]) {
                    robot.learnedMoves[action] = { effective_dx: actualDx, effective_dy: actualDy };
                } else {
                    robot.learnedMoves[action].effective_dx =
                        (robot.learnedMoves[action].effective_dx * (1 - robot.learningRate)) + (actualDx * robot.learningRate);
                    robot.learnedMoves[action].effective_dy =
                        (robot.learnedMoves[action].effective_dy * (1 - robot.learningRate)) + (actualDy * robot.learningRate);
                }
                robot.status = `Learning (Learned ${action})`;
            } else {
                robot.status = `Learning (No move for ${action})`;
            }
        }

        // Decay exploration rate over time
        robot.explorationRate = Math.max(robot.minExplorationRate, robot.explorationRate * robot.explorationDecay);
    }

    /**
     * Initializes or resets the simulation state.
     */
    function initializeSimulation() {
        // Reset robot to a random starting position without collision
        let startPos;
        do {
            startPos = getRandomGridPosition();
            robot.x = startPos.x;
            robot.y = startPos.y;
        } while (isColliding(robot.x, robot.y, ROBOT_SIZE));

        // Generate obstacles once
        generateObstacles();

        // Set initial target
        setNewTarget();

        robot.learnedMoves = {};
        robot.moveAttempts = [];
        robot.explorationRate = 0.8; // Reset exploration
        robot.status = 'Learning';
        robot.path = []; // Clear path
        robot.memory = {}; // Clear memory

        updateUI();
        draw();
    }

    /**
     * Sets a new random target, ensuring it doesn't overlap with the robot or obstacles.
     */
    function setNewTarget() {
        let newTargetPos;
        let overlapping;
        do {
            overlapping = false;
            newTargetPos = getRandomGridPosition();
            target.x = newTargetPos.x;
            target.y = newTargetPos.y;

            // Check overlap with robot
            if (checkCollision({ x: robot.x, y: robot.y, width: ROBOT_SIZE, height: ROBOT_SIZE },
                                { x: target.x, y: target.y, width: target.size, height: target.size })) {
                overlapping = true;
            }

            // Check overlap with obstacles
            for (const obs of obstacles) {
                if (checkCollision({ x: target.x, y: target.y, width: target.size, height: target.size }, obs)) {
                    overlapping = true;
                    break;
                }
            }
        } while (overlapping);
        updateUI();
        draw();
    }

    // --- Main Game Loop ---

    /**
     * Main update logic for the simulation.
     */
    function update() {
        const distanceToTarget = getDistance(robot, target);

        if (distanceToTarget < CELL_SIZE) { // Robot is very close to target
            robot.status = 'Reached Target';
            updateUI();
            // Stop animation or wait for new target
            return; // Stop updating if target reached
        }

        // If robot is still learning its movements
        if (robot.explorationRate > robot.minExplorationRate || Object.keys(robot.learnedMoves).length < possibleActions.length - 1) {
            // Continue learning
            performTrialAndLearn(chooseAction(robot)); // robot.chooseAction currently just picks random. Later it uses learnedMoves.
        } else {
            // Once sufficient learning has occurred, switch to navigation
            robot.status = 'Navigating';
            const action = getBestKnownAction(robot); // Use learned moves to navigate
            performTrialAndLearn(action); // Still use this for movement, as it handles collisions.
        }

        // Add current position to path for visualization (optional, could be heavy for long paths)
        // robot.path.push({x: robot.x, y: robot.y});

        updateUI();
    }

    /**
     * Main drawing logic for the simulation.
     */
    function draw() {
        clearCanvas();
        drawObstacles();
        drawTarget();
        drawRobot();

        // Draw path (optional)
        // ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)'; // Blue semi-transparent path
        // ctx.lineWidth = 1;
        // ctx.beginPath();
        // if (robot.path.length > 0) {
        //     ctx.moveTo(robot.path[0].x + ROBOT_SIZE / 2, robot.path[0].y + ROBOT_SIZE / 2);
        //     for (let i = 1; i < robot.path.length; i++) {
        //         ctx.lineTo(robot.path[i].x + ROBOT_SIZE / 2, robot.path[i].y + ROBOT_SIZE / 2);
        //     }
        // }
        // ctx.stroke();
    }

    /**
     * Animation loop.
     */
    let animationFrameId;
    function animate() {
        update();
        draw();
        animationFrameId = requestAnimationFrame(animate);
    }

    // --- Event Listeners ---
    resetButton.addEventListener('click', () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId); // Stop current animation
        }
        initializeSimulation();
        animate(); // Start new animation
    });

    newTargetButton.addEventListener('click', () => {
        setNewTarget();
        // If robot was previously at target, restart navigation
        if (robot.status === 'Reached Target' || robot.status === 'Idle') {
            robot.status = 'Navigating'; // Or 'Learning' if you want it to re-learn for new targets
            if (!animationFrameId) { // Only animate if not already running
                animate();
            }
        }
    });

    // Handle canvas resize (though current CSS fixed height, this is good practice)
    window.addEventListener('resize', () => {
        // If you make canvas size dynamic, update it here:
        // canvas.width = canvas.offsetWidth;
        // canvas.height = canvas.offsetHeight;
        draw(); // Redraw content on resize
    });

    // Initial setup and start the animation
    initializeSimulation();
    animate(); // Start the animation loop when the page loads
});
