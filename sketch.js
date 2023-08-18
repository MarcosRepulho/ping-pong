let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;
let raio = diametro /2;
let colidiu = false;

// Variaveis do Oponente
let xRaqueteOponente= 585
let yRaqueteOponente= 155
let velocidadeYOponente;
let chanceDeErrar = 0;

//Placar do Jogo
let meusPontos = 0;
let pontosOponentes = 0;

//Sons do Jogo
let raquetada;
let trilha;
let ponto;

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  circle(xBolinha, yBolinha , diametro);
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //colisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente , yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente , yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
  
  
  if (xBolinha > width ||
     xBolinha < 0){
    velocidadexBolinha *= -1
  }
  if (yBolinha > height ||
     yBolinha < 0){
    velocidadeyBolinha *= -1;
  }
}

function mostraRaquete( x , y){
  rect(x , y , raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
}
 }

function colisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadexBolinha *= -1;
    raquetada.play();
  }

}

function verificaColisaoRaquete( x, y){
   colidiu=
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}


function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente -raqueteComprimento /2 -30
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
}


function incluiPlacar(){
  stroke(255, 255, 0)
  textAlign(CENTER)
  textSize(15);
  fill(color(255 , 140 , 0));
  rect(150, 10 , 40 , 20);
  fill(255)
  text(meusPontos , 170 , 26);
  fill(color(255 , 140 , 0));
  rect (450, 10 , 40, 20);
  fill(255);
  text(pontosOponentes, 470 , 26 );
}

function marcaPonto(){
  if (xBolinha > 600){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 0){
    pontosOponentes += 1;
    ponto.play();
  }

}

function calculaChanceDeErrar(){
  if (pontosOponentes >= meusPontos){
    chanceDeErrar += 1
    if (chanceDeErrar >= 90 ){
      chanceDeErrar = 40
    }
  }else{
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35
        
     }
  }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha + raio < 0){
    console.log('bolinha ficou presa');
    xBolinha = 300;
    }
}


 


