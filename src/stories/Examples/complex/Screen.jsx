import React from "react";
import "./Screen.scss";
//产品名片;
const ProductCard = [
  {
    id: 1,
    productName: "cuicui",
    description: "产品描述",
    price: 350,
    currency: "$",
    thumb: "/public/images/mv/1.jpg",
  },
  {
    id: 2,
    productName: "linlin",
    description: "产品描述",
    price: 288,
    currency: "$",
    thumb: "/public/images/mv/2.jpg",
  },
  {
    id: 3,
    productName: "jaja",
    description: "产品描述",
    price: 498,
    currency: "$",
    thumb: "/public/images/mv/3.jpg",
  },
  {
    id: 4,
    productName: "qiqi",
    description: "产品描述",
    price: 588,
    currency: "$",
    thumb: "/public/images/mv/4.jpg",
  },
  {
    id: 5,
    productName: "caca",
    description: "产品描述",
    price: 168,
    currency: "$",
    thumb: "/public/images/mv/5.jpg",
  },
  {
    id: 6,
    productName: "yaya",
    description: "产品描述",
    price: 366,
    currency: "$",
    thumb: "/public/images/mv/6.jpg",
  },
];

//标头
const Header = () => {
  return (
    <nav className="navs">
      <div className="logo">logo</div>
      <ul>
        <li>主页</li>
        <li> 产品</li>
        <li>关于我们</li>
        <li>联系我们</li>
      </ul>
      <div className="search">
        <i className="fa fa-search">1</i>
        <i className="fa fa-shopping-basket">2</i>
      </div>
    </nav>
  );
};
//页脚
const Footer = () => {
  return (
    <div className="footer">
      <p>copyright ©2020</p>
      <div className="social">
        <i className="fa fa-facebook">1</i>
        <i className="fa fa-instagram">2</i>
      </div>
    </div>
  );
};
//主要内容
const MainContent = () => {
  console.log(ProductCard);
  const listItems = ProductCard.map((item) => (
    <div className="card" key={item.id}>
      <div className="card_img">
        <img src={item.thumb} />
      </div>
      <div className="card_header">
        <h2>{item.productName}</h2>
        <p>{item.description}</p>
        <p className="price">
          {item.price}
          <span>{item.currency}</span>
        </p>
        <div className="btn">添加</div>
      </div>
    </div>
  ));

  return (
    <div className="main_content">
      <h3>主要内容</h3>
      {listItems}
    </div>
  );
};

export const Screen = () => {
  return (
    <div className="Container">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};
