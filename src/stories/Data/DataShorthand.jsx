import React, { useEffect, useRef, useState } from "react";
//格式1
const drinks = {
  茶: {
    part: "叶子",
    caffeine: "15–70 mg/cup",
    age: "4,000+ years",
  },
  咖啡: {
    part: "豆类",
    caffeine: "80–185 mg/cup",
    age: "1,000+ years",
  },
};

//格式2
//产品名片;
export const ProductCard = [
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
];
//格式3
/* 产品信息  
     产品：“Acer Nitro 5”，
     图像：“/public/images/mv/1.jpg”，
     顾客：“乔霍·史密斯”，
     日期：“3月1日”，
     数量:785,
     方法：“货到付款”，
     状态：“批准”，
     描述：“1111”，
     价格：350,
     货币："$", */
export const GirlData = () => {
  //行
  const rows = [
    {
      id: 1,
      product: "Acer Nitro 5",
      img: "/public/images/mv/1.jpg",
      customer: "Joho smith",
      date: "1 march",
      amount: 785,
      method: "cash on delivery",
      status: "approverd",
      description: "1111",
      price: 350,
      currency: "$",
    },
    {
      id: 2,
      product: "Acer Nitro 5",
      img: "/public/images/mv/1.jpg",
      customer: "Joho smith",
      date: "1 march",
      amount: 785,
      method: "cash on delivery",
      status: "approverd",
      description: "1111",
      price: 350,
      currency: "$",
    },
  ];
};

function Drink({ name }) {
  const info = drinks[name];
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>植物的一部分</dt>
        <dd>{info.part}</dd>
        <dt>咖啡因含量</dt>
        <dd>{info.caffeine}</dd>
        <dt>年龄</dt>
        <dd>{info.age}</dd>
      </dl>
    </section>
  );
}

export function DataShorthand() {
  return (
    <div>
      <Drink name="茶" />
      <Drink name="咖啡" />
    </div>
  );
}
