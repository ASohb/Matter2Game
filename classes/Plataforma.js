// Classe Plataforma
class Plataforma {
    constructor(x, y, largura, altura) {
      this.corpo = Matter.Bodies.rectangle(x, y, largura, altura, { isStatic: true });
      this.largura = largura;
      this.altura = altura;
      Matter.World.add(mundo, this.corpo);
    }
  
    mostrar() {
      const posicao = this.corpo.position;
      fill(0, 255, 0);
      rectMode(CENTER);
      rect(posicao.x, posicao.y, this.largura, this.altura);
    }
  }
  