import AdminHeader from "../../component/AdminHeader";
import React, { useEffect } from "react";
import * as UserServices from "../../services/UserServices";
import { useSelector } from "react-redux";
import ArticleTable from "../ArticleTable";
import ArticleFaculty from "../ArticleFaculty";

const MarketingManagerPage = () => {
  const user = useSelector((state) => state.user);
  // console.log(user.username);

  // useEffect(async () => {
  //   const res = await UserServices.fetchingStudentArticle(id, token);
  // }, []);
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold text-center">Article Review</h1>

      <ArticleFaculty />
    </div>
  );
};

export default MarketingManagerPage;
