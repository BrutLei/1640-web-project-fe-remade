const AddButton = ({ handleToggle }) => {
  return (
    <div>
      <div className="m-5 flex justify-between items-center">
        <p className=" text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Contributions List:
        </p>
        <button
          onClick={handleToggle}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-block"
        >
          Upload Article
        </button>
      </div>
    </div>
  );
};

export default AddButton;
