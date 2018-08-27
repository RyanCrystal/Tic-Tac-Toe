
function Square(props) {
  return (
    <button className= {(props.flag2)? "squareHigh":"square" } onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        flag2 = {this.props.flag[i]}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  
   block1(m,n) {
   let indents = [];
  for(i = 0; i < m; i++)
         
   { indents.push(  <div className="board-row"   key= {100*i+10*n+100} >
          {this.renderSquare(3*i+n)}
          </div>);}
    return( <div key ={1000*i+100*n+1000}>
      {indents}
      </div>
      )
  
};
   block2(m) {
   let inden = [];
  for(let i = 0; i < m; i++)
         
   { inden.push(  this.block1(m,i));}
    return( <div id='oh'  >
      {inden}
      </div>
      )
  
};
  

  render() {
    //let i = 5
    return (
      
     this.block2(3)
      //this.block1(3)
  
      
    );
    } 
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      x: Array(9).fill(null),
      y: Array(9).fill(null),
      toggleFlag: true,
     stepToggle:0,
      jumpToFlag:false
    // p:0
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let x1 = this.state.x;
    let y1 = this.state.y;
   // let draw = '';
    x1[this.state.stepNumber] = Math.floor(i/3+1);
    y1[this.state.stepNumber] = Math.floor(i%3+1);
     
    
    
    if (calculateWinner(squares) || squares[i]) 
    {//document.getElementById(100).innerHTML = "red";
    // document.body.background = 'blue';
   //  document.body.style.backgroundColor = "blue";
      return;}
    
        
    
    squares[i] = this.state.xIsNext ? "X" : "O";
    
    // document.getElementById(100).style.color = "red";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
       x:x1,
      y:y1,
      stepNumber: history.length,
      stepToggle: history.length,
      xIsNext: !this.state.xIsNext
      
     
    });

  }

  jumpTo(step) {
    this.setState({
      //p:step,
      jumpToFlag :true,
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
    
    for( let j = 0; j<this.state.history.length; j++)
      document.getElementById(j).style.fontWeight = "500"; 
    if(this.state.toggleFlag)
    document.getElementById(step).style.fontWeight = "900"; 
    else
      if(step)
      document.getElementById(this.state.stepToggle-step+1).style.fontWeight = "900";
    else
      document.getElementById(0).style.fontWeight = "900";
  }
  
  toggle(){
    this.setState({
    toggleFlag : !this.state.toggleFlag
     
    }
     // xIsNext: (step % 2) === 0}
    )
   
     if(this.state.stepNumber && this.state.jumpToFlag)
     {this.jumpTo( this.state.stepToggle -this.state.stepNumber+1)
     this.setState({
   stepNumber : this.state.stepNumber 
     
    }
  //  else this.jumpTo(this.state.stepToggle - this.state.p +1)
  )}}

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const x= this.state.x
    const y = this.state.y
    let draw = ''
   // let winSquare = []
    //if(winner) winSquare = highlightSquare(current.squares)
      
    
    if(this.state.stepNumber===9&&(!winner))
       draw = 'Draw!!'
   
   // const toggleStep = this.state.stepNumber
    let history1 = history.slice()
     

    
         const moves =(this.state.toggleFlag)?
               history.map((step, move) => {
   
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      if(move===0)
       return( <button id='0' key={move} onClick={() => this.jumpTo(move)}>{desc}</button>)
      else
      return (
        <li key={move}>
          <button id = {move} onClick={() => this.jumpTo(move)}>{desc}</button>
           ({x[move-1]},  {  y[move-1]})
                 
        </li>
      );
    }):
         history1.reverse().map((step, move) => {
   
      const desc = move ?
        'Go to move #' + (this.state.stepToggle-move+1) :
        'Go to game start';
      if(move===0)
       return( <button id='0' key={move} onClick={() => this.jumpTo(0)}>{desc}</button>)
      else
      return (
        <li key={move}>
          <button id = {move} onClick={() => this.jumpTo(this.state.stepToggle-move+1)}>{desc}</button>
           ({x[this.state.stepToggle-move]},  {  y[this.state.stepToggle-move]})
                 
        </li>
      );
    })
// document.getElementById(100).style.Color = 'red'
       let flag = Array(9).fill(0)
 flag = squareHighlight(current.squares)
    let status;
    if (winner) {
       
      status = "Winner: " + winner;
      
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    if(this.state.toggleFlag)

    return (
      <div className="game">
        <div className="game-board">
          <Board
              flag = {flag}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          
          />
        </div>
        <div className="game-info">
          <button className ="toggle" onClick={()=>this.toggle()}>{'toggle'}</button>
          <div>{status}</div>
          <ol >{moves}</ol>
          <div>{draw}</div>
         
        </div>
      </div>
    );
    else
       return (
      <div className="game">
        <div className="game-board">
          <Board
              flag = {flag}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <button className ="toggle" onClick={()=>this.toggle()}>{'toggle'}</button>
          <div>{status}</div>
          <ol reversed>{moves}</ol>
           <div>{draw}</div>
         
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) 
{
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
function squareHighlight(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let flag1 =  [0,0,0,0,0,0,0,0,0]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      flag1[a]= 1;
      flag1[b]= 1;
      flag1[c]= 1;
      
      return flag1;
    }
  }
  return flag1;
}



#oh{
  display: flex;
}

.squareHigh {
  background: red;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}