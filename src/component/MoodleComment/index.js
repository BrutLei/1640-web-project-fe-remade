import React, { useEffect, useState } from "react";
import * as ArticleServices from "../../services/ArticleServices";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ModalComment = ({
  showModal,
  setShowModal,
  artId,
  change,
  setChange,
}) => {
  const [comment, setComment] = useState();

  const fetchArticle = async (id) => {
    if (id) {
      const res = await ArticleServices.getAnArticle(id);
      if (res === "Article Not Exist") {
        toast.error(res);
      }
      setComment(res.comment);
    }
  };

  useEffect(() => {
    fetchArticle(artId);
  }, [showModal]);

  const user = useSelector((state) => state.user);

  const submitComment = async (id, comment) => {
    const res = await ArticleServices.comment(id, comment);
    if (res.data == "Comment content is required") {
      toast.error(res.data);
      setShowModal(!showModal);
    } else {
      setChange(!change);
      setShowModal(!showModal);

      toast.success(`Comment on article ${id} successfully`);
      setComment("");
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Comment</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 ">
                    <label htmlFor="comment" className="sr-only">
                      Your comment
                    </label>
                    <textarea
                      id="comment"
                      rows="6"
                      className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
                      placeholder="Write a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => submitComment(artId, comment)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ModalComment;
