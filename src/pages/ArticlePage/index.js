import React from "react";
import Card from "../../component/Card";

const ArticlePage = () => {
  return (
    <div className="grid m-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-6">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default ArticlePage;
