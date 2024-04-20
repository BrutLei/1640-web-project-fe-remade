import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import * as UserServices from "../../services/UserServices";
import Card from "../../component/Card";
import MoodleAdd from "../../component/MoodleAddDoc";
import AddButton from "../../component/AddButton";

const ArticlePage = ({ handleToggle }) => {
  const [articles, setArticles] = useState([]);
  const [change, setChange] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchingStudentArticle();
  }, [change]);

  const fetchingStudentArticle = async () => {
    const res = await UserServices.fetchingStudentArticle(
      user.id,
      user.access_token
    );
    setArticles(res);
  };

  const [showToggle, setShowToggle] = useState(false);
  function handleToggle() {
    setShowToggle(!showToggle);
  }
  return (
    <>
      <AddButton handleToggle={handleToggle} />
      <MoodleAdd
        show={showToggle}
        handleToggle={handleToggle}
        setChange={setChange}
        currentStage={change}
      />
      <div className="grid m-auto grid-cols-1 md:grid-cols-3  gap-x-8 gap-y-6">
        {articles.map((e, index) => {
          return (
            <Card
              image={e.imageFile}
              id={e.id}
              key={index}
              title={e.shortDescription}
              path={e.documentFile}
              status={e.reviewStatus}
              setChange={setChange}
              currentStage={change}
              comment={e.comment}
            />
          );
        })}
      </div>
    </>
  );
};

export default ArticlePage;
