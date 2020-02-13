# Face Login 

## Índice
* [1. Visão do Produto](#1-Visão-do-Produto)

* [2. Histórias de Usuário Implementadas](#2-Histórias-de-Usuário-Implementadas)

* [3. Características Técnicas](#3-Características-Técnicas)

* [4. Ferramentas Técnicas e Métodos Utilizados](#4-Ferramentas-Técnicas-e-Métodos-Utilizados)

* [5. Tempo do Projeto](#5-Tempo-do-Projeto)

* [6. Futuras Implementações](#6-Futuras-Implementações)

## 1. Visão do Produto 

Segurança é um problema cada vez maior hoje em dia e garanti-la em meios não digitais pode ser ainda mais complexo.  

O processo de se identificar em eventos ou em pontos de acesso é sempre um processo muito chato e manual. Além disso, conta normalmente com muitas filas e quase sempre é assistido por dispositivos ou acessórios para garantir a identificação.  

Porém, para garantir melhor experiência para as pessoas é possível fazer sua identificação sem usuários ou senhas e dispositivos utilizando o reconhecimento facial.

Assim, foi proposto o desenvolvimento de um site/app de identificação e cadastro utilizando a API de *Facial Recognition da Microsoft*. 

## 2. Histórias de Usuário Implementadas 

1. Cadastro de rostos para reconhecimento 
2. Reconhecimento facial 
3. Site/App com câmera 
4. Reconhecimento facial com foto do site/app 

### Desafios extras: 

5. Cadastro de rostos via site/app 
6. Base de personagens 
7. Escolher personagens no cadastro 
8. Exibir personagem no reconhecimento 
 
## 3. Características Técnicas

A API da Microsoft de Reconhecimento Facial é uma ótima ferramenta para a situação descrita e, portanto, o seu uso foi imprescindível. 

### Cadastro 

Para cadastrar um rosto, foi importante primeiro criar um grupo de pessoas na própria API, por meio do _PersonGroup - Create_. 

Todos os rostos são comparados dentro deste grupo. Após a criação de um grupo, é possível cadastrar os rostos do usuário. 
 
### Verificação

Para identificar a quem pertence determinado rosto, foi necessário comparar a imagem contra a lista de rostos que tenham um faceId associado.

 Para isso, foi gerado um FaceId para a foto capturada que, ao ser jogada contra o grupo, retorna com os FaceIds de possíveis candidatos. Para ter o nome da pessoa associada ao FaceId mais uma última chamada é feita com o FaceId do candidato no grupo. 
 
### Site/App 

Para a criação de uma autenticação, foi necessário o desenvolvimento de um site ou app com câmera para que a foto seja tirada e enviada ao Face API para a identificação ou cadastro das pessoas. 
 
## 4. Ferramentas Técnicas e Métodos Utilizados

1. _Firebase Storage_
2. API _Facial Recognition_ da Microsoft;
3. _PersonGroup - Create_
4. _PersonGroup Person - Create_
5. _PersonGroup Person - Add Face_
6. _PersonGroup Person - Get_

## 5. Tempo do Projeto

O projeto foi desenvolvido em 2 (dois) dias.

## 6. Futuras Implementações

* Tempo de Resposta;
* Cadastro de forma interativa;
* Verificação da imagem enviada; e
* Reconhecimento de múltiplas faces.


