export default function SpecialtiesCard() {
  return (
    <div className="card w-80 h-80 p-5 text-white rounded-lg shadow-lg cursor-pointer transition duration-600 transform origin-bottom-right">
      <div className="main-content flex-1">
        <div className="header mb-4">
          <span className="font-semibold text-gray-400 mr-2">Article on</span>
          <span>29-June-2023</span>
        </div>
        <p className="heading text-2xl font-bold mb-4">
          Different ways to use CSS in React
        </p>
        <div className="categories flex gap-2">
          <span className="bg-pink-500 text-xs font-bold uppercase py-1 px-2 rounded-full">
            React
          </span>
          <span className="bg-pink-500 text-xs font-bold uppercase py-1 px-2 rounded-full">
            Css
          </span>
        </div>
      </div>
      <div className="footer text-gray-400 font-bold mt-4">by Harsh Gupta</div>
    </div>
  );
}
