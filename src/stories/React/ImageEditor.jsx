import React, { useState } from "react";
import "./ImageEditor.scss";
import ReactCrop from "react-image-crop";
import "react-image-crop/src/ReactCrop.scss";
import { GrRotateLeft, GrRotateRight } from "react-icons/gr";
import { CgMergeVertical, CgMergeHorizontal } from "react-icons/cg";
import { IoMdUndo, IoMdRedo, IoIosImage } from "react-icons/io";
export const ImageEditor = () => {
  const filterElement = [
    { name: "brightness", maxValue: 200 },
    { name: "grayscale", maxValue: 200 },
    { name: "sepia", maxValue: 200 },
    { name: "saturate", maxValue: 200 },
    { name: "对比", maxValue: 200 },
    { name: "色调反转", maxValue: 200 },
  ];
  const [property, setProperty] = useState({ name: "明度", maxValue: 200 });
  const [details, setDetails] = useState("");
  const [crop, setCrop] = useState("");
  const [state, setState] = useState({
    image: "",
    brightness: 100,
    grayscale: 0,
    sepia: 0,
    saturate: 100,
    contrast: 100,
    hueRotate: 0,
    rotate: 0,
    vartical: 1,
    horizental: 1,
  });

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const leftRotate = () => {
    setState({ ...state, rotate: state.rotate - 90 });
  };
  const rightRotate = () => {
    setState({ ...state, rotate: state.rotate + 90 });
  };

  const varticalFlip = () => {
    setState({ ...state, vartical: state.vartical === 1 ? -1 : 1 });
  };
  const horizentalFlip = () => {
    setState({ ...state, horizental: state.horizental === 1 ? -1 : 1 });
  };

  const redo = () => {};
  const undo = () => {};

  const imageHandle = (e) => {
    if (e.target.files.length !== 0) {
      //读取 =新建 读取本地文件
      const reader = new FileReader();
      reader.onload = () => {
        setState({ ...state, image: reader.result });

        const stateData = {
          image: reader.result,
          brightness: 100,
          grayscale: 0,
          sepia: 0,
          saturate: 100,
          contrast: 100,
          hueRotate: 0,
          rotate: 0,
          vartical: 1,
          horizental: 1,
        };
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const imageCrop = () => {
    const canvas = document.createElement("canvas");
    const scaleX = details.naturalWidth / details.width;
    const scaleY = details.naturalHeight / details.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      details,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Url = canvas.toDataURL("image/jpg");

    setState({
      ...state,
      image: base64Url,
    });
  };

  const saveImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = details.naturalHeight;
    canvas.height = details.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.filter = `brightness(${state.brightness}%)grayscale(${state.grayscale}%)sepia(${state.sepia}%)
saturate(${state.saturate}%)contrast(${state.contrast}%) hue-Rotate(${state.hueRotate}deg)`;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((state.rotate * Math.PI) / 180);
    ctx.scale(state.vartical, state.horizental);
    ctx.drawImage(
      details,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );

    const link = document.createElement("a");
    link.download = "image_edit.jpg";
    link.href = canvas.toDataURL();
    link.click();
  };
  return (
    <div className="image_editor">
      <div className="card">
        <div className="card_header">
          <h2>---图像编辑器---</h2>
        </div>
        <div className="card_body">
          <div className="sidebar">
            <div className="side_body">
              <div className="filter_section">
                <span>过滤器</span>
                <div className="filter_key">
                  {filterElement.map((v, i) => (
                    <button
                      className={property.name === v.name ? "active" : ""}
                      onClick={() => setProperty(v)}
                      key={i}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="filter_slider">
                <div className="label_bar">
                  <label htmlFor="range">旋转</label>
                  <span>100%</span>
                </div>
                <input
                  name={property.name}
                  onChange={inputHandle}
                  value={state[property.name]}
                  max={property.maxValue}
                  type="range"
                />
              </div>
              <div className="rotate">
                <label htmlFor="">旋转&翻转</label>
                <div className="icon">
                  <div onClick={leftRotate}>
                    <GrRotateLeft />
                  </div>
                  <div onClick={rightRotate}>
                    <GrRotateRight />
                  </div>
                  <div onClick={varticalFlip}>
                    <CgMergeVertical />
                  </div>
                  <div onClick={horizentalFlip}>
                    <CgMergeHorizontal />
                  </div>
                </div>
              </div>
            </div>
            <div className="reset">
              <button>重置</button>
              <button onClick={saveImage} className="save">
                保存
              </button>
            </div>
          </div>
          <div className="image_section">
            <div className="image">
              {state.image ? (
                <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                  <img
                    onLoad={(e) => setDetails(e.currentTarget)}
                    style={{
                      filter: `brightness(${state.brightness}%)grayscale(${state.grayscale}%)sepia(${state.sepia}%)
                    saturate(${state.saturate}%)contrast(${state.contrast}%) hue-Rotate(${state.hueRotate}deg)`,
                      transform: `rotate(${state.rotate}deg) scale(${state.vartical},${state.horizental})`,
                    }}
                    src={state.image}
                    alt=""
                  />
                </ReactCrop>
              ) : (
                <label htmlFor="choose">
                  <IoIosImage />
                  <span>选择图像</span>
                </label>
              )}
            </div>
            <div className="image_select">
              <button onClick={undo} className="undo">
                <IoMdUndo />
              </button>
              <button onClick={redo} className="redo">
                <IoMdRedo />
              </button>
              {crop && (
                <button onClick={imageCrop} className="crop">
                  裁剪图片
                </button>
              )}
              <label htmlFor="choose">选择图像</label>
              <input onChange={imageHandle} type="file" id="choose" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
