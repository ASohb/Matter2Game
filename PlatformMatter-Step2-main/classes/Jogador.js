// Classe Jogador
class Jogador {
  constructor(x, y, largura, altura) {
    this.corpo = Matter.Bodies.rectangle(x, y, largura, altura);
    this.largura = largura;
    this.altura = altura;
    this.pulosDisponiveis = 3;
    this.noChao = false; 
    Matter.World.add(mundo, this.corpo);

    // Carregar a animação
    this.animacao = loadAnimation(
      'imagens/jogador/j1.png',
      'imagens/jogador/j2.png',
      'imagens/jogador/j4.png',
      'imagens/jogador/j5.png',
      'imagens/jogador/j6.png'
    );
  }

  mostrar() {
    const posicao = this.corpo.position;

    // Reduzir a animação pela metade, com scale 0.5
    push(); // Salva a transformação de estilo atual
    translate(posicao.x, posicao.y); // Translada para a posição do jogador
    scale(0.5); // Redimensiona a animação para 50% do tamanho original
    animation(this.animacao, 0, 0); // Desenha a animação na nova escala
    pop(); // Restaura o estilo original
  }

  mover(direcao) {
    Matter.Body.setVelocity(this.corpo, { 
      x: direcao, // Define a velocidade horizontal
      y: this.corpo.velocity.y 
    });
  }

  pular() {
    if (this.pulosDisponiveis > 0) { // Permitir pulo se houver pulos disponíveis
      Matter.Body.setVelocity(this.corpo, {
        x: this.corpo.velocity.x,
        y: -10 // Força do pulo (ajuste conforme necessário)
      });
      this.pulosDisponiveis--; 
      this.noChao = false; 
    }
  }

  resetarPulos() {
    if (this.noChao) {
      this.pulosDisponiveis = 3; // Reseta os pulos disponíveis apenas quando estiver no chão
    }
  }
}