# OpenFlix

Aplicativo gratuito para assistir filmes e séries.

## Descrição

O **OpenFlix** é uma plataforma open-source que permite ao usuário navegar, buscar e assistir filmes e séries em seu dispositivo móvel. Inspirado na experiência do Netflix, o projeto é ideal para quem busca alternativas livres e personalizáveis para entretenimento.

## Funcionalidades

- Catálogo de filmes e séries
- Busca por títulos
- Interface amigável para dispositivos móveis
- Sistema de navegação simples e intuitivo

## Como usar

1. Clone este repositório:
   ```bash
   git clone https://github.com/JonasCaetanoDeSouza/openflix.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o aplicativo:
   ```bash
   npm start
   ```

## Download

Você pode baixar o APK pronto para Android [clicando aqui](https://github.com/JonasCaetanoDeSouza/openflix/releases/download/1.0/openflix1.0.apk).

## Como compilar para Android usando Gradle

Para gerar o APK do aplicativo Android localizado na pasta `/android`, siga os passos abaixo:

1. **Acesse o diretório do projeto Android:**
   ```bash
   cd android
   ```

2. **Compile o APK de debug com o Gradle Wrapper:**
   ```bash
   ./gradlew assembleDebug
   ```
   O APK será gerado em:
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

3. **Para gerar o APK de release:**
   ```bash
   ./gradlew assembleRelease
   ```
   O APK será gerado em:
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

> **Observação:** Para compilar o APK de release, é necessário configurar uma keystore no arquivo `android/app/build.gradle`. Se você precisar de ajuda para configurar a keystore, consulte a documentação do Android ou peça orientação.

**Pré-requisitos:**  
- Java JDK 8 ou superior  
- Android SDK  
- Gradle (o projeto já inclui o Gradle Wrapper)

## Screenshots

<table>
  <tr>
    <td><img src="https://github.com/JonasCaetanoDeSouza/openflix/blob/main/assets/Screenshot%20(1).png" alt="Screenshot 1" width="300"></td>
    <td><img src="https://github.com/JonasCaetanoDeSouza/openflix/blob/main/assets/Screenshot%20(2).png" alt="Screenshot 2" width="300"></td>
  </tr>
</table>

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob os termos da licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

**Autor:** [JonasCaetanoDeSouza](https://github.com/JonasCaetanoDeSouza)
