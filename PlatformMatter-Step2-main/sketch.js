// Módulos do Matter.js
const Motor = Matter.Engine,
      Mundo = Matter.World,
      Corpos = Matter.Bodies;

// Variáveis principais
var motor, mundo;
var jogador;
var plataformas = [];
var imagemFundo;
var fundo;
function preload() {
  // Carregar a imagem de fundo
  imagemFundo = loadImage('imagens/background/ceuazul.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Cria o canvas em tela cheia
  fundo = createSprite(windowWidth / 2, windowHeight / 2)
  fundo.scale=4
  fundo.addImage(imagemFundo)
  // Criar o motor de física
  motor = Motor.create();
  mundo = motor.world;

  // Configure a gravidade do motor
  motor.world.gravity.y = 1; // 1 é um valor típico para gravidade

  // Configurações do jogador
  jogador = new Jogador(200, height - 200, 50, 50); // Iniciar próximo à parte inferior

  // Criar plataformas
  plataformas.push(new Plataforma(200, height - 150, 200, 20));
  plataformas.push(new Plataforma(400, height - 300, 200, 20));
  plataformas.push(new Plataforma(500, height - 450, 200, 20));
  plataformas.push(new Plataforma(900, height - 400, 200, 20));
  plataformas.push(new Plataforma(1080, height - 550, 200, 20));
  plataformas.push(new Plataforma(1080, height - 720, 200, 20));
}

function draw() {
  background("SkyBlue"); // Cor do céu
  Motor.update(motor); // Atualiza a física
  translate(-jogador.corpo.position.x + width / 2, -jogador.corpo.position.y + height / 2);       //A função translate() em bibliotecas gráficas, como no p5.js, altera o sistema de coordenadas, deslocando a origem (o ponto onde as coordenadas x = 0 e y = 0 estão localizadas) para um novo ponto. Isso permite desenhar formas ou realizar animações em relação à nova origem.
 drawSprites()
  // Mostrar plataformas
  for (var plataforma of plataformas) {
    plataforma.mostrar();
  }

  // Mostrar jogador
  jogador.mostrar();

  // Verificar colisão do jogador com as plataformas
  let tocandoAlgumaPlataforma = false;

  for (var plataforma of plataformas) {
    // Verificar se o jogador está tocando a plataforma
    if (jogadorEmCimaDaPlataforma(jogador, plataforma)) {
      tocandoAlgumaPlataforma = true; 
      break; // Sai do loop após detectar colisão
    }
  }

  // Atualizar o estado do jogador com base na colisão
  if (tocandoAlgumaPlataforma) {
    jogador.resetarPulos(); // Resetar pulos disponíveis
    jogador.noChao = true; // O jogador está no chão
  } else {
    jogador.noChao = false; // O jogador não está no chão
  }
}

// Função para verificar se o jogador está tocando a plataforma
function jogadorEmCimaDaPlataforma(jogador, plataforma) {
  const jogadorBaixo = jogador.corpo.position.y + jogador.altura / 2; // Parte inferior do jogador
  const plataformaTopo = plataforma.corpo.position.y - plataforma.altura / 2; // Parte superior da plataforma
  const collision = Matter.SAT.collides(jogador.corpo, plataforma.corpo);
  return collision.collided && jogadorBaixo >= plataformaTopo; // Verifica se o jogador está em cima da plataforma
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    jogador.mover(5); // Move para a direita
  } else if (keyCode === LEFT_ARROW) {
    jogador.mover(-5); // Move para a esquerda
  } else if (keyCode === UP_ARROW) {
    if (jogador.pulosDisponiveis > 0) { // Permite pular se houver pulos disponíveis
      jogador.pular(); // Pula
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Redimensiona o canvas
}
