export default (props) => {
  const el = document.createElement('button');
  el.innerText = props.text;
  return el;
};
