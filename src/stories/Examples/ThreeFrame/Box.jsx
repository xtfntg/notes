import * as THREE from "three";

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(geometry, material);

export default box;

const App = React.createClass({
  getInitialState: function () {
    return {
      modal: false,
    };
  },

  modalToggle: function () {
    this.setState({ modal: !this.state.modal });
  },

  render: function () {
    return (
      <div>
        <button className="place-order" onClick={this.modalToggle}>
          <span className="fa fa-shopping-cart"></span>
        </button>
        <Modal onClick={this.modalToggle} status={this.state.modal} />
      </div>
    );
  },
});
