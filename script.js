class Cube {
    constructor() {
      this.reset();
    }
  
    reset() {
      this.faces = {
        U: ['w','w','w','w'],
        D: ['y','y','y','y'],
        F: ['g','g','g','g'],
        B: ['b','b','b','b'],
        L: ['o','o','o','o'],
        R: ['r','r','r','r']
      };
    }
  
    rotate(face) {
      const f = this.faces;
      switch(face) {
        case 'L':
          [f.U[0], f.U[2], f.F[0], f.F[2], f.D[0], f.D[2], f.B[3], f.B[1]] =
          [f.F[0], f.F[2], f.D[0], f.D[2], f.B[3], f.B[1], f.U[0], f.U[2]];
          [f.L[0], f.L[1], f.L[2], f.L[3]] = [f.L[2], f.L[0], f.L[3], f.L[1]];
          break;
        case 'R':
          [f.U[1], f.U[3], f.B[2], f.B[0], f.D[1], f.D[3], f.F[1], f.F[3]] =
          [f.F[1], f.F[3], f.U[1], f.U[3], f.B[2], f.B[0], f.D[1], f.D[3]];
          [f.R[0], f.R[1], f.R[2], f.R[3]] = [f.R[2], f.R[0], f.R[3], f.R[1]];
          break;
        case 'U':
          [f.B[0], f.B[1], f.R[0], f.R[1], f.F[0], f.F[1], f.L[0], f.L[1]] =
          [f.R[0], f.R[1], f.F[0], f.F[1], f.L[0], f.L[1], f.B[0], f.B[1]];
          [f.U[0], f.U[1], f.U[2], f.U[3]] = [f.U[2], f.U[0], f.U[3], f.U[1]];
          break;
        case 'D':
          [f.F[2], f.F[3], f.R[2], f.R[3], f.B[2], f.B[3], f.L[2], f.L[3]] =
          [f.R[2], f.R[3], f.B[2], f.B[3], f.L[2], f.L[3], f.F[2], f.F[3]];
          [f.D[0], f.D[1], f.D[2], f.D[3]] = [f.D[2], f.D[0], f.D[3], f.D[1]];
          break;
        case 'F':
          [f.U[2], f.U[3], f.R[0], f.R[2], f.D[1], f.D[0], f.L[3], f.L[1]] =
          [f.L[3], f.L[1], f.U[2], f.U[3], f.R[0], f.R[2], f.D[1], f.D[0]];
          [f.F[0], f.F[1], f.F[2], f.F[3]] = [f.F[2], f.F[0], f.F[3], f.F[1]];
          break;
        case 'B':
          [f.U[0], f.U[1], f.L[0], f.L[2], f.D[2], f.D[3], f.R[3], f.R[1]] =
          [f.R[3], f.R[1], f.U[0], f.U[1], f.L[0], f.L[2], f.D[2], f.D[3]];
          [f.B[0], f.B[1], f.B[2], f.B[3]] = [f.B[2], f.B[0], f.B[3], f.B[1]];
          break;
      }
    }
  
    scramble() {
      const moves = ['L', 'R', 'U', 'D', 'F', 'B'];
      for (let i = 0; i < 10; i++) {
        this.rotate(moves[Math.floor(Math.random() * moves.length)]);
      }
    }
  
    getState() {
      return JSON.stringify(this.faces, null, 2);
    }
  }
  
  const cube = new Cube();
  let solveSteps = [];
  let currentStep = 0;
  
  function rotate(face) {
    cube.rotate(face);
    animateOutput(`Rotated ${face} face\n\n` + cube.getState());
  }
  
  function scrambleCube() {
    cube.scramble();
    animateOutput("Scrambled Cube:\n\n" + cube.getState());
  }
  
  function startSolve() {
    solveSteps = ['L', 'R', 'U', 'D', 'F', 'B'];
    currentStep = 0;
    document.getElementById("nextStepBtn").style.display = "inline-block";
    animateOutput("Step-by-step solving started...\nClick 'Next Step' to proceed.");
  }
  
  function nextSolveStep() {
    if (currentStep < solveSteps.length) {
      let move = solveSteps[currentStep];
      cube.rotate(move);
      animateOutput(`Step ${currentStep + 1}: Rotate ${move} face\n\n` + cube.getState());
      currentStep++;
    } else {
      cube.reset();
      animateOutput("Cube Solved!\n\n" + cube.getState());
      document.getElementById("nextStepBtn").style.display = "none";
    }
  }
  
  function animateOutput(text) {
    const output = document.getElementById('output');
    output.innerText = text;
    output.style.animation = 'none';
    output.offsetHeight;
    output.style.animation = 'fadeSlide 0.6s ease-in-out';
  }
  