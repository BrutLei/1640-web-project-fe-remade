import { useEffect, useState } from "react";
// import { postCreateUser } from "~/service/UserService";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as ArticleServices from "../../services/ArticleServices";
import { useSelector } from "react-redux";
import axios from "../../services/CustomAxios";

const MoodleAdd = ({ show, handleToggle, setChange, currentStage }) => {
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState([]);
  const [image, setImage] = useState([]);

  const [deadline, setDeadline] = useState();
  const [topic, setTopic] = useState(null);
  const [topicId, setTopicId] = useState();

  const [displayDeadline, setDisplayDeadline] = useState();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const user = useSelector((state) => state.user);

  const handleSave = async () => {
    if (topic) {
      if (Date.parse(deadline) - Date.now() >= 0) {
        if (!desc || file.length <= 0 || image.length <= 0) {
          toast.error("Missing required data");
        } else {
          let res = null;
          res = await ArticleServices.uploadArticle(user, desc, file, image);
          setDesc("");
          setFile([]);
          setImage([]);
          if (res) {
            setChange(!currentStage);
            handleToggle();
            setDesc("");
            setFile([]);
            setImage([]);
          }
        }
        setDesc("");
        setFile([]);
        setImage([]);
      } else {
        toast.error(
          "The deadline for the article submission has passed. You can submit it in the next term"
        );
      }
    } else {
      toast.error("Your faculty still does not have the topic for this year.");
    }
    setDesc("");
    setFile([]);
    setImage([]);
  };

  useEffect(() => {
    fetchFacultyTopic();
  }, [currentStage]);

  const fetchDeadlineData = async (id) => {
    const res = await axios.get(`/closedates/topic/${id}`);
    if (res) {
      if (res.data) {
        console.log(res);
      } else {
        setDeadline(res.closingDate);
        const beutyDate = new Date(res.closingDate).toLocaleDateString(
          undefined,
          options
        );
        setDisplayDeadline(beutyDate);
      }
    }
  };

  const fetchFacultyTopic = async () => {
    const res = await axios.get(`/topics/faculty/${user.faculty.id}`);
    if (res) {
      console.table(res);
      if (res.data) {
        if (
          res.data === "Cannot found the faculty's topic" ||
          res.data === "Still don't have a topic for this faculty this year"
        ) {
          console.log(res);
        }
      } else {
        fetchDeadlineData(res.id);
        setTopicId(res.id);
        setTopic(res.name);
      }
    }
  };

  return (
    <div
      id="default-modal"
      aria-hidden="true"
      className={`${
        show ? "" : "hidden"
      } overflow-y-auto overflow-x-hidden flex fixed top-5 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative m-auto p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow border border-black">
          <div className="flex items-center justify-between p-4 md:p-5 border-black shadow-sm rounded-t">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Upload Article
            </h3>
            <button
              onClick={handleToggle}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              data-modal-hide={show ? "default-modal" : ""}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <path d="M 11.480469 5.0058594 C 10.500482 5.0058442 9.521297 5.3771405 8.7792969 6.1191406 L 6.1191406 8.7792969 C 4.6346201 10.26247 4.6351404 12.69764 6.1191406 14.181641 L 15.9375 24 L 6.1191406 33.818359 C 4.6346201 35.301533 4.6351404 37.736703 6.1191406 39.220703 L 8.7792969 41.880859 C 10.26247 43.36538 12.69764 43.36486 14.181641 41.880859 L 24 32.0625 L 33.818359 41.880859 C 35.301533 43.36538 37.736703 43.36486 39.220703 41.880859 L 41.880859 39.220703 C 43.36538 37.73753 43.36486 35.30236 41.880859 33.818359 L 32.0625 24 L 41.880859 14.181641 C 43.36538 12.698467 43.36486 10.263297 41.880859 8.7792969 L 39.220703 6.1191406 C 37.73753 4.6346201 35.30236 4.6351404 33.818359 6.1191406 L 24 15.9375 L 14.181641 6.1191406 C 13.440054 5.3768804 12.460456 5.0058746 11.480469 5.0058594 z M 11.480469 6.9921875 C 11.944232 6.9921723 12.408165 7.1734634 12.767578 7.5332031 L 23.292969 18.058594 A 1.0001 1.0001 0 0 0 24.707031 18.058594 L 35.232422 7.5332031 C 35.952422 6.8132033 37.087814 6.8137237 37.806641 7.5332031 L 40.466797 10.193359 C 41.186797 10.913359 41.186276 12.048752 40.466797 12.767578 L 29.941406 23.292969 A 1.0001 1.0001 0 0 0 29.941406 24.707031 L 40.466797 35.232422 C 41.186797 35.952422 41.186276 37.087814 40.466797 37.806641 L 37.806641 40.466797 C 37.086641 41.186797 35.951248 41.186276 35.232422 40.466797 L 24.707031 29.941406 A 1.0001 1.0001 0 0 0 23.292969 29.941406 L 12.767578 40.466797 C 12.047578 41.186797 10.912186 41.186276 10.193359 40.466797 L 7.5332031 37.806641 C 6.8132033 37.086641 6.8137237 35.951248 7.5332031 35.232422 L 18.058594 24.707031 A 1.0001 1.0001 0 0 0 18.058594 23.292969 L 7.5332031 12.767578 C 6.8132033 12.047578 6.8137237 10.912186 7.5332031 10.193359 L 10.193359 7.5332031 C 10.553359 7.1732032 11.016706 6.9922027 11.480469 6.9921875 z"></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <form encType="multipart/form-data">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Topic
                <p>{topic}</p>
              </label>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Deadline
                <p>{displayDeadline}</p>
              </label>

              <label className="block mb-2 font-medium text-lg uppercase text-gray-900 ">
                Short Description
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
                type="text"
                value={desc}
                onChange={(e) => {
                  setDesc(e.currentTarget.value);
                }}
              ></input>
              <p className="mt-1 text-sm text-gray-500 " id="file_input_help">
                Name of Paper.
              </p>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                File
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
                aria-describedby="file_input_help"
                type="file"
                accept=".docx"
                name="file"
                value={file.originalname}
                onChange={(e) => setFile(e.target.files[0])}
              ></input>
              <p className="mt-1 text-sm text-gray-500 " id="file_input_help">
                DOCX (MAX &lt; 5MB).
              </p>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Image
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
                aria-describedby="file_input_help"
                type="file"
                // accept=".jpeg .jpg .png"
                name="file"
                value={image.originalname}
                onChange={(e) => setImage(e.target.files[0])}
              ></input>
              <p className="mt-1 text-sm text-gray-500 " id="file_input_help">
                Img(MAX &lt; 5MB).
              </p>
            </form>
          </div>
          <div className="flex justify-center items-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
            <button
              onClick={handleSave}
              data-modal-hide="default-modal"
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Upload
            </button>
            <button
              onClick={handleToggle}
              data-modal-hide="default-modal"
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodleAdd;
