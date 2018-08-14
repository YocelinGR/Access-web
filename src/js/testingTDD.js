import registryButton from '../components/registryButton';

export default () => {
  const page = document.createElement('div');
  page.className = 'registry';
  page.appendChild(registryButton());
  return page;
};
