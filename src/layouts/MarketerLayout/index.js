import MarketerHeader from "../../component/MarketerHeader";

function MarketerLayout({ children }) {
  return (
    <div>
      <MarketerHeader />
      <div className="px-10">{children}</div>
    </div>
  );
}

export default MarketerLayout;
