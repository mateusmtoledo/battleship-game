import githubIcon from './images/github.png';

const header = (() => {
  const container = document.createElement('header');

  const h1 = document.createElement('h1');
  h1.textContent = 'battleships';

  const githubLink = document.createElement('a');
  githubLink.classList.add('github-link');
  githubLink.href = 'https://github.com/mateusmtoledo';
  const githubImg = document.createElement('img');
  githubImg.src = githubIcon;
  githubImg.width = 32;
  githubImg.height = 32;
  const githubText = document.createElement('p');
  githubText.textContent = 'mateusmtoledo';
  githubLink.append(githubImg, githubText);

  container.append(h1, githubLink);

  return container;
})();

export default header;
